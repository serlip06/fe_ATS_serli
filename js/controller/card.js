
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

function updateProductCards(data) {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = ''; // Clear existing content

  data.forEach(product => {

    const productCard = `
               <div class="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow bg-gradient-to-b from-gray-700 to-gray-900 dark:border-gray-700 m-2">
                <div class="rounded overflow-hidden shadow-lg flex flex-col">
                    <a href="#"></a>
                    <div class="relative">
                        <a href="#">
                            <img class="w-full" src="https://images.pexels.com/photos/6086/food-salad-healthy-vegetables.jpg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;w=500" alt="Sunset in the mountains">
                            <div class="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
                        </a>
                    </div>
                    <div class="px-6 py-4 mb-auto">
                        <a id="namamakan" class="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">${product.nama_product}</a>
                        <a id="desmakan" class="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">Why to eat salad?</a>
                        <p id="hargamakan" class="text-gray-500 text-sm">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                    </div>
                    <div class="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                        <button id="pesan"  type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Pesan</button>
                    </div>
                </div>  
            </div>
    `
    productContainer.innerHTML += productCard;
  });
}


fetchDataFromEndpoint();

