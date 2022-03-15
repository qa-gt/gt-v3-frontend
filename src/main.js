import { createApp } from 'vue';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import App from './App.vue';
import router from './router';

//导入scss文件
import "../public/scss/style.scss";
// import "../public/scss/Index.scss";
//import store from "./store/index";
//import elementIcons from "./utils/elementIcons";


const app = createApp(App);
app
    .use(ElementPlus)
    //.use(elementIcons)
    .use(router)
    //.use(store)
    .mount('#app');