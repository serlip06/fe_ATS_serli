//Mendapatkan parameter dari URL
const urlParams = new URLSearchParams(window.location.search);
const produkID = urlParams.get("produkID");

export let urlFetch = "https://ats-714220023-serlipariela-38bba14820aa.herokuapp.com/deleteproduk/" + produkID;
