import { postData } from "https://bukulapak.github.io/api/process.js";
import { onClick, getValue } from "https://bukulapak.github.io/element/process.js";
import { urlPOST, AmbilResponse} from "../config/url_post.js";

  function pushData() {
    const fullName = getValue("full_name");
    const phoneNumber = getValue("phone_number");

    if (/[^a-zA-Z\s]/.test(fullName)) {
      document.getElementById('full_name_error_message').style.display = 'flex';
      return;
    } else {
      document.getElementById('full_name_error_message').style.display = 'none';
    }

    if (/[^0-9]/.test(phoneNumber)) {
      document.getElementById('phone_number_error_message').style.display = 'flex';
      return;
    } else {
      document.getElementById('phone_number_error_message').style.display = 'none';
    }

    let data = {
      nama: fullName,
      phone_number: phoneNumber,
      alamat: getValue("alamat"),
      email: getValue("email")
    };

    postData('https://ats-714220023-serlipariela-38bba14820aa.herokuapp.com/insert',urlPOST, data, AmbilResponse);
  }

  document.getElementById('submit_button').addEventListener('click', function(event) {
    event.preventDefault();
    pushData();
  });

  onClick("button", pushData)