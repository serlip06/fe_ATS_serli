async function deleteData(IDHAPUS) {
    // Gunakan endpoint yang sesuai dengan spesifikasi API
    const target_url = `https://ats-714220023-serlipariela-38bba14820aa.herokuapp.com/deletechartitem/${IDHAPUS}`;

    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        // Kirim permintaan ke API
        const response = await fetch(target_url, requestOptions);

        // Periksa apakah respons berhasil
        if (!response.ok) {
            throw new Error(`Gagal menghapus data. HTTP Status: ${response.status}`);
        }

        const result = await response.json();
        alert(result.message || "Data berhasil dihapus.");

        // Perbarui data keranjang tanpa memuat ulang halaman
        await fetchAndRenderData();
    } catch (error) {
        console.error("Error saat menghapus data:", error);
    }
}

function confirmDelete(IDHAPUS) {
    if (confirm(`Apakah ingin menghapus data dengan _id: ${IDHAPUS}?`)) {
        deleteData(IDHAPUS);
    }
}
