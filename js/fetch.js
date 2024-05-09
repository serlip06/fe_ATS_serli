import { get } from "https://bukulapak.github.io/api/process.js";
import { setInner } from "https://bukulapak.github.io/element/process.js";
let urlAPI = "https://ats-714220023-serlipariela-38bba14820aa.herokuapp.com/pelanggan";
get(urlAPI,GetAllPelanggan);

function GetAllPelanggan(results){
    console.log(results);
    results.forEach(isiRow);
} 

function isiRow(value){
    console.log(value)
}