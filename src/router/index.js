import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [{
        path: '/',
        name: 'home',
        component: HomeView
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
        path: "/user",
        name: "user",
        component: () =>
            import ('../views/UserView.vue')
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
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router