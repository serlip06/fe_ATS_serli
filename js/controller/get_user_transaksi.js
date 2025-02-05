document.addEventListener("DOMContentLoaded", async function () {
    const tableBody = document.getElementById("transaksi-table");
    const apiUrl = "https://ats-714220023-serlipariela-38bba14820aa.herokuapp.com/transaksi";
    const userId = localStorage.getItem("id"); // Ambil user ID secara dinamis dari local storage

    if (!userId) {
        console.error("User ID tidak ditemukan di local storage.");
        tableBody.innerHTML = `<tr><td colspan="11" class="text-center py-4 text-red-500">User ID tidak ditemukan.</td></tr>`;
        return;
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        console.log("Data fetched:", data); // Debugging: lihat data di console

        if (!Array.isArray(data)) {
            throw new Error("Data bukan array");
        }

        const filteredData = data.filter(transaksi => transaksi.id_user === userId);
        tableBody.innerHTML = ""; // Kosongkan tabel sebelum menambahkan data baru

        if (filteredData.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="11" class="text-center py-4">Tidak ada transaksi.</td></tr>`;
            return;
        }

        filteredData.forEach(transaksi => {
            const row = document.createElement("tr");
            row.innerHTML = `
            
                <td class="border px-4 py-2 text-center">${transaksi._id}</td>
                <td class="border px-4 py-2 text-center">${new Date(transaksi.created_at).toISOString().split('T')[0]}</td>
               
                <td class="border px-4 py-2 text-center">Rp ${transaksi.total_harga.toLocaleString()}</td>
                <td class="border px-4 py-2 text-center">${transaksi.metode_pembayaran}</td>
               
                <td class="border px-4 py-2 text-center">${transaksi.alamat}</td>
                <td class="border px-4 py-2 text-center">
                  <select class="px-2 py-1 border rounded" disabled>
                <option value="berhasil" ${transaksi.status === "Completed" ? "" : ""}>✅ Berhasil</option>
                <option value="pending" ${transaksi.status === "pending" ? "" : ""}>⏳ Pending</option>
                <option value="gagal" ${transaksi.status === "gagal" ? "" : ""}>❌ Gagal</option>
            </select>

                </td>
                
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching transaksi data:", error);
        tableBody.innerHTML = `<tr><td colspan="11" class="text-center py-4 text-red-500">Gagal mengambil data transaksi.</td></tr>`;
    }
});
