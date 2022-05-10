import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import EventDetailBase from '../views/EventDetailBase.vue'
import NotFound from '../views/NotFound.vue'
import CreateEvent from '../views/CreateEvent.vue'
import AboutProject from '../views/AboutProject.vue'
import ContactUs from '../views/ContactUs.vue'


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
    },
    {
        path: '/create-event',
        name: "CreateEvent",
        component: CreateEvent
    },
    {
        path: '/about-project',
        name: "AboutProject",
        component: AboutProject
    },
    {
        path: '/contact-us',
        name: "ContactUs",
        component: ContactUs
    }

    

    

]

const router = createRouter({ history, routes })

export default router
