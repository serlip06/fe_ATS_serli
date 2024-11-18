import { urlAPI } from "../config/url.js";

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
    <div class="w-full max-w-xs h-96 bg-white border border-gray-200 rounded-lg shadow bg-gradient-to-b from-gray-700 to-gray-900 dark:border-gray-700 m-2">
        <div class="rounded overflow-hidden shadow-lg flex flex-col h-full">
            <a href="#"></a>
            <div class="relative">
                <a href="#">
                    <img class="w-full h-48 object-cover" src="${product.gambar}" alt="Sunset in the mountains">
                    <div class="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
                </a>
            </div>
            <div class="px-6 py-4 flex-grow">
                <a id="namamakan" class="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2 text-white font-sans">${product.nama_produk}</a>
                <a id="desmakan" class="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2 text-white font-sans">${product.deskripsi}</a>
                <p id="hargamakan" class="text-gray-500 text-sm text-white font-sans">${formattedPrice}</p>
            </div>
            <div class="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                <a href="cek.html?customerID" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Pesan</a>
            </div>
        </div>
    </div>
    <!-- End of card -->

    <!-- Repeat the same structure for other cards -->
</div>
    `
    productContainer.innerHTML += productCard;
  });
}

fetchDataFromEndpoint();
