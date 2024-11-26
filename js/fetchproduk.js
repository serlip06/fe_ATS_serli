import { get } from "https://bukulapak.github.io/api/process.js";
import { GetAllProduk } from "./controller/get_produk.js";
import { urlAPI } from "./config/url_produk.js";
get(urlAPI,GetAllProduk);

