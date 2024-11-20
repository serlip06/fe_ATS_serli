// Mendefinisikan URL API dengan API Key
const apiKey = "34e8ac97c2084fbda2cad9a2640ec9c0"; // Ganti dengan API key valid Anda
const apiUrl = `https://newsapi.org/v2/everything?q=apple&from=2024-11-18&to=2024-11-18&sortBy=popularity&apiKey=${apiKey}`;

// Menyimpan artikel yang diterima
let allArticles = []; 

// Menyimpan index artikel yang sedang ditampilkan
let currentIndex = 0;

// Fungsi untuk mengambil data dari API dan menampilkannya di HTML
async function fetchBlogPosts() {
    try {
        // Mengambil data dari API
        const response = await fetch(apiUrl);
        
        // Cek apakah respons berhasil (status 200)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Menampilkan data di console untuk pengecekan
        console.log(data); // Periksa struktur data yang diterima

        // Memeriksa apakah ada artikel yang ditemukan
        if (data.articles && data.articles.length > 0) {
            // Menyaring artikel yang memiliki gambar
            allArticles = data.articles.filter(article => article.urlToImage);

            // Menemukan container tempat menampilkan artikel
            const container = document.getElementById('blog-container');
            container.innerHTML = ''; // Menghapus konten lama jika ada

            // Menampilkan artikel pertama
            displayArticles(currentIndex);

            // Mengupdate artikel setiap 5 detik (5000 ms)
            setInterval(() => {
                // Menambah index untuk menampilkan artikel berikutnya
                currentIndex = (currentIndex + 3) % allArticles.length;
                displayArticles(currentIndex);
            }, 5000);
        } else {
            console.log('No articles found.');
        }
    } catch (error) {
        console.error('Error fetching data from API:', error);
    }
}

// Fungsi untuk menampilkan artikel berdasarkan index yang diberikan
function displayArticles(index) {
    const container = document.getElementById('blog-container');
    container.innerHTML = ''; // Menghapus konten lama sebelum menampilkan yang baru

    // Menampilkan artikel berdasarkan index saat ini
    allArticles.slice(index, index + 3).forEach(article => {
        const card = document.createElement('div');
        card.classList.add('group', 'cursor-pointer', 'w-full', 'max-lg:max-w-xl', 'lg:w-1/3', 'border', 'border-gray-300', 'rounded-2xl', 'p-5', 'transition-all', 'duration-300', 'hover:border-indigo-600');
        
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('flex', 'items-center', 'mb-6');
        const img = document.createElement('img');
        img.src = article.urlToImage; // Hanya mengambil gambar jika ada
        img.alt = article.title;
        img.classList.add('rounded-lg', 'w-full', 'object-cover');
        imgDiv.appendChild(img);

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('block');
        const title = document.createElement('h4');
        title.classList.add('text-white', 'font-medium', 'leading-8', 'mb-9');
        title.textContent = article.title;
        contentDiv.appendChild(title);

        const metaDiv = document.createElement('div');
        metaDiv.classList.add('flex', 'items-center', 'justify-between', 'font-medium');

        const author = document.createElement('h6');
        author.classList.add('text-sm', 'text-orange-500');
        author.textContent = article.author || 'Unknown Author';

        const publishedAt = document.createElement('span');
        publishedAt.classList.add('text-sm', 'text-indigo-600');
        const date = new Date(article.publishedAt);
        publishedAt.textContent = date.toLocaleDateString();

        metaDiv.appendChild(author);
        metaDiv.appendChild(publishedAt);
        contentDiv.appendChild(metaDiv);

        card.appendChild(imgDiv);
        card.appendChild(contentDiv);

        container.appendChild(card);
    });
}

// Memanggil fungsi untuk menampilkan artikel ketika halaman dimuat
window.onload = fetchBlogPosts;
