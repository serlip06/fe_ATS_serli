export function isiData(results) {
    const inputMapping = [
        { id: 'nama_produk', path: 'nama_produk' },
        { id: 'deskripsi', path: 'deskripsi' },
        { id: 'harga', path: 'harga' },
        { id: 'gambar', path: 'gambar' },
        { id: 'stok', path: 'stok' },
    ];

    inputMapping.forEach(({ id, path }) => {
        const inputElement = document.getElementById(id);
        let value = getNestedValue(results, path);

        // Jika field adalah harga, pastikan nilainya numerik
        if (path === 'harga') {
            value = Number(value); // Konversi menjadi angka
            if (isNaN(value)) {
                console.error(`Invalid value for harga: ${value}`);
                value = 0; // Berikan default jika gagal
            }
        }

        if (inputElement) {
            inputElement.value = value;
        }
    });
}

function getNestedValue(obj, path) {
    return path.split('.').reduce((value, key) => (value && value[key]) ? value[key] : '', obj);
}

  
  // function getNestedValue(obj, path, property) {
  //   const value = path.split('.').reduce((value, key) => (value && value[key]) ? value[key] : '', obj);
  
  //   if (property && Array.isArray(value)) {
  //     // Jika value adalah array, kita hanya mengembalikan elemen pertama yang memiliki property
  //     for (let i = 0; i < value.length; i++) {
  //       if (value[i].hasOwnProperty(property)) {
  //         return value[i][property];
  //       }
  //     }
  //   }
  
  //   return value;
  // }