import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import EventDetailBase from '../views/EventDetailBase.vue'
import NotFound from '../views/NotFound.vue'
const history = createWebHistory()

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/event-detail-base/:id',
        name: 'EventDetailBase',
        component: EventDetailBase
    },
    
    {
        path: '/:pageNotFound(.*)*',
        name: "NotFound",
        component: NotFound
    }
    

]

const router = createRouter({ history, routes })

export default router
