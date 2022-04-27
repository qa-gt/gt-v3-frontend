import { createApp } from "vue";
import { store } from "./store";
import ElementPlus from "element-plus";
import { VueReCaptcha } from "vue-recaptcha-v3";
import "element-plus/dist/index.css";
import "@/assets/scss/font-awesome.css";
import App from "@/App.vue";
import router from "@/router";
import Axios from "@/plugins/axios";
import Moment from "@/plugins/moment";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import Particles from "particles.vue3";


import "./assets/scss/style.scss";

const app = createApp(App);

app.use(ElementPlus, {
    locale: zhCn,
})
    .use(Particles)
    .use(router)
    .use(store)
    .use(Axios)
    .use(Moment)
    .use(VueReCaptcha, {
        siteKey: "6LdU6xAfAAAAAIY7YrFlAByuqIhOHO1stDNGWgnx",
        loaderOptions: {
            customUrl: "https://recaptcha.google.cn/recaptcha/api.js",
            autoHideBadge: true,
        },
    })
    .mount("#app");
