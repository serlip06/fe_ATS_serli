export function isiData(results) {
  const inputMapping = [
    { id:'nama', path: 'nama' },
    { id: 'phone_number', path: 'phone_number' },
    { id: 'alamat', path: 'alamat' },
    { id: 'email', path: 'email', property: 'email' },
    { id: 'nama_produk', path: 'nama_produk' },
    { id: 'deskripsi', path: 'deskripsi' },
    { id: 'harga', path: 'harga'},
    { id: 'gambar', path: 'gambar' },
    { id: 'stok', path: 'stok' },
  ];

  inputMapping.forEach(({ id, path, property }) => {
    const inputElement = document.getElementById(id);
    const value = getNestedValue(results, path, property);
    if (inputElement) {
      inputElement.value = value;
    }
  });
}
function getNestedValue(obj, path, index, property) {
  const value = path.split('.').reduce((value, key) => (value && value[key]) ? value[key] : '', obj);
  // console.log(`Value at path ${path}:`, value);

  if (Array.isArray(value) && value.length > index && value[index].hasOwnProperty(property)) {
    return value[index][property];
  }

  return value;
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