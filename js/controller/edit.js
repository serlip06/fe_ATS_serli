export function isiData(results) {
  const inputMapping = [
    { id:'full_name', path: 'nama' },
    { id: 'phone_number', path: 'phone_number' },
    { id: 'alamat', path: 'alamat' },
    { id: 'email', path: 'email', property: 'email' },
  ];

  inputMapping.forEach(({ id, path, property }) => {
    const inputElement = document.getElementById(id);
    const value = getNestedValue(results, path, property);
    if (inputElement) {
      inputElement.value = value;
    }
  });
}

function getNestedValue(obj, path, property) {
  const value = path.split('.').reduce((value, key) => (value && value[key]) ? value[key] : '', obj);

  if (property && Array.isArray(value)) {
    // Jika value adalah array, kita hanya mengembalikan elemen pertama yang memiliki property
    for (let i = 0; i < value.length; i++) {
      if (value[i].hasOwnProperty(property)) {
        return value[i][property];
      }
    }
  }

  return value;
}
