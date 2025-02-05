document.addEventListener("DOMContentLoaded", async function () {
    const tableBody = document.getElementById("transaksi-table");
    const apiUrl = "https://ats-714220023-serlipariela-38bba14820aa.herokuapp.com/transaksi";
    const updateUrl = "https://ats-714220023-serlipariela-38bba14820aa.herokuapp.com/updatetransaksi";

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        console.log("Data fetched:", data); // Debugging: lihat data di console

        if (!Array.isArray(data)) {
            throw new Error("Data bukan array");
        }

        tableBody.innerHTML = ""; // Kosongkan tabel sebelum menambahkan data baru

        data.forEach(transaksi => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="border px-4 py-2 text-center">${transaksi._id}</td>
                <td class="border px-4 py-2 text-center">${new Date(transaksi.created_at).toISOString().split('T')[0]}</td>
                <td class="border px-4 py-2 text-center">${transaksi.id_user}</td>
                <td class="border px-4 py-2 text-center">${transaksi.id_cartitem}</td>
                <td class="border px-4 py-2 text-center">Rp ${transaksi.total_harga.toLocaleString()}</td>
                <td class="border px-4 py-2 text-center">${transaksi.metode_pembayaran}</td>
                <td class="border px-4 py-2 text-center">
                    <a href="${transaksi.bukti_pembayaran}" target="_blank" class="text-blue-500 underline">View</a>
                </td>
                <td class="border px-4 py-2 text-center">${transaksi.alamat}</td>
                <td class="border px-4 py-2 text-center">
                    <select class="status-dropdown px-2 py-1 border rounded">
                        <option value="berhasil" ${transaksi.status === "berhasil" ? "selected" : ""}>✅ Berhasil</option>
                        <option value="pending" ${transaksi.status === "pending" ? "selected" : ""}>⏳ Pending</option>
                        <option value="gagal" ${transaksi.status === "gagal" ? "selected" : ""}>❌ Gagal</option>
                    </select>
                </td>
                <td class="border px-4 py-2 text-center">
                    <button class="kirim-btn px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded shadow-lg transition">
                        Kirim
                    </button>
                </td>
            `;
            tableBody.appendChild(row);

            // Menambahkan event listener pada tombol Kirim
            const kirimBtn = row.querySelector(".kirim-btn");
            kirimBtn.addEventListener("click", async () => {
                const statusDropdown = row.querySelector(".status-dropdown");
                const newStatus = statusDropdown.value; // Mendapatkan status yang dipilih

                // Menonaktifkan tombol sementara untuk menghindari pengiriman berulang
                kirimBtn.disabled = true;
                kirimBtn.textContent = "Mengupdate...";

                try {
                    const updateResponse = await fetch(`${updateUrl}/${transaksi._id}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ status: newStatus }),
                    });

                    if (!updateResponse.ok) {
                        const errorDetails = await updateResponse.json();
                        console.error("Error updating status:", errorDetails);
                        throw new Error(errorDetails.message || "Gagal memperbarui status.");
                    }

                    // Jika berhasil, beri feedback
                    alert(`Status transaksi berhasil diperbarui menjadi: ${newStatus}`);
                    transaksi.status = newStatus; // Update status di UI
                    statusDropdown.value = newStatus; // Update dropdown

                } catch (error) {
                    console.error("Error updating status:", error);
                    alert(`Terjadi kesalahan: ${error.message}`);
                } finally {
                    // Mengembalikan tombol ke keadaan semula
                    kirimBtn.disabled = false;
                    kirimBtn.textContent = "Kirim";
                }
            });
        });
    } catch (error) {
        console.error("Error fetching transaksi data:", error);
        tableBody.innerHTML = `<tr><td colspan="11" class="text-center py-4 text-red-500">Gagal mengambil data transaksi.</td></tr>`;
    }
});
