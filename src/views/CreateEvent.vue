<!-- <script setup>
import {ref} from 'vue'
import CreateEditEvent from '../components/CreateEditEvent.vue'

const newBookingName = ref()
const newBookingEmail = ref()
const categorySelection = ref()
const newStartTime = ref()
const newNotes = ref()
// const newStartTime = ref()

const baseUrl = import.meta.env.PROD
    ? `${import.meta.env.VITE_BASE_URL}/api`
    : '/api'
// method: POST -- new event
const addEvent = async () => {
    const res = await fetch(`${baseUrl}/event`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            bookingName: newBookingName.value,
            bookingEmail: newBookingEmail.value,
            eventStartTime: newStartDate.value,
            eventNotes: newNotes.value,
            eventCategoryName: CategorySelection.value
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


</script>

<template>
    <div>
        <h2 class="font-bold text-4xl mx-10 my-10 text-slate-700">
            CREATE-NEW-EVENT::
        </h2>
        <div class="flex justify-center items-center h-full w-full">
            <div class="w-1/2 bg-white rounded shadow-2xl p-8 m-4">
                <div class="block w-full text-center text-gray-800 text-3xl font-bold mb-3">
                    <h1>Booking Information</h1>
                    <p class="text-sm font-light">please fill out the form</p>
                </div>
                <div class="flex flex-col mb-4">
                    <h1 class="mb-2 font-bold text-lg text-gray-900">Booking Name</h1>
                    <input class="border py-2 px-3 text-grey-800 rounded-lg" 
                    v-model="newBookingName" type="name" placeholder="Somchai Jairuk (ss-5)" />
                </div>
                <div class="flex flex-col mb-4">
                    <label class="mb-2 font-bold text-lg text-gray-900">Email</label>
                    <input class="border py-2 px-3 text-grey-800 rounded-lg" 
                    v-model="newBookingEmail" type="email" placeholder="Somchai.jairuk@gmail.com" />
                </div>
                <div class="grid grid-cols-2 mb-2 gap-x-2">
                    <h1 class="font-bold text-lg text-gray-900">Category</h1>
                    <h1 class="font-bold text-lg text-gray-900">Duration</h1>
                </div>
                <div class="grid grid-cols-2 mb-4 gap-x-2">
                    <select v-model="CategorySelection" class="border py-2 px-3 text-grey-800 rounded-lg">
                        <option disable value>Please select one</option>
                        <option value="Client-side Clinic">Client-side Clinic</option>
                        <option value="Server-side Clinic">Server-side Clinic</option>
                        <option value="Project Management Clinic">Project Management Clinic</option>
                        <option value="Database Clinic">Database Clinic</option>
                        <option value="DevOps/Infra Clinic">DevOps/Infra Clinic</option>
                    </select>
                    <input class="border py-2 px-3 text-grey-800 rounded-lg"
                        placeholder="[duration value is from category selection]" disabled />
                </div>
                <div class="grid grid-cols-2 mb-2">
                    <h1 class="font-bold text-lg text-gray-900">Date</h1>
                    
                </div>
                <div class="grid grid-cols-2 mb-4 gap-x-2">
                    <input class="border py-2 px-3 text-grey-800 rounded-lg" v-model="newStartDate" type="datetime-local" />
                    
                </div>
                <div class="flex flex-col mb-4">
                    <label class="mb-2 font-bold text-lg text-gray-900">Notes</label>
                    <textarea class="border py-2 px-3 text-grey-800 rounded-lg" placeholder="maximum at 500 characters"
                        v-model="newNotes"></textarea>
                </div>
                <div class="flex flex-cols-2">
                    <button class="inline-block px-6 py-2.5 mt-1.5 bg-blue-400 
                        mx-auto text-white font-bold text-xl leading-tight
                         uppercase rounded shadow-sm hover:bg-blue-500 
                         hover:shadow-lg focus:bg-blue-500 focus:shadow-lg
                          focus:outline-none focus:ring-0 active:bg-blue-600
                           active:shadow-lg transition duration-150 ease-in-out" @click="addEvent">
                        SUMBIT
                    </button>
                    <CreateEditEvent @addEventCom="addEvent"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
</style> -->
