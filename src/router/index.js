import { createRouter, createWebHistory } from "vue-router";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

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
        path: "/article/:aid",
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
        path: "/user/:uid",
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
    history: createWebHistory(),
    routes,
});

NProgress.configure({
    showSpinner: false
});

router.beforeEach(() => {
    NProgress.start();
});

router.afterEach(() => {
    NProgress.done();
});

export default router;
