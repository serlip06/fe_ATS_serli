const apiUrl = "https://ats-714220023-serlipariela-38bba14820aa.herokuapp.com/produk";

async function searchProducts() {
  const input = document.getElementById("search-input").value.toLowerCase();
  if (input.trim() === "") {
    document.getElementById("search-result").innerHTML = "";
    return;
  }

  try {
    // Fetch data dari API
    const response = await fetch(apiUrl);
    const products = await response.json();

    // Filter produk berdasarkan nama
    const filteredProducts = products.filter(product =>
      product.nama.toLowerCase().includes(input)
    );

    // Render hasil pencarian
    if (filteredProducts.length > 0) {
      const resultsHtml = filteredProducts.map(product => `
        <div class="p-4 border-b border-gray-300">
          <h3>${product.nama}</h3>
          <p>ID: ${product.id}</p>
          <button onclick="viewProduct('${product.id}')">Lihat Detail</button>
        </div>
      `).join("");
      document.getElementById("search-result").innerHTML = resultsHtml;
    } else {
      document.getElementById("search-result").innerHTML = "<p>Tidak ada produk ditemukan.</p>";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("search-result").innerHTML = "<p>Terjadi kesalahan saat mencari produk.</p>";
  }
}

function viewProduct(produkID) {
  // Redirect ke halaman detail produk dengan ID
  window.location.href = `produk.html?produkID=${produkID}`;
}
