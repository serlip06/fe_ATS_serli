import { addInner } from "https://bukulapak.github.io/element/process.js";
import { getRandomColor, getRandomColorName } from "https://bukulapak.github.io/image/process.js";
import { isiTabel } from "../temp/table.js";
import { isiTabel } from "../temp/tableproduk.js";
export function GetAllPelanggan(results) {
    results.forEach(isiRow);
}
function isiRow(value){
    let content = 
    isiTabel.replace("#ID#", value._id)
            .replace("#NAMA#", value.nama)
            .replace("#PHONE_NUMBER#", value.phone_number)
            .replace("#ALAMAT#", value.alamat )
            .replace("#EMAIL#", value.email)
            .replace("#NAMA_PRODUK#", value.nama_produk)
            .replace("#DESKRIPSI#", value.deskripsi)
            .replace("#HARGA#", value.harga)
            .replace("#STOK#", value.harga)
            .replace("#GAMBAR#", value.gambar)
            .replace("#IDEDIT#", value._id)
            .replace("#IDHAPUS#", value._id)
            .replace("#WARNA#", getRandomColor())
            .replace(/#WARNALOGO#/g, getRandomColorName());
        addInner("iniTabel", content);
}

function isiRow(value){
    let content = 
    isiTabel.replace("#ID#", value._id)
            .replace("#NAMA#", value.nama)
            .replace("#PHONE_NUMBER#", value.phone_number)
            .replace("#ALAMAT#", value.alamat )
            .replace("#EMAIL#", value.email)
            .replace("#NAMA_PRODUK#", value.nama_produk)
            .replace("#DESKRIPSI#", value.deskripsi)
            .replace("#HARGA#", value.harga)
            .replace("#STOK#", value.harga)
            .replace("#GAMBAR#", value.gambar)
            .replace("#IDEDIT#", value._id)
            .replace("#IDHAPUS#", value._id)
            .replace("#WARNA#", getRandomColor())
            .replace(/#WARNALOGO#/g, getRandomColorName());
        addInner("ituTabel", content);
}