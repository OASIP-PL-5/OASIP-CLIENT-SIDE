<script setup>
import jwtDecode from 'jwt-decode'
import { computed, ref, onBeforeMount } from 'vue'
const token = localStorage.getItem('jwtToken')
defineEmits(['file', 'closeToggle', 'addEventComp', 'updateEventComp'])
const props = defineProps({
  currentEvent: {
    type: Object,
    default: {}
  }
})

const newEvent = computed(() => {
  return {
    id: props,
    bookingName: props,
    bookingEmail: props,
    eventCategoryName: props,
    eventDuration: props,
    eventNotes: props,
    eventStartTime: props,
    eventCategoryId: props
  }
})
console.log("test", newEvent.eventStartTime);
console.log("เมื่อกด toggle จะขึ้นใน console");
// const togxgleModal = ref(false)

// ตัวแปร ดึง email จาก storage เพื่อใส่ input: bookingEmail
const newBookingEmail = ref(localStorage.getItem("email"))
console.log("email >> ", newBookingEmail.value);

const isMsalLogin = localStorage.getItem(
  "msal.634fde75-c93d-4e46-9b36-5f66eff43805.idtoken"
)
  ? true
  : false;
const msalToken = localStorage.getItem("msal.634fde75-c93d-4e46-9b36-5f66eff43805.idtoken");


// GET เพื่อจะ map [id และ duration : จะทำให้สามารถ POST ได้]
const eventCategory = ref([])
const baseUrl = import.meta.env.PROD
  ? `${import.meta.env.VITE_BASE_URL}/api`
  : '/api'
const getEventCategory = async () => {
  console.log(`${baseUrl}/event-categories`)
  if (isMsalLogin) {
  newBookingEmail.value = jwtDecode(msalToken).preferred_username
}
  const res = await fetch(`${baseUrl}/event-categories`, {
    headers: {
      'content-type': 'application/json',

    }
  })
  eventCategory.value = await res.json()
  console.log('data from api: ' + eventCategory.value)
}
onBeforeMount(async () => {
  await getEventCategory()
})
const notShow = ref(false)
const test = ref()
const closeToggle = () => window.location.reload()

const current = new Date().toLocaleDateString()
console.log('current ', current);

// const hour = new Date().getHours().toLocaleString()
// const minute = new Date().getMinutes().toLocaleString().padStart(2, '0')
// console.log('currTime: ', hour + ":" + minute + ":00");

var currentDateTime = new Date();
console.log(currentDateTime.toJSON());
var dd = String(currentDateTime.getDate()).padStart(2, '0');
var mm = String(currentDateTime.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = currentDateTime.getFullYear();
var hr = String(currentDateTime.getHours())
var m = String(currentDateTime.getMinutes().toLocaleString().padStart(2, '0'))

currentDateTime = yyyy + '-' + mm + '-' + dd + 'T' + hr + ":" + m;
console.log('currentDateTime ', currentDateTime);

const showWarning = ref()

// สำหรับ จัดการ input: Email เทียบว่า login มีอีเมลอยู่หรือไม่
// แต่ logic function นี้ คือ "เริ่มด้วย ถ้า email == null จะ return true"
const isLoginNull = () => {
  if (localStorage.getItem('email') == null) {
    console.log("islogin = true ");
    return true
  } else {
    console.log("islogin = false ");
    return false
  }
}
// const isLogin = newBookingEmail.localeCompare(localStorage.getItem('email'))

// file management 

const tenMb = 10485760

const modelFile = ref(null)
const fileAction = (e) => {
  console.clear()
  const file = e.target.files[0]
  modelFile.value = file
  console.log("modelFile : ", modelFile.value);
  if (modelFile.value.size > tenMb) {
    console.log("The file size cannot be larger than 10 MB");
    alert("The file size cannot be larger than 10 MB")
    // fileEditModel.value = null
    // isTooLarge.value = true
    // เพื่อ reset file เมื่อขนาดเกินกำหนด
    e.target.value = ''
  }

}
</script>
 
<template>
  <div>
    <form v-on:submit.prevent>
      <div class="fixed z-40 inset-0 top-screen bg-black bg-opacity-25 ">
        <div class="flex justify-center items-center h-full w-full  ">
          <div class="md:w-6/12 bg-white rounded shadow-2xl p-8 m-4 ">
            <div class="block w-full text-center text-gray-800 text-3xl font-bold mb-3">
              <h1>Booking Information</h1>
              <p class="text-sm font-light">please fill out the form</p>
            </div>
            <div class="flex flex-col mb-4">
              <h1 class="mb-2 font-bold text-lg text-gray-900">Booking Name <span class="text-sm font-thin"> | maximum
                  100 characters</span></h1>
              <input class="border py-2 px-3 text-grey-800 rounded-lg" required v-model="newEvent.newBookingName"
                type="name" placeholder="Somchai Jairuk (ss-5)" maxlength="100" />
              <!-- pattern="[A-Za-z0-9]+" -->
            </div>


            <!-- input Email if has-login -->
            <div class="flex flex-col mb-4" v-if="isLoginNull() == false">
              <label class="mb-2 font-bold text-lg text-gray-900">Email<span class="text-sm font-thin"> | maximum 50
                  characters</span></label>
              <input class="border py-2 px-3 text-grey-800 rounded-lg border-gray-200" required
                v-model="newBookingEmail" type="email" placeholder="Somchai.jairuk@gmail.com" maxlength="50" readonly />
            </div>
            <!-- input Email if  -->
            <div class="flex flex-col mb-4" v-if="isMsalLogin">
              <label class="mb-2 font-bold text-lg text-gray-900">Email<span class="text-sm font-thin"> | maximum 50
                  characters</span></label>
              <input class="border py-2 px-3 text-grey-800 rounded-lg border-gray-200" required
                v-model="newBookingEmail" type="email" placeholder="Somchai.jairuk@gmail.com" maxlength="50" readonly />
            </div>
            <!-- input Email if not login-->
            <!-- <div class="flex flex-col mb-4" v-else-if="isLoginNull() == true">
              <label class="mb-2 font-bold text-lg text-gray-900 border-gray-200">Email<span class="text-sm font-thin">
                  | maximum 50
                  characters</span></label>
              <input class="border py-2 px-3 text-grey-800 rounded-lg border-gray-200" required
                v-model="newBookingEmail" type="email" placeholder="Somchai.jairuk@gmail.com" maxlength="50" />
            </div> -->
            <!-- EventCategory -->
            <div class="grid grid-cols-2 mb-2 gap-x-2">
              <h1 class="font-bold text-lg text-gray-900 ">Category</h1>
              <!-- <h1 class="font-bold text-lg text-gray-900">Duration</h1> -->
            </div>
            <div class="grid grid-cols-1 mb-4 gap-x-2">
              <select v-model="newEvent.categorySelection"
                class="border py-2 px-3 text-grey-800 rounded-lg border-gray-200" required>
                <option disabled>Please select one</option>
                <option v-for="(eventCat, index) in eventCategory" :key="index" :value="{
                  eventCategoryId: eventCat.id, eventDuration: eventCat.eventDuration, eventCategoryName: eventCat.eventCategoryName
                }">
                  {{ eventCat.eventCategoryName }} ({{ eventCat.eventDuration }} minutes)
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
              <input class="border py-2 px-3 text-grey-800 rounded-lg border-gray-200" v-model="newEvent.newStartTime"
                type="datetime-local" :min="currentDateTime">
              <!-- <input class="border py-2 px-3 text-grey-800 rounded-lg" v-model="newStartTime" type="time" /> -->
            </div>
            <!-- <span v-if="newStartTime != today">You're choosing past date</span> -->
            <div class="flex flex-col mb-4">
              <label class="mb-2 font-bold text-lg text-gray-900">Notes</label>
              <textarea class="border py-2 px-3 text-grey-800 rounded-lg border-gray-200"
                placeholder="maximum at 500 characters" maxlength="500" v-model="newEvent.newNotes"></textarea>
            </div>
            <div class="flex flex-col mb-4">
              <label class="mb-2 font-bold text-lg text-gray-900">File <span class="text-sm font-thin"> | Optional, Max
                  file size 10MB </span></label>
              <input class="block w-full text-sm
               text-gray-900 rounded-lg border
                cursor-pointer" type="file" @change="fileAction">
            </div>
            <div class="flex justify-end">
              <button class="text-gray-400 
                        hover:text-white border
                        border--700 hover:bg-gray-800
                        focus:ring-4 focus:outline-none
                        transition duration-500 ease-in-out
                        focus:ring-gray-300 font-light
                        rounded text-xl px-6 py-.5 mt-1.5 
                        text-center  mr-4 dark:border-gray-500
                        dark:text-gray-500 dark:hover:text-white
                        dark:hover:bg-gray-600 dark:focus:ring-gray-800" type="reset">RESET</button>
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
                newEvent.newBookingName, newBookingEmail, newEvent.newStartTime,
                newEvent.newNotes, newEvent.categorySelection, modelFile
              );" class="inline-block px-6 py-2.5 mt-1.5 bg-blue-400
                        text-white font-bold text-xl leading-tight
                        uppercase rounded shadow-sm hover:bg-blue-500 
                        hover:shadow-lg focus:bg-blue-500 focus:shadow-lg
                        focus:outline-none focus:ring-0 active:bg-blue-600
                        active:shadow-lg transition duration-150 ease-in-out" type="submit">
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>

  </div>

</template>
 
<style>

</style>