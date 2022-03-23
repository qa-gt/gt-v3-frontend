import { createRouter, createWebHashHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'

const routes = [{
    path: '/',
    name: 'home',
    redirect: "/index",
},
{
    path: "/index",
    name: "index",
    component: () => import('@/views/IndexView.vue'),
    meta: {
        keepAlive: true,
    }
},
{
    path: "/user/edit",
    name: "user_edit",
    component: () => import('@/views/UserEditView.vue')
},
{
    path: "/article/:id",
    name: "article",
    component: () => import('@/views/ArticleView.vue')
},
{
    path: "/user/login",
    name: "login",
    component: () => import('@/views/LoginView.vue'),
    meta: {
        keepAlive: true,
    }
},
{
    path: "/write",
    name: "write",
    component: () => import('@/views/WriteView.vue')
},
{
    path: "/user/repassword",
    name: "password",
    component: () => import('@/views/PasswordView.vue')
},
{
    path: "/user/:id",
    name: "userinfo",
    component: () => import('@/views/UserInfoView.vue')
},
{
    path: "/user/register",
    name: "register",
    component: () => import('@/views/RegisterView.vue')
},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router