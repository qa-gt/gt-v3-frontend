import axios from "axios";
import router from "@/router";
import { store } from "@/store";
import { ElMessage } from "element-plus";

export const Axios = axios.create({
    // baseURL: process.env.NODE_ENV === 'production' ? 'http://ctfapi.hcc.io' : '/api',
    baseURL: "http://192.168.31.50:8000/",
});

Axios.interceptors.request.use(
    config => {
        if (store.state.jwt) {
            config.headers.Authorization = `${store.state.jwt}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

Axios.interceptors.response.use(
    response => {
        response = response.data;
        if (response.status && response.status !== "success") {
            ElMessage.error(response.detail);
            return Promise.reject(response);
        }
        return response;
    },
    async error => {
        console.log(error);
        if (!error.response) {
            ElMessage.error(error.message);
            return Promise.reject(error.message);
        }
        // if (
        //     error.response.request.responseType === "blob" &&
        //     error.response.data instanceof Blob
        // ) {
        //     error.response.data = await DecodeBlob(error.response.data);
        // }
        if (
            error.response.status === 403 &&
            error.response.data.action === "relogin"
        ) {
            router.push("/login");
            ElMessage.error("登录已过期，请重新登录");
            return Promise.reject("登录信息已过期");
        }else if(error.response.status === 400){
            ElMessage.error(error.response.data.detail);
            return Promise.reject(error.response.data.detail);
        } else if (error.response.status === 500) {
            ElMessage.error("服务器错误");
            return Promise.reject("服务器错误");
        } else {
            return Promise.reject(
                error.response.data.detail ?? error.response.data[0]
            );
        }
    }
);

export default {
    install(app) {
        app.config.globalProperties.$axios = Axios;
    },
};
