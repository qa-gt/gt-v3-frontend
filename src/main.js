import { createApp } from "vue";
import { store } from "./store";
import ElementPlus from "element-plus";
import { VueReCaptcha } from "vue-recaptcha-v3";
import "element-plus/dist/index.css";
import * as ElIcons from "@element-plus/icons";
import App from "./App.vue";
import router from "./router";
import Axios from "@/plugins/axios";
import Moment from "@/plugins/moment";

import "./assets/scss/style.scss";

const app = createApp(App);
for (const name in ElIcons) {
    app.component(name, ElIcons[name]);
}

app
    .use(ElementPlus)
    .use(router)
    .use(store)
    .use(Axios)
    .use(Moment)
    .use(VueReCaptcha, { siteKey: "6LdU6xAfAAAAAIY7YrFlAByuqIhOHO1stDNGWgnx" })
    .mount("#app");
