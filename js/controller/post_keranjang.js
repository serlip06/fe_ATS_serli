const form = document.getElementById('chartForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Ambil data dari form
    const id_produk = document.getElementById('id_produk').value;
    const NamaProduk = document.getElementById('NamaProduk').value;
    const harga = document.getElementById('harga').value;
    const quantity = document.getElementById('quantity').value;

    // Hitung sub_total
    const sub_total = parseFloat(harga) * parseInt(quantity);

    // Struktur data untuk dikirim
    const data = {
        id_produk,
        NamaProduk,
        harga: parseFloat(harga), // Konversi harga menjadi angka
        quantity: parseInt(quantity), // Konversi quantity menjadi angka
        sub_total // sub_total dihitung otomatis
    };

    try {
        // Kirim data ke API
        const response = await fetch('https://ats-714220023-serlipariela-38bba14820aa.herokuapp.com/insertchartitem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Cek respons
        if (response.ok) {
            const result = await response.json();
            alert('Data berhasil dikirim: ' + JSON.stringify(result));
            form.reset(); // Reset form setelah sukses
        } else {
            const error = await response.json();
            alert('Terjadi kesalahan: ' + JSON.stringify(error));
        }
    } catch (err) {
        console.error('Error:', err);
        alert('Gagal mengirim data. Periksa koneksi Anda.');
    }
});
