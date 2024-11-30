const urlParams = new URLSearchParams(window.location.search);
const produkId = urlParams.get('produkID');

export let urlPUTPRODUK = "https://ats-714220023-serlipariela-38bba14820aa.herokuapp.com/updateproduk/" + produkId;

export function AmbilResponse(result) {
    console.log(result); //menampilkan response API pada console
    alert(result.message); //menampilkan response API pada alert
    window.location.href = "adminmenu.html"; //reload halaman setelah klik ok pada alert
}