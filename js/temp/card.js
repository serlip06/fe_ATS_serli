import { urlAPI } from "../config/url_produk.js";

function initializeApp() {
  // Create main container
  const appContainer = document.getElementById("app");

  // Create filter container
  const filterContainer = document.createElement("div");
  filterContainer.className = "filter-container my-4";
  filterContainer.innerHTML = `
    <label for="category-dropdown" class="block mb-2 text-lg font-semibold">Pilih Kategori:</label>
    <select id="category-dropdown" class="px-4 py-2 border rounded-md">
      <option value="All">Semua</option>
    </select>
  `;

  // Create product container
  const productContainer = document.createElement("div");
  productContainer.id = "product-container";
  productContainer.className = "flex flex-wrap justify-start gap-4";

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
      <div class="flex-none w-64 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl m-2">
        <a href="#" class="block">
          <div class="relative">
            <img src="${product.gambar}" alt="${product.nama_produk}" class="h-48 w-full object-cover rounded-t-xl" />
            <div class="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
          </div>
          <div class="px-4 py-3">
            <span class="text-gray-400 mr-3 uppercase text-xs">${product.deskripsi}</span>
            <p class="text-lg font-bold text-black truncate capitalize">${product.nama_produk}</p>
            <div class="flex items-center mt-2">
              <p class="text-lg font-semibold text-black">${formattedPrice}</p>
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
              </div>
            </div>
          </div>
        </a>
      </div>
    `;
    productContainer.innerHTML += productCard;
  });
}

// Initialize application
initializeApp();
