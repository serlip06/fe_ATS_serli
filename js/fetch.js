import { get } from "https://bukulapak.github.io/api/process.js";
import { addInner } from "https://bukulapak.github.io/element/process.js";
import { getRandomColor, getRandomColorName } from "https://bukulapak.github.io/image/process.js";
import { isiTabel } from "./table";
let urlAPI = "https://ats-714220023-serlipariela-38bba14820aa.herokuapp.com/pelanggan";
get(urlAPI,GetAllPelanggan);

function GetAllPelanggan(results){
    console.log(results);
    results.forEach(isiRow);
} 

function isiRow(value){
    let content = 
    isiTabel.replace("#NAMA#", value.nama)
            .replace("#NOMER_TELEPON#", value.phone_number)
            .replace("#ALAMAT#", value.alamat)
            .replace("#EMAIL#", value.email)
            .replace("#WARNA#", getRandomColor())
            .replace(/#WARNALOGO#/g, getRandomColorName());
        addInner("iniTabel", content);
}