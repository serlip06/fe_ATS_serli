import { addInner } from "https://bukulapak.github.io/element/process.js";
import { isiTabelPending } from "../temp/table_pending-regis.js";
export function GetAllPendingRegistrations(results) {
    results.forEach(isiRow);

    // Delegasi event listener untuk tombol "Terima"
    document.getElementById("iniTabel").addEventListener("click", function (event) {
        const target = event.target;
        if (target.classList.contains("accept-btn")) {
            event.preventDefault();
            const id = target.getAttribute("data-id");
            handleAccept(id); // Panggil fungsi untuk menangani ID
        }
    });
}

function isiRow(value) {
    let content = isiTabelPending
        .replace(/#ID#/g, value.id)
        .replace("#USERNAME#", value.username)
        .replace("#PASSWORD#", value.password)
        .replace("#ROLE#", value.role)
        .replace("#SUBMITTED_AT#", formatDate(value.submitted_at));
    addInner("iniTabel", content);
}

function formatDate(isoDate) {
    let date = new Date(isoDate);
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");
    let year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

function handleAccept(id) {
    console.log("Menerima registrasi dengan ID:", id);
    fetch(`https://ats-714220023-serlipariela-38bba14820aa.herokuapp.com/approve-regis/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log("Berhasil menerima registrasi:", data);
        alert("Registrasi berhasil di-ACC!"); // Tampilkan notifikasi
    })
    .catch((error) => {
        console.error("Terjadi kesalahan:", error);
        alert("Terjadi kesalahan saat meng-ACC registrasi."); // Tampilkan notifikasi error
    });
}


// Fungsi untuk memformat tanggal ke MM/DD/YYYY
// function formatDate(isoDate) {
//     let date = new Date(isoDate);
//     let month = String(date.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0
//     let day = String(date.getDate()).padStart(2, '0');
//     let year = date.getFullYear();
//     return `${month}/${day}/${year}`;
// }
