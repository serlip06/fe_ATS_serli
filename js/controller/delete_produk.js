function deleteData(IDHAPUS) {
    var produkID = IDHAPUS;
    var target_url = "https://ats-714220023-serlipariela-38bba14820aa.herokuapp.com/deleteproduk/" + produkID;

    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };

    fetch(target_url, requestOptions)
        .then(response => response.json())
        .then(result => {
            alert(result.message);
            location.reload();
        })
        .catch(error => console.log('Error:', error));
}

function confirmDelete(IDHAPUS) {
    if (confirm("Apakah ingin menghapus data ID " + IDHAPUS + "?")) {
        deleteData(IDHAPUS);
    }
}