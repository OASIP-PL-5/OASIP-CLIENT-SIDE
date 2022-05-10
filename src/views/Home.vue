<script setup>
import { ref, onBeforeMount, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import EventList from '../components/EventList.vue'
import CreateEditEvent from '../components/CreateEditEvent.vue'

console.clear()
// binding-CSS
const btnTailWind =
    'inline-block px-6 py-2.5 mt-1.5 bg-blue-400 text-white font-bold text-xs leading-tight uppercase rounded shadow-sm hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out'

const myRouter = useRouter()
const { params } = useRoute()
const goToDetail = () => myRouter.push({ name: 'EventDetailBase' })
const goToCreate = () => myRouter.push({ name: 'CreateEvent' })

// GET:: Card
const eventCard = ref([])
const baseUrl = import.meta.env.PROD
    ? `${import.meta.env.VITE_BASE_URL}/api`
    : '/api'
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
    console.log('length of eventCard: ', eventCard.value)
})

const noScheduleImg =
    'https://img.freepik.com/free-vector/man-reading-concept-illustration_114360-8705.jpg?t=st=1651136740~exp=1651137340~hmac=d17fed796546aa370aea3c826f9743b6eb558fd34399d6cf89663051933ab10f&w=826'



const toggleModal = ref(false)
// console.log(toggleModal.value);

// const newStartTime = ref()
// const newNotes = ref()
// method: POST -- add event
const addEvent = async (newEvent) => {
    const res = await fetch(`${baseUrl}/event`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            bookingName: newEvent,
            bookingEmail: newEvent,
            eventStartTime: newEvent,
            eventNotes: newEvent,
            eventCategoryName: newEvent
        })
    })
    if (res.status === 201) {
        const addedEvent = await res.json()
        eventCard.value.push(addedEvent)
        console.log('added sucessfully');
        alert('add event success !')
    } else {
        console.log('error, cannot be added');
        alert('error!!!\nadd event ไม่ได้ เพราะหำของคุณเล็กเกินไป')
    }
}
// toggleModal = !toggleModal
</script>

<template>
    <div>
        <!-- modal for POST-event from CreateEditEvent.vue(component)-->
        <CreateEditEvent v-if="toggleModal" @closeToggle="toggleModal = !toggleModal" @addEventComp="addEvent" />


        <!-- No Schedule -->
        <div v-show="eventCard == 0" class="grid place-items-center h-screen">
            <h1 class="font-bold text-5xl text-blue-500">No Scheduled Events</h1>
            <img :src="noScheduleImg" alt="noScheduleImg" />
        </div>

        <!-- GET ALL -->
        <div v-show="eventCard != 0">
            <h2 class="font-bold text-4xl mx-10 my-10 text-slate-700 ">LIST-ALL::</h2>
            <div class="w-full md:w-1/3 p-5 mx-10">
                <div class="relative">
                    <div class="absolute flex items-center ml-2 h-full">
                        <svg class="w-4 h-4 fill-current text-primary-gray-dark" viewBox="0 0 16 16" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z">
                            </path>
                        </svg>
                    </div>

                    <input type="text" placeholder="Search by eventCategory, bookingName..."
                        class="px-8 py-3 w-7/12 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm" />
                </div>

                <div class="flex items-center justify-between mt-4 w-7/12">
                    <p class="font-medium">Filters</p>

                    <button
                        class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md">
                        Reset Filter
                    </button>
                </div>

                <div>
                    <div class="grid grid-cols-2 gap-4 mt-4 w-7/12">
                        <select
                            class="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                            <option value="">All Category</option>
                            <option>Client-side Clinic</option>
                            <option>Server-side Clinic</option>
                            <option>Project Management Clinic</option>
                            <option>Database Clinic</option>
                            <option>DevOps/Infra Clinic</option>
                        </select>

                        <select
                            class="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
                            <option value="">All Date</option>
                            <option>Past</option>
                            <option>Upcoming</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="w-full m-auto grid lg:grid-cols-4 items-center justify-center bg-white text-gray-900 ">
                <div class="mx-10 my-5 max-w-sm rounded-lg overflow-hinden shadow-lg hover:scale-110 transition-transform"
                    v-for="(event, index) in eventCard" :key="index">
                    <div class="px-6 py-2 text-left">
                        <div>
                            <div class="font-bold text-2xl mb-2 text-gray-700">
                                {{ event.eventCategoryName }}
                                <span>
                                    <!--Space between eventCategory and date-->
                                </span>
                                <span
                                    class="text-blue-400 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none transition duration-500 ease-in-out focus:ring-blue-300 font-semibold rounded-3xl text-sm px-1.5 py-1 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800">
                                    {{ new Date(event.eventStartTime).toLocaleDateString('th') }}
                                </span>
                            </div>

                            <ul class="mb-2">
                                <li>Name: {{ event.bookingName }}</li>
                                <li>
                                    Start Time:
                                    {{
                                            new Date(event.eventStartTime).toLocaleTimeString('en', {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })
                                    }}
                                </li>
                                <li>Duration: {{ event.eventDuration }} minutes</li>
                            </ul>
                        </div>

                        <hr />
                        <div class="flex my-2">
                            <span class="content-center mx-auto">
                                <router-link :to="{
                                    name: 'EventDetailBase',
                                    params: { id: event.id, bookingName: event.bookingName }
                                }">
                                    <button :class="btnTailWind">Details</button>
                                </router-link>
                            </span>
                        </div>

                    </div>

                </div>

            </div>

            <div class="relative">
                <button @click="toggleModal = !toggleModal" data-modal-toggle="defaultModal" type="button"
                    class="fixed bottom-8 right-16 p-0 w-25 h-25 bg-blue-400 rounded-full hover:bg-blue-500 hover:scale-150 transition-transform active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
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
