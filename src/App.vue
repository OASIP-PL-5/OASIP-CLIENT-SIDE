<script setup>
import { ref, onBeforeMount } from 'vue'
import EventList from './components/EventList.vue';
console.clear()
const eventList = ref([])
// all done bro ? arikato
// ayo wheres the other member
// lmao we got 2 here
// susu bro
// ty good luck u 2 by :D
// /api in DEV and <host>/api in PROD

// GET
// important !
const baseUrl = import.meta.env.PROD ? `${import.meta.env.VITE_BASE_URL}/api` : '/api';
const getEvent = async () => {
    console.log(`${baseUrl}/event`);
    const res = await fetch(`${baseUrl}/event`)
    eventList.value = await res.json()
    console.log(eventList.value);
}
onBeforeMount(async () => {
    await getEvent()
})
</script>
 
<template>
    <div>
        <h2 class="font-bold text-5xl mx-10 my-10">LIST-ALL</h2>
        <ul>
            <li v-for="(event, index) in eventList" :key="index">
                {{ event.eventCategory1 }} -
                {{ event.id }} - {{ event.bookingName }} - {{ event.bookingEmail }}
                - {{ event.eventStartTime }}
                <hr>
            </li>
        </ul>
        <router-view />
    </div>
</template>
 
<style>
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