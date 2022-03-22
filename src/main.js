import { createApp } from 'vue';
import { store } from './store.js';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElIcons from '@element-plus/icons'
import App from './App.vue';
import router from './router';
import axios from 'axios';

// v-md-editor
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';
VueMarkdownEditor.use(vuepressTheme, {
    Prism,
});

//导入scss文件
import "./assets/scss/style.scss";
// import "../public/scss/Index.scss";
// import elementIcons from "./utils/elementIcons";
axios.defaults.baseURL = 'http://127.0.0.1:8000/';

const app = createApp(App);
for (const name in ElIcons) {
    app.component(name, ElIcons[name])
}
app
    .use(ElementPlus)
    // .use(elementIcons)
    .use(router)
    .use(store)
    .use(VueMarkdownEditor)
    .mount('#app');