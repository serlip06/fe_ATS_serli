const form = document.getElementById('registrationForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Ambil data dari form
    const nama_produk = document.getElementById('nama_produk').value;
    const deskripsi = document.getElementById('deskripsi').value;
    const harga = document.getElementById('harga').value;
    const gambar = document.getElementById('gambar').value;
    const stok = document.getElementById('stok').value;

    // Struktur data untuk dikirim
    const data = {
        nama_produk,
        deskripsi,
        harga: parseFloat(harga), // Konversi harga menjadi angka
        gambar,
        stok: parseInt(stok) // Konversi stok menjadi angka
    };

    try {
        // Kirim data ke API
        const response = await fetch('https://ats-714220023-serlipariela-38bba14820aa.herokuapp.com/insertproduk', {
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