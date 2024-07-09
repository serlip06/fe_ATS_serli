export function isiData(results) {
  const inputMapping = [
      { id: 'nama', path: 'nama' },
      { id: 'phone_number', path: 'phone_number' },
      { id: 'alamat', path: 'alamat'},
      { id: 'email', path: 'email' },
      { id: 'nama_produk', path: 'nama_produk'},
      { id: 'deskripsi', path: 'deskripsi'},
      { id: 'harga', path:'harga'},
      { id: 'stok', path:'stok'},
      { id: 'gambar', path:'gambar'},
  ];

  inputMapping.forEach(({ id, path, index, property }) => {
    const inputElement = document.getElementById(id);
    const value = getNestedValue(results, path, index, property);
    inputElement.value = value;
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
