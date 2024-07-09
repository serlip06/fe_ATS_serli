const urlParams = new URLSearchParams(window.location.search);
const customerId = urlParams.get('customerId');

export let urlPUT = "https://ats-714220023-serlipariela-38bba14820aa.herokuapp.com/update/" + customerId;

export function AmbilResponse(result) {
    console.log(result); //menampilkan response API pada console
    alert(result.message); //menampilkan response API pada alert
    window.location.href = "dashboard.html"; //reload halaman setelah klik ok pada alert
}