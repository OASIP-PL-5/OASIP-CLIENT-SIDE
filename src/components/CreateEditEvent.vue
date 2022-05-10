<script setup>
import { computed, ref } from 'vue'
defineEmits(['closeToggle','addEventComp', 'updateEventComp'])
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
    eventCategoryName: props.currentEvent.eventCategoryName,
    eventDuration: props.currentEvent.eventDuration,
    eventNotes: props.currentEvent.eventNotes,
    eventStartTime: props.currentEvent.eventStartTime
  }
})
// const toggleModal = ref(false)
</script>
 
<template>
  <div>
    <div  class="fixed z-40 inset-0 top-screen bg-black bg-opacity-25 ">
      <div class="flex justify-center items-center h-full w-full  ">
        <div class="md:w-6/12 bg-white rounded shadow-2xl p-8 m-4 ">
          <div class="block w-full text-center text-gray-800 text-3xl font-bold mb-3">
            <h1>Booking Information</h1>
            <p class="text-sm font-light">please fill out the form</p>
          </div>
          <div class="flex flex-col mb-4">
            <h1 class="mb-2 font-bold text-lg text-gray-900">Booking Name</h1>
            <input class="border py-2 px-3 text-grey-800 rounded-lg" v-model="newEvent.bookingName" type="name"
              placeholder="Somchai Jairuk (ss-5)" />
          </div>
          <div class="flex flex-col mb-4">
            <label class="mb-2 font-bold text-lg text-gray-900">Email</label>
            <input class="border py-2 px-3 text-grey-800 rounded-lg" v-model="newEvent.bookingEmail" type="email"
              placeholder="Somchai.jairuk@gmail.com" />
          </div>
          <div class="grid grid-cols-2 mb-2 gap-x-2">
            <h1 class="font-bold text-lg text-gray-900">Category</h1>
            <h1 class="font-bold text-lg text-gray-900">Duration</h1>
          </div>
          <div class="grid grid-cols-2 mb-4 gap-x-2">
            <select v-model="newEvent.eventCategoryName" class="border py-2 px-3 text-grey-800 rounded-lg">
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
            <!-- <h1 class="font-bold text-lg text-gray-900">Start Time</h1> -->
          </div>
          <div class="grid grid-cols-2 mb-4 gap-x-2">
            <input class="border py-2 px-3 text-grey-800 rounded-lg" v-model="newEvent.eventStartTime"
              type="datetime-local" />
            <!-- <input class="border py-2 px-3 text-grey-800 rounded-lg" v-model="newStartTime" type="time" /> -->
          </div>
          <div class="flex flex-col mb-4">
            <label class="mb-2 font-bold text-lg text-gray-900">Notes</label>
            <textarea class="border py-2 px-3 text-grey-800 rounded-lg" placeholder="maximum at 500 characters"
              v-model="newEvent.eventNotes"></textarea>
          </div>
          <div class="flex justify-end">
            <button class="text-red-400 
                        hover:text-white border
                        border-red-700 hover:bg-red-800
                        focus:ring-4 focus:outline-none
                        transition duration-500 ease-in-out
                        focus:ring-red-300 font-light
                        rounded text-xl px-6 py-.5 mt-1.5 
                        text-center  mr-4 mt-2 dark:border-red-500
                        dark:text-red-500 dark:hover:text-white
                        dark:hover:bg-red-600 dark:focus:ring-red-800" @click="$emit('closeToggle')">
              CLOSE
            </button>
            <button @click="$emit('addEventComp',
              newEvent.bookingName, newEvent.bookingEmail, newEvent.eventCategoryName,
              newEvent.eventStartTime, newEvent.eventNotes
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