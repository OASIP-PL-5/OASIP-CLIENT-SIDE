<script setup>
import { useRoute, useRouter } from 'vue-router';
const myRouter = useRouter()

const goToHome = () => myRouter.push({ name: 'Home' })
const goToCreate = () => myRouter.push({ name: 'CreateEvent' })


</script>
 
<template>

    <div>
        <div class="px-14 mx-10 flex flex-wrap flex-row items-center">
            <div class="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left z-10">
                <h1 class="mt-36 text-8xl font-bold leading-tight text-slate-800">OASIP</h1>
                <p class="text-2xl font-light text-slate-900">Online Appointment Scheduling System
                    <span>
                        <br>
                    </span>
                    for Integrated
                    Project Clinics
                </p>
                <div class="my-4 mx-4 text-xl font-semibold text-slate-800">
                    <ul class="list-disc">
                        <li>Makes appointment for each clinic (event)</li>
                        <li>The slot duration is up to each clinic setting </li>
                        <li>Can reschedule / cancel event</li>

                    </ul>
                </div>
                <div class="flex gap-x-4 ">
                    <button class="text-blue-400 
                                border border-blue-400 
                                 duration-500 ease-in-out
                                font-bold rounded-lg text-2xl px-1.5 py-1.5
                                text-center mb-2 hover:shadow-xl
                                " @click="goToHome">
                        SCHEDULE</button>
                    <button class="text-white bg-blue-500 border
                                border-white hover:bg-blue-800
                                focus:ring-4 focus:outline-none
                                duration-500 ease-in-out
                                focus:ring-blue-300 font-bold
                                rounded-lg text-2xl px-1.5 py-1.5
                                text-center mb-2 dark:border-blue-500 
                                hover:scale-125 transition-transform" @click="goToCreate">
                        BOOK NOW</button>
                </div>
            </div>
            <div class="relative z-0">
                <img src="../assets/3959915.jpg" alt="pic" class="md:w-8/12 md:h-8/12 md:fixed right-0 top-44 ">
            </div>
        </div>
    </div>
</template>
 
<style>
</style>
