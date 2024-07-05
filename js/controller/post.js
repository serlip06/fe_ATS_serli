import { postData } from "https://bukulapak.github.io/api/process.js";
import { onClick, getValue } from "https://bukulapak.github.io/element/process.js";
import { urlPOST, AmbilResponse} from "../config/url_post.js";


function pushData(){
    
    var stok = getValue("stok");

    let data = {
        nama : getValue(getValue("nama")),
        phone_number : getValue(getValue("phone_number")),
        alamat : getValue("alamat"),
        phone_number : getValue("phone_number"),
        email : getValue("email"),
        nama_produk : getValue("nama_produk"),
        deskripsi : getValue("deskripsi"),
        harga : getValue("harga"),
        gambar : getValue("gambar"),
        stok : stok,
    }
    postData(urlPOST, data, AmbilResponse);

}

onClick("button", pushData);