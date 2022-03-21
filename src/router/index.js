import { createRouter, createWebHashHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'

const routes = [{
        path: '/',
        name: 'home',
        redirect: "/index",
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
    {
        path: '/test',
        name: 'test',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/TestView.vue')
    },
    {
        path: "/index",
        name: "index",
        component: () =>
            import ('../views/IndexView.vue')
    },
    {
        path: "/user/edit",
        name: "user_edit",
        component: () =>
            import ('../views/UserEditView.vue')
    },
    {
        path: "/article",
        name: "article",
        component: () =>
            import ('../views/ArticleView.vue')
    },
    {
        path: "/login",
        name: "login",
        component: () =>
            import ('../views/LoginView.vue')
    },
    {
        path: "/write",
        name: "write",
        component: () =>
            import ('../views/WriteView.vue')
    },
    {
        path: "/password",
        name: "password",
        component: () =>
            import ('../views/PasswordView.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router