import { urlAPI } from "../config/url_produk.js";

function initializeApp() {
  // Create main container
  const appContainer = document.getElementById("app");
  appContainer.className = "flex flex-row items-start gap-4"; // Use flexbox for layout

  // Create filter container
// Buat elemen filterContainer
const filterContainer = document.createElement("div");
filterContainer.className = "filter-container mx-4"; // Margin horizontal untuk jarak antar elemen
filterContainer.innerHTML = `
  <div class="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg">
    <label for="category-dropdown" class="text-sm font-semibold text-gray-700 flex-shrink-0 font-poppins">
      <i class="fas fa-filter text-blue-600 mr-2"></i> Kategori:
    </label>
    <select id="category-dropdown" class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-poppins bg-white hover:border-blue-500 focus:ring focus:ring-blue-300 focus:border-blue-500">
      <option value="All">Semua</option>
  
    </select>
  </div>
`;

// Pastikan font Poppins dimuat di halaman
const link = document.createElement("link");
link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);

// Menambahkan filterContainer ke dalam navbar atau elemen lain
const navbar = document.querySelector(".navbar"); // Menemukan navbar (ganti jika perlu)
if (navbar) {
  navbar.appendChild(filterContainer);
}

// CSS untuk memindahkan posisi elemen
filterContainer.style.position = "relative";
filterContainer.style.top = "20px"; // Mengatur posisi lebih ke bawah
filterContainer.style.left = "-20px"; // Menggeser sedikit ke kiri




  // Create product container
  const productContainer = document.createElement("div");
  productContainer.id = "product-container";
  productContainer.className = "flex flex-wrap justify-start gap-4 w-3/4"; // Adjust width

  // Append elements to app container
  appContainer.appendChild(filterContainer);
  appContainer.appendChild(productContainer);

  // Fetch and render data
  fetchDataFromEndpoint();
}

function fetchDataFromEndpoint() {
  fetch(urlAPI, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (!data || !Array.isArray(data.data)) {
        throw new Error("Data received is not an array");
      }

      // Initialize dropdown and render products
      initializeCategoryDropdown(data.data);
      updateProductCards(data.data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);

      if (typeof Swal !== "undefined") {
        Swal.fire({
          icon: "warning",
          title: "Perhatian!",
          text: error.message,
        });
      } else {
        alert(`Error: ${error.message}`);
      }
    });
}

function formatCurrency(amount) {
  return `Rp. ${parseFloat(amount).toLocaleString("id-ID")}`;
}

function initializeCategoryDropdown(products) {
  const categories = [...new Set(products.map((product) => product.kategori))];
  const categoryDropdown = document.getElementById("category-dropdown");

  // Add options dynamically
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryDropdown.appendChild(option);
  });

  // Add event listener for filtering
  categoryDropdown.addEventListener("change", (event) => {
    const selectedCategory = event.target.value;
    const filteredProducts =
      selectedCategory === "All"
        ? products
        : products.filter((product) => product.kategori === selectedCategory);
    updateProductCards(filteredProducts);
  });
}


function updateProductCards(data) {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = ""; // Clear existing content

  data.forEach((product) => {
    const formattedPrice = formatCurrency(product.harga);

    const productCard = `
    <div class="flex-none w-80 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl m-2 product-card">
      <a href="#" class="block">
        <div class="relative">
          <img src="${product.gambar}" alt="${product.nama_produk}" class="h-64 w-full object-cover rounded-t-xl" />
          <div class="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
        </div>
        <div class="px-4 py-3">
          <span class="text-gray-400 mr-3 uppercase text-xs">${product.deskripsi}</span>
          <p class="text-lg font-bold text-black truncate capitalize product-name">${product.nama_produk}</p>
          <div class="flex items-center mt-2">
            <p class="text-lg font-semibold text-black product-price">${formattedPrice}</p>
            <div class="ml-auto flex items-center space-x-2">
              <select class="px-2 py-1 border border-gray-300 rounded-md">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <div class="flex items-center ml-2">
                <span class="text-sm text-gray-500">Stok:</span>
                <span class="text-lg font-bold">${product.stok}</span>
              </div>
              <!-- Icon Keranjang -->
             <div class="ml-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="url(#gradient)" 
              class="w-6 h-6 text-gray-500 hover:scale-110 transition-transform duration-200 ease-in-out" >
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color: #4f46e5; stop-opacity: 1" />
                  <stop offset="100%" style="stop-color: #9333ea; stop-opacity: 1" />
                </linearGradient>
              </defs>
              <path d="M6 2a1 1 0 011 1v1h6V3a1 1 0 011-1h4a1 1 0 011 1v1h1a1 1 0 011 1v1a1 1 0 01-1 1h-1.382l-1.296 6.32a3 3 0 01-2.942 2.68H6.62a3 3 0 01-2.942-2.68L2 6H1a1 1 0 011-1h1V3a1 1 0 011-1h4zM7 10h6v1H7v-1zM6 12a1 1 0 100 2 1 1 0 000-2zM14 12a1 1 0 100 2 1 1 0 000-2zM5 16a1 1 0 100 2 1 1 0 000-2zM15 16a1 1 0 100 2 1 1 0 000-2z" />
            </svg>
          </div>

            </div>
          </div>
        </div>
      </a>
    </div>
  `;
  

    productContainer.innerHTML += productCard;
  });
}



// Fungsi untuk menambahkan event listener pada setiap ikon keranjang
function setupCartButtons() {
  const cartButtons = document.querySelectorAll("[id^='add-to-cart-']");
  
  cartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.closest("[id^='add-to-cart-']").id.split("-")[3]; // Ambil ID produk dari ID element
      const productName = event.target.closest(".product-card").querySelector(".product-name").innerText;
      const productPrice = parseInt(event.target.closest(".product-card").querySelector(".product-price").innerText.replace('Rp. ', '').replace('.', ''));
      
      addToCart(productId, productName, productPrice);
    });
  });
}

// Panggil fungsi untuk setup event listener setelah halaman dimuat
document.addEventListener("DOMContentLoaded", setupCartButtons);



// Initialize application
initializeApp();

document.addEventListener("DOMContentLoaded", () => {
  const loadingContainer = document.getElementById("loading-container");
  const productContainer = document.getElementById("app");
  const cardProduct = document.getElementById("card-product");

  // Simulasi pengambilan data (gunakan fetch() untuk API sungguhan)
  setTimeout(() => {
      // Data telah berhasil dimuat
      loadingContainer.style.display = "none"; // Sembunyikan loading indicator
      cardProduct.classList.remove("hidden"); // Tampilkan kartu produk
  }, 2000); // Simulasi 2 detik untuk loading
});

loadingContainer.classList.add("fade-out");
