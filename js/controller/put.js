import { putData } from "https://bukulapak.github.io/api/process.js";
import { onClick, getValue } from "https://bukulapak.github.io/element/process.js";
import { urlPUT, AmbilResponse } from "../config/url_put.js";

// let formData = {};

function pushData (){
    var email = getValue ("email");

    let data= {
        nama : getValue("nama"),
        phone_number : getValue("phone_number"),
        alamat : getValue("alamat"),
        email : email.split(","),
        nama_produk : getValue("nama_produk"),
        deskripsi : getValue("deskripsi"),
        harga : parseInt(getValue("harga"), 10),
        stok : getValue("stok"),
        gambar : getValue("gambar")

    }
    putData(urlPUT,data,AmbilResponse)
}

onClick("button", pushData)

// let formData = {};

// function validatePersonalDetails() {
//     const nama = getValue("nama");
//     const phoneNumber = getValue("phone_number");

//     if (/[^a-zA-Z\s]/.test(nama)) {
//         document.getElementById('full_name_error_message').style.display = 'flex';
//         return false;
//     } else {
//         document.getElementById('full_name_error_message').style.display = 'none';
//     }

//     if (/[^0-9]/.test(phoneNumber)) {
//         document.getElementById('phone_number_error_message').style.display = 'flex';
//         return false;
//     } else {
//         document.getElementById('phone_number_error_message').style.display = 'none';
//     }

//     formData = {
//         nama: nama,
//         phone_number: phoneNumber,
//         alamat: getValue("alamat"),
//         email: getValue("email").split(","),
//     };
    
//     putData(urlPUT, formData, AmbilResponse)

//     return true;
// }

// function validateProductDetails() {
//     formData.nama_produk = getValue("nama_produk");
//     formData.deskripsi = getValue("deskripsi");
//     formData.harga = parseInt(getValue("harga"), 10);
//     formData.stok = getValue("stok");
//     formData.gambar = getValue("gambar");

//     return true;
// }

// function pushData() {
//     putData(urlPUT, formData, AmbilResponse)
//         .then(response => {
//             if (response.ok) {
//                 alert('Data berhasil dikirim!');
//                 document.getElementById('personal_details_form').reset();
//                 document.getElementById('additional_details_form').reset();
//                 document.getElementById('personal_details_form').style.display = 'block';
//                 document.getElementById('additional_details_form').style.display = 'none';
//             } else {
//                 alert('Terjadi kesalahan saat mengirim data.');
//             }
//         })
//         .catch(error => {
//             alert('Terjadi kesalahan: ' + error.message);
//         });
// }

// document.getElementById('submit_button').addEventListener('click', function(event) {
//     event.preventDefault();
//     if (validatePersonalDetails()) {
//         // Sembunyikan form pertama dan tampilkan form kedua
//         document.getElementById('personal_details_form').style.display = 'none';
//         document.getElementById('additional_details_form').style.display = 'block';
//     }
// });

// document.getElementById('final_submit_button').addEventListener('click', function(event) {
//     event.preventDefault();
//     if (validateProductDetails()) {
//         putData(urlPUT, data,AmbilResponse);
//     }
// });

// onClick("button", validatePersonalDetails);