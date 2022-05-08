<script setup>
import { ref, onBeforeMount, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import EventList from '../components/EventList.vue';
import BaseButton from '../components/BaseButton.vue'
console.clear()
// binding-CSS
const btnTailWind = "inline-block px-6 py-2.5 mt-1.5 bg-blue-400 text-white font-bold text-xs leading-tight uppercase rounded shadow-sm hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"

const myRouter = useRouter()
const { params } = useRoute()
const goToDetail = () => myRouter.push({ name: 'EventDetailBase' })
const goToCreate = () => myRouter.push({ name: 'CreateEvent' })

// all done bro ? arikato
// ayo wheres the other member
// lmao we got 2 here
// susu bro
// ty good luck u 2 by :D
// /api in DEV and <host>/api in PROD

// const check = import.meta.env.VITE_BASE_URL ? 'มีข้อมูล' : 'ไม่มีข้อมูล'
// console.log('import.meta.env.VITE_BASE_URL : ', check);

// const checkPROD = import.meta.env.PROD
// console.log('import.meta.env.PROD: ', checkPROD);
// GET
// important !
// ใช้เช็คว่า baseUrl จะเป็น null รึป่าว ก็คือถ้า import.meta.env.PROD แล้วได้ null ก็คือ baseUrl = '/api'
// ถ้า import.meta.env.PROD มีแล้วมีข้อมูล ก็จะเอา `${import.meta.env.VITE_BASE_URL}/api` มาใส่ใน baseUrl
// สามารถลดรูปเหลือเป็น const baseUrl = '/api'; ได้
// const baseUrl = import.meta.env.PROD ? `${import.meta.env.VITE_BASE_URL}/api` : '/api';
// const checkURL = `${import.meta.env.PROD}`
// console.log(checkURL);
// const getEvent = async () => {
// console.log(`${baseUrl}/event`);
// ลดรูปเหลือเป็น const res = await fetch(`api/event`) ได้
// ซึ่งก็ไม่จำเป็นต้องใช้ baseUrl
// const res = await fetch(`${baseUrl}/event`)
// eventList.value = await res.json()
// console.log('data from api: ', eventList.value);

// }
// onBeforeMount(async () => {
//     await getEvent()
// })


// import { ref, onBeforeMount } from 'vue'
// import EventList from '../components/EventList.vue';
// const eventList = ref([])
// // GET
// const getEvent = async () => {
//     const res = await fetch(`${import.meta.env.VITE_BASE_URL}/event`)
//     eventList.value = await res.json()
// }
// onBeforeMount(async () => {
//     await getEvent()
// })


// GET:: Card
const eventCard = ref([])
const baseUrl = import.meta.env.PROD ? `${import.meta.env.VITE_BASE_URL}/api` : '/api'
// const checkURL = `${import.meta.env.PROD}`
// console.log(checkURL);
const getEventCard = async () => {
    console.log(`${baseUrl}/event`)
    // ลดรูปเหลือเป็น const res = await fetch(`api/event`) ได้
    // ซึ่งก็ไม่จำเป็นต้องใช้ baseUrl
    const res = await fetch(`${baseUrl}/event`)
    // const res = await fetch(`${import.meta.env.VITE_BASE_URL}/event`)
    eventCard.value = await res.json()
    console.log('data from api: ', eventCard.value)
}

onBeforeMount(async () => {
    await getEventCard()
    console.log("length of eventCard: ", eventCard.value)
})

const noScheduleImg = 'https://img.freepik.com/free-vector/man-reading-concept-illustration_114360-8705.jpg?t=st=1651136740~exp=1651137340~hmac=d17fed796546aa370aea3c826f9743b6eb558fd34399d6cf89663051933ab10f&w=826'


</script>

<template>
    <div>
        <!-- No Schedule -->
        <div v-show="eventCard == 0" class="grid place-items-center h-screen">
            <h1 class="font-bold text-5xl text-blue-500">No Scheduled Events</h1>
            <img :src="noScheduleImg" alt="noScheduleImg" />
        </div>

        <!-- GET ALL -->
        <div v-show="eventCard != 0">
            <!-- <h2 class="font-bold text-5xl mx-10 my-10">LIST-ALL</h2>
        <EventList :event="eventList" /> -->
            <h2 class="font-bold text-4xl mx-10 my-10 text-slate-700">
                LIST-ALL::
            </h2>

            <div class="w-full m-auto grid lg:grid-cols-4 items-center justify-center bg-white text-gray-900 ">
                <div class="mx-10 my-10 max-w-sm rounded-lg overflow-hinden shadow-lg hover:scale-110 transition-transform"
                    v-for="(event, index) in eventCard" :key="index">
                    <div>
                        <!-- <img class="object-fill h-80 w-fit rounded-lg m-auto" :src="frontEndImg" alt="Book Image" /> -->
                    </div>
                    <div class="px-6 py-2 text-left">
                        <div>
                            <span class="flex text-xl font-bold">
                                <!-- <BaseRating :rating="book.rating" />
                            <span class="text-base py-1 px-1">{{ book.rating }}</span> -->
                            </span>
                        </div>

                        <div>
                            <div class="font-bold text-2xl mb-2 text-gray-700">

                                {{ event.eventCategory1 }}
                                <span>
                                    <!--Space between eventCategory and date-->
                                </span>
                                <!-- <span class="border-solid border-2 border-blue-400 rounded-3xl  ">
                                    <span class="text-blue-400 font-semibold text-base text-center px-2  ">
                                        {{ new Date(event.eventStartTime).toLocaleDateString('th') }}
                                    </span>
                                </span> -->
                                <span class="text-blue-400 
                                hover:text-white border
                                border-blue-700 hover:bg-blue-800
                                focus:ring-4 focus:outline-none
                                transition duration-500 ease-in-out
                                focus:ring-blue-300 font-semibold
                                rounded-3xl text-sm px-1.5 py-1
                                text-center mr-2 mb-2 dark:border-blue-500
                                dark:text-blue-500 dark:hover:text-white
                                dark:hover:bg-blue-600 dark:focus:ring-blue-800">
                                    {{ new Date(event.eventStartTime).toLocaleDateString('th') }}
                                </span>

                            </div>

                            <ul class="mb-2">
                                <li>Name: {{ event.bookingName }}</li>
                                <!-- <li>eventStartTime: {{ event.eventStartTime }}</li> -->
                                <li>Start Time: {{ new
                                        Date(event.eventStartTime).toLocaleTimeString('en', {
                                            hour: '2-digit', minute:
                                                '2-digit'
                                        })
                                }}
                                </li>
                                <li>Duration: {{ event.eventDuration }} minutes</li>
                            </ul>
                        </div>

                        <hr />
                        <div class="flex my-2">
                            <span class="content-center mx-auto">
                                <!-- <BaseButton buttonName="Details" /> -->
                                <router-link
                                    :to="{ name: 'EventDetailBase', params: { id: event.id, bookingName: event.bookingName } }">
                                    <button :class="btnTailWind">Details</button>
                                </router-link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="relative" >

            <button class="fixed bottom-8 right-16 p-0 w-25 h-25 bg-blue-400 rounded-full hover:bg-blue-500  
                hover:scale-150 transition-transform
                active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none" @click="goToCreate">
                <svg viewBox="0 0 20 20" enable-background="new 0 0 20 20" class="w-16 h-16 inline-block">
                    <path fill="#FFFFFF" d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z" />
                </svg>
            </button>
        </div>
        </div>
        
    </div>

</template>
