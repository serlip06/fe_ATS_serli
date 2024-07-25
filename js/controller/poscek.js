import { postData } from "https://bukulapak.github.io/api/process.js";
import { onClick, getValue } from "https://bukulapak.github.io/element/process.js";
import { urlPOST, AmbilResponse } from "../config/url_post.js";

let formData = {};

function validatePersonalDetails() {
    const fullName = getValue("full_name");
    const phoneNumber = getValue("phone_number");
    const email = getValue("email");
    const alamat = getValue("alamat");

    let isValid = true;

    // Clear previous error messages
    document.getElementById('full_name_error_message').style.display = 'none';
    document.getElementById('phone_number_error_message').style.display = 'none';
    document.getElementById('email_error_message').style.display = 'none';

    // Check if all fields are filled
    if (!fullName || !phoneNumber || !email || !alamat) {
        alert('Form tidak lengkap, coba lengkapi.');
        return false;
    }

    // Validate full name
    if (/[^a-zA-Z\s]/.test(fullName)) {
        document.getElementById('full_name_error_message').style.display = 'flex';
        isValid = false;
    }

    // Validate phone number
    if (/[^0-9]/.test(phoneNumber)) {
        document.getElementById('phone_number_error_message').style.display = 'flex';
        isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('email_error_message').style.display = 'flex';
        isValid = false;
    }

    if (isValid) {
        formData = {
            nama: fullName,
            phone_number: phoneNumber,
            alamat: alamat,
            email: email.split(",")
        };
    }

    return isValid;
}

function pushData() {
    postData(urlPOST, formData, AmbilResponse)
        .then(response => {
            if (response.ok) {
                alert('Data berhasil dikirim!');
                document.getElementById('personal_details_form').reset();
                document.getElementById('additional_details_form').reset();
                document.getElementById('personal_details_form').style.display = 'block';
                document.getElementById('additional_details_form').style.display = 'none';
            } else {
                alert('Terjadi kesalahan saat mengirim data.');
            }
        })
        .catch(error => {
            alert('Terjadi kesalahan: ' + error.message);
        });
}

document.getElementById('final_submit_button').addEventListener('click', function(event) {
    event.preventDefault();
    if (validatePersonalDetails()) {
        pushData();
    }
});

onClick("button", pushData);
