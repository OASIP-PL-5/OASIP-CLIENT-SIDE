<script setup>
import { ref, onBeforeMount, toHandlers } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const myRouter = useRouter()
const goToNotFound = () => myRouter.push({ name: 'NotFound' })

console.clear()
const { params } = useRoute()
const goToHome = () => myRouter.push({ name: 'Home' })




// GET:: DetailBases
const thisEventDetail = ref([])
const baseUrl = import.meta.env.PROD
    ? `${import.meta.env.VITE_BASE_URL}/api`
    : '/api'

const getThisEventCard = async () => {
    const id = params.id
    // console.log(`${baseUrl}/event`)
    const res = await fetch(`${baseUrl}/event/${id}`)
    thisEventDetail.value = await res.json()
    // console.log(id);
    // console.log(res.status);
    // console.log('data from api: ', thisEventDetail.value)
    console.log(`res.status = 200? --> ${res.status == 200 ? true : false}`);
    console.log(thisEventDetail.value);
    // important  why ? try delete this the app will be rekted what is rekted never goona give youuup
    if (res.status !== 200) {
        await goToNotFound()
        console.log(`event: ${id} is not exist!`);
    }
}
onBeforeMount(async () => {
    await getThisEventCard()
})

</script>

<template>
    <div>

        <div>

            <!-- eventCategory : {{ thisEventDetail.eventCategory1 }}
            bookingName: {{ thisEventDetail.bookingName }}
            bookingEmail: {{ thisEventDetail.bookingEmail }}
            eventNotes: {{ thisEventDetail.eventNotes }}
            eventStartTime: {{ thisEventDetail.eventStartTime }}
            eventDuration: {{ thisEventDetail.eventDuration }} -->
            <!-- <ul class="list-disc" v-for="(thisEvent, index) in thisEventDetail" :key="index">
                <li>
                    {{ thisEvent }}
                </li>
            </ul> -->

            <div>
                <!-- <h2 class="font-bold text-5xl mx-10 my-10">LIST-ALL</h2>
        <EventList :event="eventList" /> -->
                <h2 class="font-bold text-4xl mx-10 my-10 text-slate-700">
                    EVENT-DETAIL-BASE::
                </h2>
                <div>
                    <div class="w-11/12 m-auto  grid items-center justify-center bg-white text-gray-900">
                        <div class="mx-10 my-3 max-w-none rounded-lg overflow-hinden shadow-lg">
                            <div>
                                <!-- <img class="object-fill h-80 w-fit rounded-lg m-auto" :src="frontEndImg" alt="Book Image" /> -->
                            </div>
                            <div class="px-6 py-4 text-left">
                                <div>
                                    <span class="flex text-xl font-bold">
                                        <!-- <BaseRating :rating="book.rating" />
                            <span class="text-base py-1 px-1">{{ book.rating }}</span> -->
                                    </span>
                                </div>

                                <div>
                                    <div class="font-bold text-5xl mb-2 flex gap-x-4 text-gray-700">
                                        <!-- {{ event.eventCategory1 }} -->
                                        {{ thisEventDetail.eventCategory1 }}

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
                                rounded-3xl text-lg px-1.5 py-1.5
                                text-center mb-2 dark:border-blue-500
                                dark:text-blue-500 dark:hover:text-white
                                dark:hover:bg-blue-600 dark:focus:ring-blue-800">
                                            {{ new Date(thisEventDetail.eventStartTime).toLocaleDateString('th') }}
                                        </span>
                                    </div>

                                    <ul>
                                        <li>Name: {{ thisEventDetail.bookingName }}</li>
                                        <li>Email: {{ thisEventDetail.bookingEmail }}</li>
                                        <li v-if="thisEventDetail.eventNotes === null">Notes: - </li>
                                        <li v-else>Notes: {{ thisEventDetail.eventNotes }}</li>
                                        <li>Start Time: {{ new
                                                Date(thisEventDetail.eventStartTime).toLocaleTimeString('en', {
                                                    hour: '2-digit', minute:
                                                        '2-digit'
                                                })
                                        }}
                                        </li>
                                        <li>Duration: {{ thisEventDetail.eventDuration }} minutes</li>
                                    </ul>
                                    <div class="grid grid-cols-4">
                                        <button class="text-blue-400 
                                                hover:text-white border
                                                border-blue-700 hover:bg-blue-800
                                                focus:ring-4 focus:outline-none
                                                transition duration-500 ease-in-out
                                                focus:ring-blue-300 font-light
                                                rounded-xl text-lg 
                                                text-center mr-16 mt-2 dark:border-blue-500
                                                dark:text-blue-500 dark:hover:text-white
                                                dark:hover:bg-blue-600 dark:focus:ring-blue-800" @click="goToHome">
                                            BACK
                                        </button>
                                        <span></span>
                                        <button class="text-orange-400 
                                                hover:text-white border
                                                border-orange-700 hover:bg-orange-800
                                                focus:ring-4 focus:outline-none
                                                transition duration-500 ease-in-out
                                                focus:ring-orange-300 font-light
                                                rounded-xl text-lg px-3 py.5
                                                text-center mr-2 mt-2 dark:border-orange-500
                                                dark:text-orange-500 dark:hover:text-white
                                                dark:hover:bg-orange-600 dark:focus:ring-orange-800">
                                            EDIT
                                        </button><button class="text-red-400 
                                                hover:text-white border
                                                border-red-700 hover:bg-red-800
                                                focus:ring-4 focus:outline-none
                                                transition duration-500 ease-in-out
                                                focus:ring-red-300 font-light
                                                rounded-xl text-lg px-3 py.5
                                                text-center  mt-2 dark:border-red-500
                                                dark:text-red-500 dark:hover:text-white
                                                dark:hover:bg-red-600 dark:focus:ring-red-800">
                                            CANCLE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
</style>
