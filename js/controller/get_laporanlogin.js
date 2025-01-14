import { addInner } from "https://bukulapak.github.io/element/process.js";
import { isiTabelUser } from "../temp/laporan_loginuser.js";
export function GetAllUser(results) {
    results.forEach(isiRow);
}
function isiRow(value) {
    let content =
        isiTabelUser.replace("#ID#", value.id)
            .replace("#USERNAME#", value.username)
            .replace("#PASSWORD#", value.password)
            .replace("#ROLE#", value.role)
            .replace("#CREATED_AT#", formatDate(value.created_at));
    addInner("iniTabel", content)
}

function formatDate(isoDate) {
        let date = new Date(isoDate);
        let month = String(date.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0
        let day = String(date.getDate()).padStart(2, '0');
        let year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }