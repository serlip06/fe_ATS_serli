import { get } from "https://bukulapak.github.io/api/process.js";
import { GetAllUser} from "./controller/get_laporanlogin.js";
import { urlAPI } from "./config/url_get_laporanlogin.js";
get(urlAPI, GetAllUser)