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
import SignIn from '../views/SignIn.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import ResetPassword from '../views/ResetPassword.vue'
import ChangePassword from '../views/ChangePassword.vue'


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
    },
    {
        path: '/sign-in',
        name: 'SignIn',
        component: SignIn
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: ForgotPassword
    },
    {
        path: '/reset-password',
        name: 'ResetPassword',
        component: ResetPassword
    },
    {
        path: '/setting-password',
        name: 'ChangePassword',
        component: ChangePassword
    }





]

const router = createRouter({ history, routes })

export default router
