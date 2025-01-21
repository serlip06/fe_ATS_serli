// Fungsi untuk mengambil data dari API dan merendernya ke dalam HTML
async function fetchAndRenderData() {
    try {
        // Ambil id_user dari localStorage
        const idUser = localStorage.getItem("id");
        if (!idUser) {
            console.error("ID User tidak ditemukan di localStorage.");
            return;
        }

        const response = await fetch("https://ats-714220023-serlipariela-38bba14820aa.herokuapp.com/chartitem");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data diterima dari API:", data);

        // Filter data berdasarkan id_user
        const filteredData = data.filter(item => item.id_user === idUser);
        renderKeranjang(filteredData);
    } catch (error) {
        console.error("Error fetching data:", error);
        const keranjangList = document.querySelector("#keranjang ul");
        if (keranjangList) {
            keranjangList.innerHTML = "<p class='text-red-500'>Gagal memuat data keranjang.</p>";
        }
    }
}

// Fungsi untuk mengambil data dari API dan merendernya ke dalam HTML
async function fetchAndRenderData() {
    try {
        // Ambil id_user dari localStorage
        const idUser = localStorage.getItem("id");
        if (!idUser) {
            console.error("ID User tidak ditemukan di localStorage.");
            return;
        }

        const response = await fetch("https://ats-714220023-serlipariela-38bba14820aa.herokuapp.com/chartitem");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data diterima dari API:", data);

        // Filter data berdasarkan id_user
        const filteredData = data.filter(item => item.id_user === idUser);
        renderKeranjang(filteredData);
    } catch (error) {
        console.error("Error fetching data:", error);
        const keranjangList = document.querySelector("#keranjangList");
        if (keranjangList) {
            keranjangList.innerHTML = "<p class='text-red-500'>Gagal memuat data keranjang.</p>";
        }
    }
}

/// Fungsi untuk merender data ke dalam HTML
function renderKeranjang(data) {
    const keranjangList = document.querySelector("#keranjangList");
    const subtotalElement = document.querySelector("#subtotal");

    if (!keranjangList || !subtotalElement) {
        console.error("Elemen HTML untuk keranjang tidak ditemukan.");
        return;
    }

    keranjangList.innerHTML = "";

    if (Array.isArray(data) && data.length > 0) {
        data.forEach(item => {
            const listItem = document.createElement("li");
            listItem.classList.add("flex", "py-6");
            listItem.innerHTML = `
              <div class="flex items-center">
                <!-- Checkbox untuk memilih produk -->
                <input 
                    type="checkbox" 
                    id="checkbox-${item._id}" 
                    class="checkbox-item mr-4 w-5 h-5 text-blue-500 focus:ring-blue-400 border-gray-300 rounded" 
                    data-id="${item._id}" 
                    data-name="${item.nama_produk}" 
                    data-price="${item.harga}" 
                    data-quantity="${item.quantity}">
              </div>
              <div class="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img src="${item.gambar}" alt="Gambar produk" class="size-full object-cover">
              </div>
              <div class="ml-4 flex flex-1 flex-col">
                  <div class="flex justify-between text-base font-medium text-gray-900">
                      <h3>${item.nama_produk || "Produk"}</h3>
                      <p class="ml-4">Rp ${item.harga.toLocaleString()}</p>
                  </div>
                  <div class="flex flex-1 items-end justify-between text-sm">
                      <div class="flex items-center">
                          <label for="quantity-${item._id}" class="text-gray-500">Jumlah:</label>
                          <input 
                              type="number"   
                              id="quantity-${item._id}" 
                              class="ml-2 w-12 text-center border-gray-300 rounded-md" 
                              value="${item.quantity}" 
                              min="1" 
                              max="${item.stok}" 
                              data-id="${item._id}">
                      </div>
                      <!-- Button Update -->
                      <button 
                          class="inline-block px-3 py-1 bg-blue-500 text-white rounded-lg cursor-pointer shadow-md active:scale-95 transition-transform" 
                          type="button" 
                          data-id="${item._id}" 
                          onclick="handleUpdateQuantity(this)">
                          Update
                      </button>
                      <!-- Button Delete -->
                      <button 
                          class="inline-block px-3 py-1 bg-red-500 text-white rounded-lg cursor-pointer shadow-md active:scale-95 transition-transform" 
                          type="button" 
                          onclick="confirmDelete('${item._id}')">
                          Delete
                      </button>
                  </div>
              </div>
            `;
            keranjangList.appendChild(listItem);
        });

        // Tambahkan event listener untuk setiap checkbox
        addCheckboxListeners();
    } else {
        keranjangList.innerHTML = "<p class='text-gray-500'>Keranjang Anda kosong.</p>";
        subtotalElement.textContent = "Rp 0";
    }
}

// Fungsi untuk menambahkan event listener ke checkbox
function addCheckboxListeners() {
    const checkboxes = document.querySelectorAll(".checkbox-item");
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", updateSubtotal);
    });
}

// Fungsi untuk menghitung subtotal berdasarkan checkbox yang dicentang
function updateSubtotal() {
    const checkedCheckboxes = document.querySelectorAll(".checkbox-item:checked");
    const subtotalElement = document.querySelector("#subtotal");

    let subtotal = 0;
    checkedCheckboxes.forEach(checkbox => {
        const price = parseInt(checkbox.dataset.price);
        const quantity = parseInt(checkbox.dataset.quantity);
        subtotal += price * quantity;
    });

    subtotalElement.textContent = `Rp ${subtotal.toLocaleString()}`;
}

// Fungsi untuk mendapatkan produk yang dicentang
function getCheckedProducts() {
    const checkedCheckboxes = document.querySelectorAll(".checkbox-item:checked");
    const selectedProducts = [];

    checkedCheckboxes.forEach(checkbox => {
        const productData = {
            id: checkbox.dataset.id,
            name: checkbox.dataset.name,
            price: parseInt(checkbox.dataset.price),
            quantity: parseInt(checkbox.dataset.quantity)
        };
        selectedProducts.push(productData);
    });

    return selectedProducts;
}

// Fungsi untuk memproses checkout
function handleCheckout() {
    const selectedProducts = getCheckedProducts();

    if (selectedProducts.length === 0) {
        alert("Pilih produk terlebih dahulu sebelum checkout.");
        return;
    }

    console.log("Produk yang akan di-checkout:", selectedProducts);

    fetch("https://example.com/checkout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ products: selectedProducts })
    })
        .then(response => response.json())
        .then(result => {
            alert("Checkout berhasil!");
            console.log("Respon dari server:", result);
        })
        .catch(error => {
            console.error("Terjadi kesalahan saat checkout:", error);
            alert("Gagal melakukan checkout. Silakan coba lagi.");
        });
}

// Panggil fungsi untuk mengambil dan merender data
fetchAndRenderData();




// Fungsi untuk menambahkan event listener pada tombol update
function addUpdateEventListeners() {
    const updateButtons = document.querySelectorAll(".bg-blue-500");

    updateButtons.forEach(button => {
        button.addEventListener("click", () => {
            const productId = button.getAttribute("data-id");
            updateQuantity(productId); // Panggil fungsi updateQuantity
        });
    });
}

// Fungsi untuk mengupdate jumlah produk
function updateQuantity(productId) {
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const newQuantity = parseInt(quantityInput.value);

    if (isNaN(newQuantity) || newQuantity < 1) {
        alert("Jumlah produk tidak valid.");
        return;
    }

    const targetUrl = `https://ats-714220023-serlipariela-38bba14820aa.herokuapp.com/updatechartitem`;

    const dataToUpdate = {
        id_produk: productId,
        quantity: newQuantity
    };

    fetch(targetUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToUpdate)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Gagal mengupdate produk. Periksa apakah ID produk valid.");
            }
            return response.json();
        })
        .then(result => {
            alert(result.message || "Jumlah produk berhasil diupdate.");
            fetchAndRenderData(); // Memperbarui keranjang setelah quantity diupdate
        })
        .catch(error => {
            console.error("Error updating quantity:", error);
            alert("Gagal mengupdate jumlah produk.");
        });
}

// Fungsi untuk menghapus data berdasarkan ID
function deleteData(IDHAPUS) {
    const target_url = `https://ats-714220023-serlipariela-38bba14820aa.herokuapp.com/deletechartitem/${IDHAPUS}`;

    const requestOptions = {
        method: 'DELETE',
        redirect: 'follow',
    };

    fetch(target_url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error("Gagal menghapus data. Periksa apakah ID valid.");
            }
            return response.json();
        })
        .then(result => {
            alert(result.message || "Data berhasil dihapus.");
            fetchAndRenderData(); // Perbarui keranjang setelah data dihapus
        })
        .catch(error => console.log('Error:', error));
}

// Fungsi konfirmasi sebelum menghapus data
function confirmDelete(IDHAPUS) {
    if (confirm("Apakah ingin menghapus data dengan ID: " + IDHAPUS + "?")) {
        deleteData(IDHAPUS);
    }
}

// Tambahkan event listener untuk tombol tutup keranjang
document.getElementById("closeKeranjang").addEventListener("click", () => {
    document.getElementById("keranjang").classList.add("hidden");
});

// Tambahkan event listener untuk tombol checkout
document.getElementById("checkoutButton").addEventListener("click", () => {
    alert("Fitur checkout belum tersedia.");
});

// Muat data saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
    fetchAndRenderData();
});
