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
    component: () => import('@/views/IndexView.vue')
},
{
    path: "/user/edit",
    name: "user_edit",
    component: () => import('@/views/UserEditView.vue')
},
{
    path: "/article",
    name: "article",
    component: () => import('@/views/ArticleView.vue')
},
{
    path: "/login",
    name: "login",
    component: () => import('@/views/LoginView.vue')
},
{
    path: "/write",
    name: "write",
    component: () => import('@/views/WriteView.vue')
},
{
    path: "/password",
    name: "password",
    component: () => import('@/views/PasswordView.vue')
},
{
    path: "/user",
    name: "userinfo",
    component: () => import('@/views/UserInfoView.vue')
},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router