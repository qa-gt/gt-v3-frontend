import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import legacy from "@vitejs/plugin-legacy";
import prismjs from "vite-plugin-prismjs";

const path = require("path");

export default defineConfig({
    presets: ["@babel/preset-env"],
    plugins: [
        vue(),
        prismjs({
            languages: [
                "json",
                "python",
                "javascript",
                "typescript",
                "css",
                "scss",
                "markdown",
                "html",
                "xml",
                "go",
                "java",
                "c",
                "cpp",
                "bash",
                "powershell",
                "php",
                "sql",
                "yaml",
            ],
        }),
        legacy({
            targets: ["defaults", "not IE 11"],
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            "./runtimeConfig": "./runtimeConfig.browser",
        },
    },
    server: {
        proxy: {
            "/api": {
                target: "http://127.0.0.1:8000",
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, ""),
            },
        },
    },
    build: {
        target: "es2015",
        chunkSizeWarningLimit: 1600,
    },
    transpileDependencies: ["vuex-persist"],
});
