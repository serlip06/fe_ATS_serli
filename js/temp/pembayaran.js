document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("confirmCheckout").addEventListener("click", async function () {
        try {
            // 🔹 Ambil ID User dari localStorage
            const idUser = localStorage.getItem("id");
            if (!idUser) {
                alert("ID User tidak ditemukan! Pastikan sudah login.");
                return;
            }

            // 🔹 Ambil semua produk yang sudah terpilih di halaman
            const selectedProducts = document.querySelectorAll(".selected-product"); // Pastikan ada class ini pada item yang dipilih
            const id_cartitem = Array.from(selectedProducts).map(product => product.dataset.id);

            // if (id_cartitem.length === 0) {
            //     alert("Tidak ada produk yang dipilih!");
            //     return;
            // }

            // 🔹 Ambil total harga dari elemen total
            const totalHargaText = document.getElementById("total").innerText.replace("Rp ", "").replace(/\./g, "");
            const totalHarga = parseInt(totalHargaText) || 0;

            // if (totalHarga <= 0) {
            //     alert("Total harga tidak valid!");
            //     return;
            // }

            // 🔹 Ambil metode pembayaran & bukti pembayaran
            const metodePembayaran = getSelectedPaymentMethod();
            const buktiPembayaran = document.getElementById("payment-link").value || "N/A";
            const alamat = document.getElementById("delivery-option").checked ? document.getElementById("alamat").value : "N/A";

            // if (!metodePembayaran) {
            //     alert("Pilih metode pembayaran terlebih dahulu!");
            //     return;
            // }

            // 🔹 Siapkan data transaksi
            const requestData = {
                id_user: idUser,
                id_cartitem: id_cartitem,
                total_harga: totalHarga,
                created_at: new Date().toISOString(), // Format ISO 8601
                metode_pembayaran: metodePembayaran,
                bukti_pembayaran: buktiPembayaran,
                status: "Pending",
                alamat: alamat
            };

            console.log("Mengirim data transaksi:", requestData); // Debugging

            // 🔹 Kirim data ke API
            const response = await fetch("https://ats-714220023-serlipariela-38bba14820aa.herokuapp.com/inserttransaksi", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(requestData)
            });


            const result = await response.json();
            if (response.ok) {
                Swal.fire({
                    title: "✅ Pesanan Berhasil!",
                    text: "Makanan sedang dibuat, tunggu ya!",
                    icon: "success",
                    confirmButtonText: "OK",
                    timer: 7000,
                }).then(() => {
                    window.location.href = "../template/dasuser.html";
                });
                
            } else {
                Swal.fire({
                    title: "❌ Gagal Mengirim Pesanan",
                    text: result.message || "Terjadi kesalahan",
                    icon: "error",
                    confirmButtonText: "Coba Lagi"
                });
            }
        }
        catch (error) {
            console.error("Terjadi error:", error);
            Swal.fire({
                title: "❌ Gagal Mengirim Pesanan",
                text: error.message || "Terjadi kesalahan",
                icon: "error",
                confirmButtonText: "Coba Lagi"
            });
        }
    });

    function getSelectedPaymentMethod() {
        const checkboxes = document.querySelectorAll(".payment-checkbox");
        for (const checkbox of checkboxes) {
            if (checkbox.checked) {
                return checkbox.value;
            }
        }
        return null;
    }
});
