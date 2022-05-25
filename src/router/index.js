import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import EventDetailBase from '../views/EventDetailBase.vue'
import NotFound from '../views/NotFound.vue'
import AllEvent from '../views/AllEvent.vue'
import ContactUs from '../views/ContactUs.vue'
import EventCategoryDetailBase from '../views/EventCategoryDetailBase.vue'


const history = createWebHistory(import.meta.env.BASE_URL)

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
        path: '/event-cateogry-detai-base/:id',
        name: 'EventCategoryDetailBase',
        component: EventCategoryDetailBase
    },
    {
        path: '/:pageNotFound(.*)*',
        name: "NotFound",
        component: NotFound
    },
    
    {
        path: '/list-all-event',
        name: "AllEvent",
        component: AllEvent
    },
    {
        path: '/contact-us',
        name: "ContactUs",
        component: ContactUs
    }

    

    

]

const router = createRouter({ history, routes })

export default router
