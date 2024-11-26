import { postData } from "https://bukulapak.github.io/api/process.js";
import { onClick, getValue } from "https://bukulapak.github.io/element/process.js";
import { urlPOST, AmbilResponse } from "../config/url_post.js";



// let formData = {};

function pushData(){
    var email = getValue("email");
    
    let data = {
        
    nama : getValue("nama"),
    phone_number : getValue("phone_number"),
    alamat : getValue("alamat"),
    email : email.split(",")
    }
    postData(urlPOST, data, AmbilResponse);
}
onClick("button", pushData);

// Validasi Personal Details
// function validatePersonalDetails() {
//     const fullName = getValue("nama");
//     const phoneNumber = getValue("phone_number");
//     const alamat = getValue("alamat");
//     const email = getValue("Email").split(",").map(e => e.trim());

//     // Validasi nama
//     if (/[^a-zA-Z\s]/.test(fullName) || fullName === "") {
//         document.getElementById('full_name_error_message').style.display = 'flex';
//         return false;
//     } else {
//         document.getElementById('full_name_error_message').style.display = 'none';
//     }

//     // Validasi nomor telepon
//     if (/[^0-9]/.test(phoneNumber) || phoneNumber === "") {
//         document.getElementById('phone_number_error_message').style.display = 'flex';
//         return false;
//     } else {
//         document.getElementById('phone_number_error_message').style.display = 'none';
//     }

//     // Validasi email
//     if (!email.every(e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e))) {
//         alert("Email tidak valid, pastikan format benar!");
//         return false;
//     }

//     // Simpan data validasi ke `formData`
//     formData = {
//         nama: fullName,
//         phone_number: phoneNumber,
//         alamat: alamat,
//         email: email,
//     };

//     return true;
// }

// // Push Data
// function pushData() {
//     postData(urlPOST, formData, AmbilResponse)
//         .then(response => {
//             if (response.ok) {
//                 alert('Data berhasil dikirim!');
//                 document.getElementById('additional_details_form').reset();
//             } else {
//                 response.json().then(data => {
//                     alert('Gagal mengirim data: ' + data.message);
//                 });
//             }
//         })
//         .catch(error => {
//             alert('Terjadi kesalahan: ' + error.message);
//         });
// }

// // Event Listener
// document.getElementById('button').addEventListener('click', function(event) {
//     event.preventDefault();
//     if (validatePersonalDetails()) {
//         pushData();
//     }
// });

// function validateProductDetails() {
//     formData.nama_produk = getValue("nama_produk");
//     formData.deskripsi = getValue("deskripsi");
//     formData.harga =parseInt(getValue("harga"), 10);
//     formData.stok = getValue("stok");
//     formData.gambar = getValue("gambar");

//     return true;
// }

// function pushData() {
//     postData(urlPOST, formData, AmbilResponse)
//         .then(response => {
//             if (response.ok) {
//                 alert('Data berhasil dikirim!');
//                 // document.getElementById('personal_details_form').reset();
//                 document.getElementById('additional_details_form').reset();
//                 // document.getElementById('personal_details_form').style.display = 'block';
//                 document.getElementById('additional_details_form').style.display = 'none';
//             } else {
//                 alert('Terjadi kesalahan saat mengirim data.');
//             }
//         })
//         .catch(error => {
//             alert('Terjadi kesalahan: ' + error.message);
//         });
// }



// document.getElementById('final_submit_button').addEventListener('click', function(event) {
//     event.preventDefault();
//     if (validateProductDetails()) {
//         pushData();
//     }
// });

