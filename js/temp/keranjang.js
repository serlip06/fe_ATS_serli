// Fungsi untuk mengambil data dari API dan merendernya ke dalam HTML
async function fetchAndRenderData() {
    try {
        // Ambil data dari endpoint API
        const response = await fetch("https://ats-714220023-serlipariela-38bba14820aa.herokuapp.com/chartitem");

        // Periksa apakah respons API berhasil
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse data JSON dari respons
        const data = await response.json();
        console.log("Data diterima dari API:", data);

        // Panggil fungsi untuk merender data
        renderKeranjang(data);
    } catch (error) {
        console.error("Error fetching data:", error);

        // Tampilkan pesan error di UI jika gagal
        const keranjangList = document.querySelector("#keranjang ul");
        if (keranjangList) {
            keranjangList.innerHTML = "<p class='text-red-500'>Gagal memuat data keranjang.</p>";
        }
    }
}

// Fungsi untuk merender data ke dalam HTML
// Fungsi untuk merender data ke dalam HTML
function renderKeranjang(data) {
    const keranjangList = document.querySelector("#keranjangList");
    const subtotalElement = document.querySelector("#keranjang .border-t .text-base p:last-child");

    if (!keranjangList || !subtotalElement) {
        console.error("Elemen HTML untuk keranjang tidak ditemukan.");
        return;
    }

    // Reset elemen HTML
    keranjangList.innerHTML = "";
    let subtotal = 0;

    // Periksa apakah data valid
    if (Array.isArray(data) && data.length > 0) {
        data.forEach(item => {
            // Tambahkan subtotal untuk setiap item
            subtotal += item.sub_total;

            // Buat elemen HTML untuk item keranjang
            const listItem = document.createElement("li");
            listItem.classList.add("flex", "py-6");
            listItem.innerHTML = `
                <div class="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img src="${item.gambar}" alt="Gambar produk" class="size-full object-cover">
                </div>
                <div class="ml-4 flex flex-1 flex-col">
                    <div class="flex justify-between text-base font-medium text-gray-900">
                        <h3>${item.NamaProduk}</h3>
                        <p class="ml-4">Rp ${item.harga.toLocaleString()}</p>
                    </div>
                    <div class="flex flex-1 items-end justify-between text-sm">
                        <p class="text-gray-500">Qty: ${item.quantity}</p>
                        <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500" onclick="removeItem('${item._id}')">
                            Hapus
                        </button>
                    </div>
                </div>
            `;
            keranjangList.appendChild(listItem);
        });

        // Perbarui subtotal di HTML
        subtotalElement.textContent = `Rp ${subtotal.toLocaleString()}`;
    } else {
        keranjangList.innerHTML = "<p class='text-gray-500'>Keranjang Anda kosong.</p>";
        subtotalElement.textContent = "Rp 0";
    }
}


async function removeItem(id) {
    try {
        // Kirim permintaan DELETE ke API dengan ID dalam query string
        const response = await fetch(`https://ats-714220023-serlipariela-38bba14820aa.herokuapp.com/deletechartitem?_id=`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Periksa apakah respons berhasil
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        console.log(`Item dengan ID ${id} berhasil dihapus`);
        alert("Item berhasil dihapus dari keranjang.");

        // Panggil ulang fungsi untuk memuat ulang data
        fetchAndRenderData();
    } catch (error) {
        console.error("Error deleting item:", error);
        alert("Gagal menghapus item. Silakan coba lagi.");
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
