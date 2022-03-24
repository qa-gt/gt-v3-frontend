import { createApp } from "vue";
import { store } from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElIcons from "@element-plus/icons";
import App from "./App.vue";
import router from "./router";
import Axios from "@/plugins/axios";
import Moment from "@/plugins/moment";

//导入scss文件
import "./assets/scss/style.scss";
// import elementIcons from "./utils/elementIcons";

const app = createApp(App);
for (const name in ElIcons) {
    app.component(name, ElIcons[name]);
}
app.use(ElementPlus)
    // .use(elementIcons)
    .use(router)
    .use(store)
    .use(Axios)
    .use(Moment)
    .mount("#app");
