<script setup>
import { computed } from '@vue/reactivity';
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router';
import IconHamburger from './components/icons/IconHamburger.vue';
import jwt_decode from 'jwt-decode'



const myRouter = useRouter()
const goToHome = () => myRouter.push({ name: 'Home' })
const goToContact = () => myRouter.push({ name: 'ContactUs' })
const goToAllEvent = () => myRouter.push({ name: 'AllEvent' })
const goToSignUp = () => myRouter.push({ name: 'SignUp' })
const goToSignIn = () => myRouter.push({ name: 'SignIn' })
const userEmail = localStorage.getItem('email')
const token = localStorage.getItem('jwtToken');
const userName = jwt_decode(token).userName
const userRole = jwt_decode(token).role


const loggingIn = ref(false)
const checkIsLogin = computed(() => {
    if (localStorage.getItem('jwtToken')) {
        console.log('token: ', localStorage.getItem('jwtToken'))
        return loggingIn.value = true
    }
    else {
        return loggingIn.value = false
    }

})
// console.log('login? : ', checkIsLogin.value);
const showMenu = ref(true)

const logOut = () => {
    // localStorage.removeItem('jwtToken')
    // localStorage.removeItem('refreshToken')
    // localStorage.removeItem('email')
    localStorage.clear()
    loggingIn.value = false
    console.log('logout');
    location.reload();
    goToHome()
}

const showProfile = ref(false)
const toggle = () => {
    showProfile.value = true
}
</script>
 
<template>
    <div>

        <nav class="bg-white drop-shadow-md rounded-lg sticky top-0 z-50 ">
            <div class="max-w-full mx-16">
                <div class="flex justify-between">
                    <div class="flex space-x-4">
                        <div>
                            <a href="#" class="flex items-center py-2 text-gray-700" @click="goToHome">
                                <!-- <img src="./assets/FUNBOOK-LOGO.png" alt="LOGO" :style="logoSize" /> -->
                                <span class="font-bold text-5xl px-1 text-transparent 
                                bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">OASIP I PL-5</span>
                                <!-- <span class="font-light">Online Appointment <br>
                                    Scheduling System <br>
                                    for Integrated Project Clinics</span> -->
                            </a>
                        </div>
                    </div>

                    <div class="hidden md:flex flex-cols-5 items-center gap-x-14 text-xl">
                        <button type="button" class="text-blue-400" @click="goToHome">HOME</button>

                        <button type="button" class="link link-underline link-underline-black" @click="goToAllEvent">ALL
                            EVENTS</button>

                        <button type="button" class="link link-underline link-underline-black"
                            @click="goToContact">ABOUT US</button>


                        <button v-if="loggingIn == false" type="button" class=" rounded-lg px-4  bg-blue-400 text-white 
                                font-bold rounded-lg text-center
                                shadow-sm hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500
                                focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600
                                active:shadow-lg transition duration-150 ease-in-out" @click="goToSignIn">SIGN
                            IN</button>

                            <!-- old_logout button-->
                        <!-- <button v-if="loggingIn == true" type="button" class="rounded-lg px-4  bg-gray-500 text-white 
                                font-bold rounded-lg text-center
                                shadow-sm hover:bg-gray-600 hover:shadow-lg focus:bg-gray-600
                                focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-700
                                active:shadow-lg transition duration-150 ease-in-out" @click="logOut">SIGN
                            OUT</button> -->


                        <!-- <button v-show="checkIsLogin" 
                            class="rounded-lg shadow-lg bg-white">{{ userEmail }}</button> -->

                        <button v-show="checkIsLogin" id="dropdownInformationButton"
                            data-dropdown-toggle="dropdownInformation" class="bg-white rounded-lg
                             text-lg px-2 py-1 text-center inline-flex
                                items-center shadow-lg " type="button">{{ userName }}<svg class="ml-2 w-4 h-4"
                                aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7"></path>
                            </svg> </button>

                        <!-- Dropdown menu -->
                        <div id="dropdownInformation"
                            class="hidden w-52 bg-white rounded-lg divide-y divide-gray-100 shadow-lg"
                            style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(0px, 10px);"
                            data-popper-placement="bottom">
                            <div class="py-3 px-4 text-sm text-black ">
                                <div>{{userRole}}</div>
                                <div class="font-medium truncate">{{ userEmail }}</div>
                            </div>
                            <ul class="py-1 text-sm text-black divide-y" aria-labelledby="dropdownInformationButton">
                                <li>
                                    <a href="#" class="block py-2 px-4 
                                        hover:bg-gray-400 
                                        dark:hover:bg-gray-100 
                                        ">Change password</a>
                                </li>
                                <li @click="logOut" class="block py-2 px-4  
                                        hover:bg-gray-800 
                                        dark:hover:bg-gray-600 hover:text-white cursor-pointer">Sign
                                    out</li>
                            </ul>



                        </div>


                        <!-- <div v-show="showProfile"
                            class="text-black">
                            <div class="py-3 px-4 text-sm text-gray-900 dark:text-black">
                                <div>Bonnie Green</div>
                                <div class="font-medium truncate">name@flowbite.com</div>
                            </div>
                            <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownInformationButton">
                                <li>
                                    <a href="#"
                                        class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                                </li>
                                <li>
                                    <a href="#"
                                        class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                                </li>
                                <li>
                                    <a href="#"
                                        class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                                </li>
                            </ul>
                            <div class="py-1">
                                <a href="#"
                                    class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign
                                    out</a>
                            </div>
                        </div> -->






                    </div>



                    <div class="md:hidden flex items-center">
                        <button class="py-2 px-2 mt-1">
                            <icon-hamburger @click="showMenu = !showMenu" class="text-gray-700" />
                        </button>
                    </div>
                </div>
            </div>

            <hr>
            <div class="md:hidden grid grid-rows-3 text-xl divide-y " :class="{ hidden: showMenu }">
                <button type="button" class="font-semibold text-blue-400" @click="goToHome">HOME</button>
                <button type="button" class="font-semibold text-gray-400" @click="goToAllEvent">ALL
                    EVENTS</button>
                <button type="button" class="font-semibold text-gray-800" @click="goToContact">ABOUT US</button>
                <button v-if="loggingIn == false" type="button" class="font-semibold text-gray-800"
                    @click="goToSignIn">SIGN IN</button>
                <button v-if="loggingIn == true" type="button" class="font-semibold text-gray-800" @click="logOut">SIGN
                    OUT</button>
            </div>
        </nav>

        <!-- <h2 class="font-bold text-5xl mx-10 my-10">LIST-ALL</h2>
        <ul>
            <li v-for="(event, index) in eventList" :key="index">
                {{ event.eventCategory1 }} -
                {{ event.id }} - {{ event.bookingName }} - {{ event.bookingEmail }}
                - {{ event.eventStartTime }}
                <hr>
            </li>
        </ul> -->
        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
</template>
 
<style scoped>
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active,
.fade-leave.active {
    transition: opacity 1.2s ease-out;
}

.link-underline {
    border-bottom-width: 0;
    background-image: linear-gradient(transparent, transparent), linear-gradient(#fff, #fff);
    background-size: 0 3px;
    background-position: 0 100%;
    background-repeat: no-repeat;
    transition: background-size .5s ease-in-out;
}

.link-underline-black {
    background-image: linear-gradient(transparent, transparent), linear-gradient(#7299f1, #7299f1)
}

.link-underline:hover {
    background-size: 100% 3px;
    background-position: 0 100%
}
</style>

<!-- <script setup>
// const event = new Date('April 27, 2022 10:09:00 UTC');

// const jsonDate = event.toJSON();

// console.log(jsonDate);
// // expected output: 2022-04-27T23:15:30.000Z

// console.log(new Date(jsonDate).toUTCString());
// // expected output: We, 27 April 2022 10:09:00 GMT

</script>
 
<template>
    <div>
        navbar goes here
        <nav class="bg-white drop-shadow-md rounded-lg ">
            <div class="max-w-screen-xl mx-auto">
                <div class="flex justify-between">
                    <div class="flex space-x-4">
                        logo
                        <div>
                            <a href="#" class="flex items-center py-2 text-gray-700 hover:text-gray-900"
                                @click="goToHome">
                                <img src="./assets/FUNBOOK-LOGO.png" alt="LOGO" :style="logoSize" />
                                <span class="font-bold text-7xl px-2">OASIP</span>
                                <span class="font-light">Online Appointment <br>
                                    Scheduling System <br>
                                    for Integrated Project Clinics</span>
                            </a>
                        </div>
                    </div>



                    secondary nav
                    <div class="hidden md:flex items-center space-x-1">
                        <button type="button" class="inline-block px-6 py-2.5 bg-blue-400 text-white 
                            font-medium text-xs leading-tight uppercase rounded 
                            shadow-sm hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500
                            focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600
                            active:shadow-lg transition duration-150 ease-in-out" @click="goToHome">HOME</button>


                        <button type="button" class="inline-block px-6 py-2.5 bg-gray-200 text-gray-700
                            font-medium text-xs leading-tight uppercase rounded 
                            shadow-sm hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 
                            focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400
                            active:shadow-lg transition duration-150 ease-in-out" @click="">ABOUT PROJECT</button>

                        <button type="button" class="inline-block px-6 py-2.5 bg-gray-800 text-white 
                            font-medium text-xs leading-tight uppercase rounded shadow-sm 
                            hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg 
                            focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg 
                            transition duration-150 ease-in-out" @click="">ABOUT US</button>
                    </div>
                </div>
            </div>
        </nav>
        <router-view></router-view>
    </div>
</template>
 
<style>
</style> -->