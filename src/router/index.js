import { createRouter, createWebHashHistory } from "vue-router";
//import HomeView from '../views/HomeView.vue'

const routes = [
    {
        path: "/",
        name: "home",
        redirect: "/index",
    },
    {
        path: "/index",
        name: "index",
        component: () => import("@/views/IndexView.vue"),
        meta: {
            keepAlive: true,
        },
    },
    {
        path: "/user/edit",
        name: "user_edit",
        component: () => import("@/views/UserEditView.vue"),
    },
    {
        path: "/article/:id",
        name: "article",
        component: () => import("@/views/ArticleView.vue"),
    },
    {
        path: "/user/login",
        name: "login",
        component: () => import("@/views/LoginView.vue"),
        meta: {
            keepAlive: true,
        },
    },
    {
        path: "/write",
        name: "write",
        component: () => import("@/views/WriteView.vue"),
    },
    {
        path: "/user/repassword",
        name: "repassword",
        component: () => import("@/views/PasswordView.vue"),
    },
    {
        path: "/user/:id",
        name: "user",
        component: () => import("@/views/UserView.vue"),
    },
    {
        path: "/user/register",
        name: "register",
        component: () => import("@/views/RegisterView.vue"),
    },
    {
        path: "/404",
        name: "404",
        component: () => import("@/views/404.vue"),
    },
    {
        path: "/:catchAll(.*)",
        redirect: "/404",
        hidden: true,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
