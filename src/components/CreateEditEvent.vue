<script setup>
import { computed, ref, onBeforeMount } from 'vue'
defineEmits(['closeToggle', 'addEventComp', 'updateEventComp'])
const props = defineProps({
  currentEvent: {
    type: Object,
    default: {}
  }
})

const newEvent = computed(() => {
  return {
    id: props.currentEvent.id,
    bookingName: props.currentEvent.bookingName,
    bookingEmail: props.currentEvent.bookingEmail,
    eventCategoryName: props.currentEvent.eventCategoryName,
    eventDuration: props.currentEvent.eventDuration,
    eventNotes: props.currentEvent.eventNotes,
    eventStartTime: props.currentEvent.eventStartTime,
    eventCategoryId: props.currentEvent.eventCategoryId
  }
})
// const togxgleModal = ref(false)

// GET เพื่อจะ map [id และ duration : จะทำให้สามารถ POST ได้]
const eventCategory = ref([])
const baseUrl = import.meta.env.PROD
  ? `${import.meta.env.VITE_BASE_URL}/api`
  : '/api'

// const BASEURL = "http://202.44.9.103:8080/pl5/api"

const getEventCategory = async () => {
  console.log(`${baseUrl}/event-category`)
  // const res = await fetch(`${baseUrl}/event-category`)
  const res = await fetch("http://202.44.9.103:8080/pl5/api/event-category")

  eventCategory.value = await res.json()
  console.log('data from api: ' + eventCategory.value)
}
onBeforeMount(async () => {
  await getEventCategory()
})
const notShow = ref(false)
const test = ref()
</script>
 
<template>
  <div>
    <div class="fixed z-40 inset-0 top-screen bg-black bg-opacity-25 ">
      <div class="flex justify-center items-center h-full w-full  ">
        <div class="md:w-6/12 bg-white rounded shadow-2xl p-8 m-4 ">
          <div class="block w-full text-center text-gray-800 text-3xl font-bold mb-3">
            <h1>Booking Information</h1>
            <p class="text-sm font-light">please fill out the form</p>
          </div>
          <div class="flex flex-col mb-4">
            <h1 class="mb-2 font-bold text-lg text-gray-900">Booking Name</h1>
            <input class="border py-2 px-3 text-grey-800 rounded-lg" required v-model="newEvent.newBookingName"
              type="name" placeholder="Somchai Jairuk (ss-5)" />
          </div>
          <div class="flex flex-col mb-4">
            <label class="mb-2 font-bold text-lg text-gray-900">Email</label>
            <input class="border py-2 px-3 text-grey-800 rounded-lg" required v-model="newEvent.newBookingEmail"
              type="email" placeholder="Somchai.jairuk@gmail.com" />
          </div>
          <div class="grid grid-cols-2 mb-2 gap-x-2">
            <h1 class="font-bold text-lg text-gray-900">Category</h1>
            <!-- <h1 class="font-bold text-lg text-gray-900">Duration</h1> -->
          </div>
          <div class="grid grid-cols-1 mb-4 gap-x-2">
            <select v-model="newEvent.categorySelection" class="border py-2 px-3 text-grey-800 rounded-lg">
              <option value disabled>Please select one</option>
              <option v-for="(eventCat, index) in eventCategory" :key="index" :value="{
                eventCategoryId: eventCat.id, eventDuration: eventCat.eventDuration, eventCategoryName: eventCat.eventCategoryName
              }">
                {{ eventCat.id }} -- {{ eventCat.eventCategoryName }} ({{ eventCat.eventDuration }} minutes)
              </option>
            </select>



            <!-- <input class="border py-2 px-3 text-grey-800 rounded-lg" v-model="newEvent.newStartTime"
              type="datetime-local" /> -->
          </div>
          <div class="grid grid-cols-2 mb-2">
            <h1 class="font-bold text-lg text-gray-900">Date</h1>
            <!-- <h1 class="font-bold text-lg text-gray-900">Start Time</h1> -->
          </div>
          <div class="grid mb-4 ">
            <input class="border py-2 px-3 text-grey-800 rounded-lg" v-model="newEvent.newStartTime"
              type="datetime-local" />
            <!-- <input class="border py-2 px-3 text-grey-800 rounded-lg" v-model="newStartTime" type="time" /> -->
          </div>
          <div class="flex flex-col mb-4">
            <label class="mb-2 font-bold text-lg text-gray-900">Notes</label>
            <textarea class="border py-2 px-3 text-grey-800 rounded-lg" placeholder="maximum at 500 characters"
              v-model="newEvent.newNotes"></textarea>
          </div>
          <div class="flex justify-end">
            <button class="text-red-400 
                        hover:text-white border
                        border-red-700 hover:bg-red-800
                        focus:ring-4 focus:outline-none
                        transition duration-500 ease-in-out
                        focus:ring-red-300 font-light
                        rounded text-xl px-6 py-.5 mt-1.5 
                        text-center  mr-4 dark:border-red-500
                        dark:text-red-500 dark:hover:text-white
                        dark:hover:bg-red-600 dark:focus:ring-red-800" @click="$emit('closeToggle')">
              <!-- @click="$emit('closeToggle') -->
              CLOSE
            </button>
            <button @click="$emit('addEventComp',
              newEvent.newBookingName, newEvent.newBookingEmail, newEvent.newStartTime,
              newEvent.newNotes, newEvent.categorySelection
            )" class="inline-block px-6 py-2.5 mt-1.5 bg-blue-400
                        text-white font-bold text-xl leading-tight
                        uppercase rounded shadow-sm hover:bg-blue-500 
                        hover:shadow-lg focus:bg-blue-500 focus:shadow-lg
                        focus:outline-none focus:ring-0 active:bg-blue-600
                        active:shadow-lg transition duration-150 ease-in-out">
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>
 
<style>
</style>