import { get } from "https://bukulapak.github.io/api/process.js";
import { GetAllPendingRegistrations } from "./controller/get_Pending-regis.js";
import { urlAPI } from "./config/url_pending-regis.js";
get(urlAPI,GetAllPendingRegistrations );