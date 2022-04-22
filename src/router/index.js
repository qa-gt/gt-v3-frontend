import { createRouter, createWebHistory } from "vue-router";
import { store } from "@/store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const routes = [
    {
        path: "/",
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
        meta: {
            keepAlive: true,
            requireLogin: true,
        },
    },
    {
        path: "/article/:aid",
        name: "article",
        component: () => import("@/views/ArticleView.vue"),
        meta: {
            keepAlive: true,
        },
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
        meta: {
            keepAlive: true,
            requireLogin: true,
        },
    },
    {
        path: "/user/repassword",
        name: "repassword",
        component: () => import("@/views/PasswordView.vue"),
        meta: {
            keepAlive: true,
            requireLogin: true,
        },
    },
    {
        path: "/user/:uid",
        name: "user",
        component: () => import("@/views/UserView.vue"),
        meta: {
            keepAlive: true,
        },
    },
    {
        path: "/user/register",
        name: "register",
        component: () => import("@/views/RegisterView.vue"),
        meta: {
            keepAlive: true,
        },
    },
    {
        path: "/404",
        name: "404",
        component: () => import("@/views/404.vue"),
        meta: {
            keepAlive: true,
        },
    },
    {
        path: "/allusers",
        name: "allusers",
        component: () => import("@/views/AllUserView.vue"),
        meta: {
            keepAlive: true,
        },
    },
    {
        path: "/about",
        name: "about",
        component: () => import("@/views/AboutView.vue"),
        meta: {
            keepAlive: true,
        }
    },
    {
        path: "/formbackend",
        name: "formbackend",
        component: () => import("@/views/FormBackendView.vue"),
        meta: {
            keepAlive: true,
        }
    },
    {
        path: "/gtboard",
        name: "gtboard",
        component: () => import("@/views/GtBoardView.vue"),
        meta: {
            keepAlive: true,
        }
    },
    {
        path: "/:catchAll(.*)",
        redirect: "/404",
        hidden: true,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

NProgress.configure({
    showSpinner: false,
});

router.beforeEach((to, from, next) => {
    NProgress.start();
    if (to.meta.requireLogin && !store.getters.loggedIn)
        next({ name: "login" });
    next();
});

router.afterEach(() => {
    NProgress.done();
});

export default router;
