import { addInner } from "https://bukulapak.github.io/element/process.js";
import { getRandomColor, getRandomColorName } from "https://bukulapak.github.io/image/process.js";
import { iniTabel} from "../temp/table_produk.js";
export function GetAllProduk(results) {
    results.forEach(isiRow);
}
function isiRow(value){
    let content = 
    iniTabel.replace("#NAMA_PRODUK#", value.nama_produk)
            .replace("#DESKRIPSI#", value.deskripsi)
            .replace("#HARGA#", value.harga)
            .replace("#STOK#", value.harga)
            .replace("#GAMBAR#", value.gambar)
            .replace("#WARNA#", getRandomColor())
            .replace(/#WARNALOGO#/g, getRandomColorName());
        addInner("iniTabel", content);
}

