<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router';
import IconHamburger from './components/icons/IconHamburger.vue';

const myRouter = useRouter()
const goToHome = () => myRouter.push({ name: 'Home' })
const goToContact = () => myRouter.push({ name: 'ContactUs' })
const goToAllEvent = () => myRouter.push({ name: 'AllEvent' })
const goToSignUp = () => myRouter.push({ name: 'SignUp' })


const showMenu = ref(true)

</script>
 
<template>
    <div>

        <nav class="bg-white drop-shadow-md rounded-lg ">
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

                    <div class="hidden md:grid grid-cols-4 items-center space-x-1">
                        <button type="button" class="inline-block px-6 py-2.5 bg-blue-400 text-white 
                            font-medium text-xs leading-tight uppercase rounded 
                            shadow-sm hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500
                            focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600
                            active:shadow-lg transition duration-150 ease-in-out" @click="goToHome">HOME</button>

                        <button type="button" class="inline-block px-6 py-2.5 bg-gray-200 text-gray-700
                            font-medium text-xs leading-tight uppercase rounded 
                            shadow-sm hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 
                            focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400
                            active:shadow-lg transition duration-150 ease-in-out" @click="goToAllEvent">ALL
                            EVENTS</button>

                        <button type="button" class="inline-block px-6 py-2.5 bg-gray-800 text-white 
                            font-medium text-xs leading-tight uppercase rounded shadow-sm 
                            hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg 
                            focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg 
                            transition duration-150 ease-in-out" @click="goToContact">ABOUT US</button>

                        <button type="button" class="inline-block px-6 py-2.5 bg-gray-800 text-white 
                            font-medium text-xs leading-tight uppercase rounded shadow-sm 
                            hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg 
                            focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg 
                            transition duration-150 ease-in-out" @click="goToSignUp">SIGN UP</button>



                    </div>

                    <div class="md:hidden flex items-center">
                        <button class="py-2 px-2">
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
                <button type="button" class="font-semibold text-gray-800" @click="goToSignUp">SIGN UP</button>
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