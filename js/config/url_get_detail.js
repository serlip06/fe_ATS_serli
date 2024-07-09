//Mendapatkan parameter dari URL
const urlParams = new URLSearchParams(window.location.search);
const presensiId = urlParams.get("customerId");

export let urlFetch = "https://ats-714220023-serlipariela-38bba14820aa.herokuapp.com/customer/" + customerId;