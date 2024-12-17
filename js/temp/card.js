import { urlAPI } from "../config/url_produk.js";

function fetchDataFromEndpoint() {
  const url = urlAPI;
  
  // Debugging log
  console.log("Fetching data from URL:", url);

  fetch(url, {
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
      // Debugging log
      console.log("Data received from API:", data);
      
      if (!Array.isArray(data)) {
        throw new Error("Data received is not an array");
      }
      updateProductCards(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      Swal.fire({
        icon: "warning",
        title: "Perhatian!",
        text: error.message,
      });
    });
}



function formatCurrency(amount) {
  // Convert amount to number and format with thousands separators and "Rp."
  return `Rp. ${parseFloat(amount).toLocaleString('id-ID')}`;
}


function updateProductCards(data) {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = ''; // Clear existing content

  data.forEach(product => {
    const formattedPrice = formatCurrency(product.harga);

    const productCard = `
    <div class="flex flex-wrap justify-center">
    <!-- Start of card -->
    <div id="card-product" class="w-65 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl m-2">
        <a href="#" id="link-product">
            <div class="relative">
                <img id="gambarmakan" src="${product.gambar}" alt="Product" class="h-80 w-72 object-cover rounded-t-xl" />
                <div class="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
            </div>
            <div id="product-info" class="px-4 py-3 w-72">
                <span id="desmakan" class="text-gray-400 mr-3 uppercase text-xs">${product.deskripsi}</span>
                <p id="namamakan" class="text-lg font-bold text-black truncate block capitalize">${product.nama_produk}</p>
                <div id="hargamakan" class="flex items-center">
                    <p class="text-lg font-semibold text-black cursor-auto my-3">${formattedPrice}</p>
                   
                    <div id="add-to-cart-icon" class="ml-auto flex items-center space-x-2">
                        <!-- Dropdown for quantity -->
                        <select id="quantity" class="px-2 py-1 border border-gray-300 rounded-md">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>

                        <!-- Stock Label with Icon -->
                        <div class="flex items-center ml-2">
                            <div class="text-center">
                                <span class="block text-sm text-gray-500"></span> 
                                <div class="flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-700 rounded-md">
                                    <span id="stock" class="text-lg font-bold">${product.stok}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Cart Icon -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bag-plus" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                            <path
                                d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                        </svg>
                    </div>
                </div>
            </div>
        </a>
    </div>
</div>


</div>

    `
    productContainer.innerHTML += productCard;
  });
}

fetchDataFromEndpoint();
