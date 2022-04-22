import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
const history = createWebHistory()

const routes = [
    {
        path: '/home',
        name: 'Home',
        component: Home
    }
]

const router = createRouter({ history, routes })

export default router
