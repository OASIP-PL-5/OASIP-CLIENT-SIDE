<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onBeforeMount, computed } from 'vue'
// import VueCookies from 'vue-cookies'
import jwt_decode from 'jwt-decode'


const token = localStorage.getItem('jwtToken');
const isLogin = localStorage.getItem('email') ? true : false
const isAdmin = ref(false)

if (isLogin == true) {
    var decoded = jwt_decode(token);
    if (decoded.role === 'admin') {
        isAdmin.value = true
    }
}

const myRouter = useRouter()


const goToAllEvent = () => myRouter.push({ name: 'AllEvent' })
const goToCreate = () => myRouter.push({ name: 'CreateEvent' })
const goToAllUser = () => myRouter.push({ name: 'AllUser' })
const goToContact = () => myRouter.push({ name: 'ContactUs' })


const baseUrl = import.meta.env.PROD
    ? `${import.meta.env.VITE_BASE_URL}/api`
    : '/api'
// const checkURL = `${import.meta.env.PROD}`
// console.log(checkURL);
const eventCategoryCard = ref([])


console.clear()

const getAllEventCategory = async () => {
    console.log(`${baseUrl}/event-categories`)
    // ลดรูปเหลือเป็น const res = await fetch(`api/event`) ได้
    // ซึ่งก็ไม่จำเป็นต้องใช้ baseUrl
    const res = await fetch(`${baseUrl}/event-categories`, {
        headers: {
            'content-type': 'application/json',

        }
    })
    // const res = await fetch(`${import.meta.env.VITE_BASE_URL}/event`)
    eventCategoryCard.value = await res.json()
    // eventCategoryCard.value.push({ img_path: 'https://img.freepik.com/free-vector/server-concept-illustration_114360-147.jpg?t=st=1653815388~exp=1653815988~hmac=2a39c6bf2f79464a865832515586160c01884eb7f6566fc41f18a4e3f00a8fbe&w=826' })

    console.clear()
    console.log('data from api: ', eventCategoryCard.value)
    // console.log(token);
    if (isLogin == true) {
        console.log(`isLogin: ${isLogin}`);
        console.log(`decoded: ${decoded.role}`);
        // isAdmin = true
    }

    // console.log('find img:', eventCategoryCard.value[5].img_path);
}

onBeforeMount(async () => {
    await getAllEventCategory()
    console.log('length of eventCard: ', eventCategoryCard.value)
    // console.log('decoded',jwt_decode(token));

})


const toggleModal = ref(false)
</script>
    
<template>
    <div>
        <!-- modal for POST-event from EditEventCategory.vue(component)-->
        <EditEventCategory v-if="toggleModal" @closeToggle="closeToggle" />
        <div class="px-14 mx-10 flex flex-wrap flex-row items-center">
            <div class="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left z-10">
                <h1 class="mt-33 text-8xl font-bold leading-tight text-slate-800">
                    OASIP
                </h1>
                <p class="text-2xl font-light text-slate-900">
                    Online Appointment Scheduling System
                    <span>
                        <br />
                    </span>
                    for Integrated Project Clinics
                </p>
                <div class="my-4 mx-4 text-xl font-semibold text-slate-800">
                    <ul class="list-disc">
                        <li>Makes appointment for each clinic (event)</li>
                        <li>The slot duration is up to each clinic setting</li>
                        <li>Can reschedule / cancel event</li>
                    </ul>
                </div>
                <div class="flex gap-x-4">
                    <button class="text-blue-400 border border-blue-400 
                            duration-500 ease-in-out font-bold 
                            rounded-lg text-2xl px-1.5 py-1.5 
                            text-center mb-2 hover:shadow-xl" @click="goToAllEvent">
                        SCHEDULE
                    </button>
                    <button v-show="isAdmin" class="text-orange-400
                         hover:text-white border border-orange-700
                        hover:bg-orange-800 focus:ring-4 inline-flex 
                        items-center focus:outline-none transition 
                        duration-500 ease-in-out focus:ring-orange-300 
                        font-light rounded-lg text-2xl px-1.5 py-1.5 mb-2  text-center 
                        dark:border-orange-500 dark:text-orange-500 dark:hover:text-white
                        dark:hover:bg-orange-600 dark:focus:ring-orange-800" @click="goToAllUser">
                        OUR USERS
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                            aria-hidden="true" role="img" class="iconify iconify--ph" width="32" height="32"
                            preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256">
                            <path fill="currentColor"
                                d="m234.8 150.4l-14.9-19.8c.1-1.8 0-3.7 0-5.1l14.9-19.9a7.8 7.8 0 0 0 1.3-6.9a114.8 114.8 0 0 0-10.9-26.4a8.2 8.2 0 0 0-5.8-4l-24.5-3.5l-3.7-3.7l-3.5-24.5a8.2 8.2 0 0 0-4-5.8a114.8 114.8 0 0 0-26.4-10.9a7.8 7.8 0 0 0-6.9 1.3L130.6 36h-5.2l-19.8-14.8a7.8 7.8 0 0 0-6.9-1.3a114.8 114.8 0 0 0-26.4 10.9a8.2 8.2 0 0 0-4 5.8l-3.5 24.5l-3.7 3.7l-24.5 3.5a8.2 8.2 0 0 0-5.8 4a114.8 114.8 0 0 0-10.9 26.4a7.8 7.8 0 0 0 1.3 6.9l14.9 19.8v5.1l-14.9 19.9a7.8 7.8 0 0 0-1.3 6.9a114.8 114.8 0 0 0 10.9 26.4a8.2 8.2 0 0 0 5.8 4l24.5 3.5l3.7 3.7l3.5 24.5a8.2 8.2 0 0 0 4 5.8a114.8 114.8 0 0 0 26.4 10.9a7.6 7.6 0 0 0 2.1.3a7.7 7.7 0 0 0 4.8-1.6l19.8-14.8h5.2l19.8 14.8a7.8 7.8 0 0 0 6.9 1.3a114.8 114.8 0 0 0 26.4-10.9a8.2 8.2 0 0 0 4-5.8l3.5-24.6c1.2-1.2 2.6-2.5 3.6-3.6l24.6-3.5a8.2 8.2 0 0 0 5.8-4a114.8 114.8 0 0 0 10.9-26.4a7.8 7.8 0 0 0-1.3-6.9ZM128 172a44 44 0 1 1 44-44a44 44 0 0 1-44 44Z">
                            </path>
                        </svg>
                    </button>
                    <!-- <button class="text-white bg-blue-500 border
                                    border-white hover:bg-blue-800
                                    focus:ring-4 focus:outline-none
                                    duration-500 ease-in-out
                                    focus:ring-blue-300 font-bold
                                    rounded-lg text-2xl px-1.5 py-1.5
                                    text-center mb-2 dark:border-blue-500 
                                    hover:scale-125 transition-transform" @click="goToCreate">
                            BOOK NOW</button> -->
                </div>
            </div>
            <!-- <div class="relative">
                    <img src="../assets/decorate-bg.png" alt="pic" class="md:w-6/12 md:h-6/12 md:fixed right-18 top-12 ">
                </div> -->
            <div class="w-full md:w-3/5">
                <img src="../assets/decorate-bg.png" />
            </div>
        </div>
        <div class="shape-background">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                preserveAspectRatio="none">
                <path d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z" class="shape-fill"></path>

            </svg>

        </div>
        <!-- content section -->
        <div class="text-gray-600 body-font" id="eventCateSection">
            <div class="container px-24 py-24 mx-auto">
                <div class="flex flex-wrap -m-4">
                    <div class="p-4 md:w-1/3" v-for="(eventCategories, index) in eventCategoryCard" :key="index">
                        <div
                            class="h-full rounded-xl shadow-cla-blue bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden">
                            <img class="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100"
                                :src="eventCategories.catImg" />
                            <div class="p-6">
                                <h1 class="title-font text-4xl font-bold text-gray-600 mb-3">
                                    {{ eventCategories.eventCategoryName }}
                                </h1>
                                <div class="leading-relaxed mb-3">
                                    <p v-if="eventCategories.eventCategoryDescription === null">
                                        Unfortunately this clinic has no description yet.📁
                                    </p>
                                    <p v-else>{{ eventCategories.eventCategoryDescription }}</p>
                                </div>
                                <!-- เอา duration ไปแสดงใน EventCategoryDetailBase -->
                                <!-- <div class="leading-relaxed mb-3">
                                        <span class="font-bold">Duration :</span>
                                        {{ eventCategories.eventDuration }} minutes
                                    </div> -->

                                <router-link :to="{
                                    name: 'EventCategoryDetailBase',
                                    params: { id: eventCategories.id }
                                }">
                                    <button @click="toggleModal = !toggleModal" type="button"
                                        class="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-sm hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out">
                                        LEARN MORE
                                    </button>
                                </router-link>
                                <!-- <div class="flex items-center flex-wrap ">
                                        <button
                                            class="bg-gradient-to-r from-cyan-400 to-blue-400 hover:scale-105 drop-shadow-md  shadow-cla-blue px-4 py-1 rounded-lg">Learn
                                            more</button>
    
                                    </div> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <footer class="p-4 shadow md:px-6 md:py-8z bg-blue-400">

            <span class="block text-lg text-white sm:text-center">© 2022 <a href="" class="hover:underline"
                    @click="goToContact">PL5 |
                    ALLFORONE </a>. All
                Rights Reserved.
            </span>

        </footer>
    </div>
</template>
    
<style>
#eventCateSection {
    background-color: #3a66c9;
}

.shape-background {
    position: absolute;
    top: 150;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
}

.shape-background svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 46px;
}

.shape-background .shape-fill {
    fill: white;
}
</style>