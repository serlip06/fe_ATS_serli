import { addInner } from "https://bukulapak.github.io/element/process.js";
import { getRandomColor, getRandomColorName } from "https://bukulapak.github.io/image/process.js";
import { iniTabel } from "../temp/table_produk.js";

// export function GetAllProduk(results) {
//     results.forEach(isiRow);
// }
export function GetAllProduk(response) {
    if (Array.isArray(response.data)) {
        response.data.forEach(isiRow);
    } else {
        console.error("Data produk tidak dalam format array");
    }
}


function formatCurrency(amount) {
    // Convert amount to number and format with thousands separators and "Rp."
    return `Rp. ${parseFloat(amount).toLocaleString('id-ID')}`;
  }

function isiRow(value) {
    let content = 
    iniTabel.replace("#ID#", value._id || 'N/A')
            .replace("#NAMA_PRODUK#", value.nama_produk || 'N/A')
            .replace("#DESKRIPSI#", value.deskripsi || 'N/A')
            .replace("#HARGA#", formatCurrency(value.harga) || 'Rp. 0,00')
            .replace("#STOK#", value.stok || 'N/A')
            .replace("#KATEGORI#", value.kategori || 'N/A')
            .replace("#CREATED#", value.created_at || 'N/A')
            .replace("#GAMBAR#", value.gambar || 'default-image.png') // Fallback to a default image if no image URL is provided
            .replace("#IDEDIT#", value._id || 'N/A')
            .replace("#IDHAPUS#", value._id || 'N/A')
            .replace("#WARNA#", getRandomColor())
            .replace(/#WARNALOGO#/g, getRandomColorName());
    addInner("iniTabel", content);
}

