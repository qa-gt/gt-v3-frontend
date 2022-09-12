import { createRouter, createWebHistory } from "vue-router";
import { store } from "@/store";
import { ElMessage } from "element-plus";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const routes = [
    {
        path: "/",
        name: "index",
        component: () => import("@/views/IndexView.vue"),
        meta: {
            title: "首页",
            keepAlive: true,
        },
    },
    {
        path: "/user/edit",
        name: "user_edit",
        component: () => import("@/views/UserEditView.vue"),
        meta: {
            title: "个人信息编辑",
            keepAlive: true,
            requireLogin: true,
        },
    },
    {
        path: "/article/:aid",
        name: "article",
        component: () => import("@/views/ArticleView.vue"),
        meta: {
            title: "文章详情",
            keepAlive: true,
        },
    },
    {
        path: "/user/login",
        name: "login",
        component: () => import("@/views/LoginView.vue"),
        meta: {
            title: "登录",
            keepAlive: true,
        },
    },
    {
        path: "/write",
        name: "write",
        component: () => import("@/views/WriteView.vue"),
        meta: {
            title: "写文章",
            keepAlive: true,
            requireLogin: true,
        },
    },
    {
        path: "/user/change_password",
        name: "change_password",
        component: () => import("@/views/PasswordView.vue"),
        meta: {
            keepAlive: true,
            requireLogin: true,
            loginMessage: "请在登录后修改密码",
        },
    },
    {
        path: "/user/:uid",
        name: "user",
        component: () => import("@/views/UserView.vue"),
        meta: {
            title: "用户主页",
            keepAlive: true,
        },
    },
    {
        path: "/user/register",
        name: "register",
        component: () => import("@/views/RegisterView.vue"),
        meta: {
            title: "注册",
            keepAlive: true,
        },
    },
    {
        path: "/404",
        name: "404",
        component: () => import("@/views/404.vue"),
        meta: {
            title: "404",
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
            title: "关于",
            keepAlive: true,
        },
    },
    {
        path: "/formbackend",
        name: "formbackend",
        component: () => import("@/views/FormBackendView.vue"),
        meta: {
            keepAlive: true,
        },
    },
    {
        path: "/gtboard",
        name: "gtboard",
        component: () => import("@/views/GtBoardView.vue"),
        meta: {
            keepAlive: true,
        },
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/FormDataView.vue"),
        meta: {
            keepAlive: true,
        },
    },
    {
        path: "/homepage",
        name: "homepage",
        component: () => import("@/views/HomePageView.vue"),
        meta: {
            keepAlive: true,
        },
    },
    {
        path: "/datareports",
        name: "datareports",
        component: () => import("@/views/DataReportView.vue"),
        meta: {
            keepAlive: true,
        },
    },
    {
        path: "/calendar",
        name: "calendar",
        component: () => import("@/views/CalendarView.vue"),
        meta: {
            title: "校历",
            keepAlive: true,
        },
    },
    {
        path: "/tapebox/:id",
        name: "tapebox",
        component: () => import("@/views/TapeBoxView.vue"),
        meta: {
            title: "提问箱",
            keepAlive: true,
        },
    },
    {
        path: "/live",
        name: "live",
        component: () => import("@/views/LiveView.vue"),
        meta: {
            title: "直播",
            requireLogin: true,
        }
    },
    {
        path: "/im",
        name: "im",
        component: () => import("@/views/ImView.vue"),
        meta: {
            title: "私聊",
            requireLogin: true,
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
    if (to.meta.requireLogin && !store.getters.loggedIn) {
        if (to.meta.loginMessage) ElMessage.error(to.meta.loginMessage);
        next({ name: "login", query: { next: to.fullPath } });
    }
    next();
});

router.afterEach(() => {
    NProgress.done();
});

export default router;
