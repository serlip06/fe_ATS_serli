export let urlPOST = "https://ats-714220023-serlipariela-38bba14820aa.herokuapp.com/insertchartitem"

export function AmbilResponse(result) {
    console.log(result); //menampilkan response API pada console
    alert(result.message); //menampilkan response API pada alert
    window.location.reload(); //reload halaman setelah klik ok pada alert
}