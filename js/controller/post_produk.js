import { postData } from "https://bukulapak.github.io/api/process.js";
import { onClick, getValue } from "https://bukulapak.github.io/element/process.js";
import { urlPOST, AmbilResponse } from "../config/url_post.js";


// function formatRupiah(value) {
//     value = value.replace(/[^,\d]/g, '');
//     let split = value.split(',');
//     let sisa = split[0].length % 3;
//     let rupiah = split[0].substr(0, sisa);
//     let ribuan = split[0].substr(sisa).match(/\d{3}/gi);
    
//     if (ribuan) {
//       let separator = sisa ? '.' : '';
//       rupiah += separator + ribuan.join('.');
//     }
  
//     rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
//     return 'Rp ' + rupiah;
//   }
  
//   function pushData() {
//     let harga = getValue("harga");
//     let formattedHarga = formatRupiah(harga);
  
//     let data = {
//       nama_produk: getValue("nama_produk"),
//       deskripsi: getValue("deskripsi"),
//       gambar: getValue("gambar"),
//       harga: formattedHarga,
//       stok: getValue("stok")
//     };
    
//     postData(urlPOST, data, AmbilResponse);
//   }
  
//   onClick("button", pushData);

function pushData(){
  let data = {
    nama_produk : getValue("nama_produk"),
    deskirpsi :getValue("deskripsi"),
    gambar :getValue("gambar"),
    harga :getValue("harga"),
    stok :getValue("stok")
  }
  postData(urlPOST, data, AmbilResponse);
}
onClick("button", pushData)