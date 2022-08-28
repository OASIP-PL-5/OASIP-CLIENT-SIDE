import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import EventDetailBase from '../views/EventDetailBase.vue'
import NotFound from '../views/NotFound.vue'
import AllEvent from '../views/AllEvent.vue'
import ContactUs from '../views/ContactUs.vue'
import EventCategoryDetailBase from '../views/EventCategoryDetailBase.vue'
import AllUser from '../views/AllUser.vue'
import UserDetail from '../views/UserDetail.vue'
import SignUp from '../views/SignUp.vue'

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
    ,
    {
        path: '/list-all-user',
        name: "AllUser",
        component: AllUser
    }
    ,
    {
        path: '/user-detail/:id',
        name: 'UserDetail',
        component: UserDetail
    },
    {
        path: '/sign-up',
        name: 'SignUp',
        component: SignUp
    }
    




]

const router = createRouter({ history, routes })

export default router
