import axios from "axios";
import router from "@/router";
import { store } from "@/store";
import { ElMessage } from "element-plus";
import "@/assets/js/go";
import WasmLoader from "@/assets/js/wasm-loader";
import WebGuard from "@/assets/wasm/guard.wasm?url";

const go = new window.Go();

(async () => {
    const wasmModule = await WasmLoader(WebGuard, go.importObject);
    go.run(wasmModule.instance);
})();

export const Axios = axios.create({
    baseURL: import.meta.env.PROD ? "https://gtapi.yxzl.top" : "/api",
});

Axios.interceptors.request.use(
    async config => {
        if (store.state.jwt) {
            config.headers.Authorization = store.state.jwt;
        }
        if (["post", "put", "patch"].includes(config.method)) {
            config.data = window.GuardEncode(JSON.stringify(config.data));
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
        // if (
        //     error.response.request.responseType === "blob" &&
        //     error.response.data instanceof Blob
        // ) {
        //     error.response.data = await DecodeBlob(error.response.data);
        // }
        if (!error.response) {
            ElMessage.error(error.message);
            return Promise.reject(error.message);
        } else if (error.response.status === 404) {
            router.push({ name: "404" });
            return Promise.reject(error.response);
        } else if (error.response.status === 403) {
            if (error.response.data.action === "relogin") {
                router.push({ name: "login" });
                ElMessage.error("登录已过期，请重新登录");
                return Promise.reject("登录信息已过期");
            } else if (error.response.data.detail) {
                ElMessage.error(error.response.data.detail);
                return Promise.reject(error.response.data.detail);
            } else if (!store.getters.loggedIn) {
                ElMessage.error("请先登录");
                return Promise.reject("用户未登录");
            }
            ElMessage.error("403错误: 身份校验失败");
            return Promise.reject("身份校验失败");
        }
        const reason = error.response.data.detail ?? error.response.data[0];
        if (error.response.status === 400) {
            if (reason) ElMessage.error(reason);
            return Promise.reject(reason);
        } else if (error.response.status === 500) {
            ElMessage.error("服务器错误");
            return Promise.reject("服务器错误");
        } else {
            return Promise.reject(reason);
        }
    }
);

export default {
    install(app) {
        app.config.globalProperties.$axios = Axios;
    },
};
