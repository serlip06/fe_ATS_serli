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

document.addEventListener("DOMContentLoaded", function () {
    addCheckboxListeners();
    document.querySelector("#checkoutButton").addEventListener("click", checkout);
    document.getElementById("confirmCheckout").addEventListener("click", processPayment);
});

function addCheckboxListeners() {
    const checkboxes = document.querySelectorAll(".checkbox-item");
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", updateSubtotal);
    });
}

function updateSubtotal() {
    const checkedCheckboxes = document.querySelectorAll(".checkbox-item:checked");
    const subtotalElement = document.querySelector("#subtotal");
    const totalElement = document.querySelector("#total");
    const checkoutButton = document.querySelector("#checkoutButton");
    const selectedItemsList = document.querySelector("#selectedItemsList");
    
    let subtotal = 0;
    const selectedItems = [];
    selectedItemsList.innerHTML = "";
    
    checkedCheckboxes.forEach(checkbox => {
        const price = parseInt(checkbox.dataset.price) || 0;
        const quantity = parseInt(checkbox.dataset.quantity) || 1;
        const id = checkbox.dataset.id;
        const name = checkbox.dataset.name;
        
        if (!id || !name || price <= 0 || quantity <= 0) {
            console.warn("Data tidak valid untuk item dengan ID:", id);
            return;
        }
        
        subtotal += price * quantity;
        selectedItems.push({ id, name, harga: price, quantity });
        updateCartItemStatus(id);

        const listItem = document.createElement("li");
        listItem.className = "flex justify-between py-4 selected-product";
        listItem.dataset.id = id;
        listItem.innerHTML = `
            <div>
                <h3 class="text-lg font-medium">${name}</h3>
                <p class="text-sm text-gray-600">Harga: Rp ${price.toLocaleString()}</p>
                <p class="text-sm text-gray-600">Jumlah: ${quantity}</p>
            </div>
        `;
        selectedItemsList.appendChild(listItem);
    });
    
    subtotalElement.textContent = `Rp ${subtotal.toLocaleString()}`;
    totalElement.value = `Rp ${subtotal.toLocaleString()}`;
    checkoutButton.disabled = selectedItems.length === 0;
}

function updateCartItemStatus(id) {
    fetch(`https://ats-714220023-serlipariela-38bba14820aa.herokuapp.com/cart-items/${id}/select`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selected: true })
    })
    .then(response => response.json())
    .then(result => console.log("Status barang diperbarui:", result))
    .catch(error => console.error("Kesalahan saat memperbarui status barang:", error));
}

function checkout() {
    const checkedCheckboxes = document.querySelectorAll(".checkbox-item:checked");
    const selectedItems = [];
    checkedCheckboxes.forEach(checkbox => {
        selectedItems.push({
            id: checkbox.dataset.id,
            name: checkbox.dataset.name,
            harga: parseInt(checkbox.dataset.price) || 0,
            quantity: parseInt(checkbox.dataset.quantity) || 1
        });
    });

    if (selectedItems.length === 0) {
        alert("Pilih setidaknya satu produk untuk checkout.");
        return;
    }

    fetch("https://ats-714220023-serlipariela-38bba14820aa.herokuapp.com/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: selectedItems })
    })
    .then(response => response.json())
    .then(result => alert("Checkout berhasil!"))
    .catch(error => console.error("Kesalahan saat checkout:", error));
}

async function processPayment() {
    try {
        const idUser = localStorage.getItem("id");
        if (!idUser) {
            alert("ID User tidak ditemukan! Pastikan sudah login.");
            return;
        }

        const selectedProducts = document.querySelectorAll(".selected-product");
        const id_cartitem = Array.from(selectedProducts).map(product => product.dataset.id);
        if (id_cartitem.length === 0) {
            alert("Tidak ada produk yang dipilih!");
            return;
        }

        // Mengambil total harga dengan cara yang benar
        const totalHargaText = document.getElementById("total").value.replace(/[^0-9]/g, "");
        const totalHarga = parseInt(totalHargaText) || 0;

        // if (totalHarga <= 0) {
        //     alert("Total harga tidak valid!");
        //     return;
        // }

        const metodePembayaran = getSelectedPaymentMethod();
        const buktiPembayaran = document.getElementById("payment-link").value || "N/A";
        const alamat = document.getElementById("delivery-option").checked ? document.getElementById("alamat").value : "N/A";
        if (!metodePembayaran) {
            alert("Pilih metode pembayaran terlebih dahulu!");
            return;
        }

        const requestData = {
            id_user: idUser,
            id_cartitem,
            total_harga: totalHarga,
            created_at: new Date().toISOString(),
            metode_pembayaran: metodePembayaran,
            buktiPembayaran,
            status: "Pending",
            alamat
        };
        console.log("Mengirim data transaksi:", requestData);

        
    }
    catch (error) {
        console.error("Error processing payment:", error);
        alert("Gagal memproses pembayaran.");
    }        
}

function getSelectedPaymentMethod() {
    const checkboxes = document.querySelectorAll(".payment-checkbox");
    for (const checkbox of checkboxes) {
        if (checkbox.checked) {
            return checkbox.value;
        }
    }
    return null;
}


// Panggil fungsi untuk mengambil dan merender data
fetchAndRenderData();




function handleUpdateQuantity(button) {
    const productId = button.getAttribute("data-id");
    updateQuantity(productId);
}

function updateQuantity(productId) {
    const quantityInput = document.getElementById(`quantity-${productId}`);
    if (!quantityInput) {
        alert("Input jumlah produk tidak ditemukan.");
        return;
    }

    const newQuantity = parseInt(quantityInput.value);
    if (isNaN(newQuantity) || newQuantity < 1) {
        alert("Jumlah produk tidak valid.");
        return;
    }

    const targetUrl = "https://ats-714220023-serlipariela-38bba14820aa.herokuapp.com/updatechartitem";

    const dataToUpdate = {
        id_produk: productId,
        quantity: newQuantity
    };

    fetch(targetUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
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
        fetchAndRenderData();
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


// Muat data saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
    fetchAndRenderData();
});
