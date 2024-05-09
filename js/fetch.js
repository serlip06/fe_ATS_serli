import { get } from "https://bukulapak.github.io/api/process.js"; 
let urlAPI = "https://ats-714220023-serlipariela-38bba14820aa.herokuapp.com/";
get(urlAPI,isiTablePresensi);

function isiTablePresensi(results){
    console.log(results);
}