import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
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
    ],
    resolve: {
        alias: [
            {
                find: "@",
                replacement: path.resolve(__dirname, "src"),
            },
        ],
    },
    optimizeDeps: {
        include: ["@kangc/v-md-editor/lib/theme/vuepress.js"],
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
    transpileDependencies: ["vuex-persist"]
});
