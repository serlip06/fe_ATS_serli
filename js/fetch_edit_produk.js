import { get } from "https://bukulapak.github.io/api/process.js";
import { isiData } from "./controller/edit_produk.js";
import { urlFetch } from "./config/url_get_detail_produk.js";
get(urlFetch, isiData);

