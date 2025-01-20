// Fungsi untuk mengambil data dari API dan merendernya ke dalam HTML
async function fetchAndRenderData() {
    try {
        const response = await fetch("https://ats-714220023-serlipariela-38bba14820aa.herokuapp.com/chartitem");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data diterima dari API:", data);

        renderKeranjang(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        const keranjangList = document.querySelector("#keranjang ul");
        if (keranjangList) {
            keranjangList.innerHTML = "<p class='text-red-500'>Gagal memuat data keranjang.</p>";
        }
    }
}

// Fungsi untuk merender data ke dalam HTML
function renderKeranjang(data) {
    const keranjangList = document.querySelector("#keranjangList");
    const subtotalElement = document.querySelector("#keranjang .border-t .text-base p:last-child");

    if (!keranjangList || !subtotalElement) {
        console.error("Elemen HTML untuk keranjang tidak ditemukan.");
        return;
    }

    keranjangList.innerHTML = "";
    let subtotal = 0;

    if (Array.isArray(data) && data.length > 0) {
        data.forEach(item => {
            subtotal += item.sub_total;

            const listItem = document.createElement("li");
            listItem.classList.add("flex", "py-6");
            listItem.innerHTML = `
                <div class="flex items-center">
                    <!-- Checkbox untuk memilih produk -->
                    <input 
                        type="checkbox" 
                        id="checkbox-${item._id}" 
                        class="mr-4 w-5 h-5 text-blue-500 focus:ring-blue-400 border-gray-300 rounded" 
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
                        <button 
                          class="inline-block px-3 py-1 bg-blue-500 text-white rounded-lg cursor-pointer shadow-md active:scale-95 transition-transform" 
    type="button" 
    data-id="${item._id}" 
    onclick="handleUpdateQuantity(this)">
    Update
                        </button>
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
        }
        );


        subtotalElement.textContent = `Rp ${subtotal.toLocaleString()}`;
    } else {
        keranjangList.innerHTML = "<p class='text-gray-500'>Keranjang Anda kosong.</p>";
        subtotalElement.textContent = "Rp 0";
    }
}

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
