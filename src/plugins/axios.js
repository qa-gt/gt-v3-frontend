import axios from "axios";
import router from "@/router";
import { store } from "@/store";

export const Axios = axios.create({
    // baseURL: process.env.NODE_ENV === 'production' ? 'http://ctfapi.hcc.io' : '/api',
    baseURL: "http://127.0.0.1:8000/",
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
        return response.data;
    },
    async error => {
        if (!error.response) {
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
            return Promise.reject("登录信息已过期");
        } else if (error.response.status === 500) {
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
