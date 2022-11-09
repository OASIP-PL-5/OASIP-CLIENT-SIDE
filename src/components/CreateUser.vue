<script setup>
import { computed, ref, onBeforeMount } from 'vue'
defineEmits(['closeToggle', 'addUser'])
const props = defineProps({
  currentEvent: {
    type: Object,
    default: {}
  }
})
const newUser = computed(() => {
  return {
    // เราต้องกำหนด .ชื่อประจำ object เนื่องจาก ไม่งั้น model [Object] จะไปแทนที่ placeholder แทน
    name: props.name,
    email: props.email,
    password: props.password,
    confirm: props.confirm,
    role: props.role,
    // password: props.password,
    // confirm: props.confirm,
  }
})

</script>
 
<template>
  <div>
    <form v-on:submit.prevent>
      <div class="fixed z-40 inset-0 top-screen bg-black bg-opacity-25 ">
        <div class="flex justify-center items-center h-full w-full  ">
          <div class="md:w-4/12 bg-white rounded shadow-2xl p-8 m-4 ">
            <div class="block w-full text-center text-gray-800 text-3xl font-bold mb-3">
              <h1 class="text-blue-600">Sign Up Now</h1>
              <p class="text-sm font-light">please fill out the details and create account.</p>
            </div>
            <!-- div for input:: name -->
            <div class="flex flex-col mb-4">
              <h1 class="mb-2 font-bold text-lg text-gray-900">User name <span class="text-sm font-thin"> | maximum
                  100 characters</span></h1>
              <input class="border py-2 px-3 text-grey-800 rounded-lg" required v-model.trim="newUser.newName"
                type="name" :placeholder="'Somchai Jairuk (ss-5)'" maxlength="100" />
              <!-- pattern="[A-Za-z0-9]+" -->
            </div>

            <div class="flex flex-col mb-4">
              <label class="mb-2 font-bold text-lg text-gray-900">Email address<span class="text-sm font-thin"> |
                  maximum 50
                  characters</span></label>
              <input class="border py-2 px-3 text-grey-800 rounded-lg border-gray-200" required v-model.trim="newUser.newEmail" type="email"
                placeholder="Somchai.jairuk@gmail.com" maxlength="50" />
            </div>
            <!-- input password -->
            <div class="flex flex-col mb-4"> 
                <h1 class="mb-2 font-bold text-lg text-gray-900">Password <span class="text-sm font-thin"> | minimum 8 
                   maximum 14 characters</span></h1>
                   <input class="border py-2 px-3 text-grey-800 rounded-lg border-gray-200" placeholder="••••••••••••••"
                    required v-model="newUser.newPassword" type="password" minlength="8" maxlength="14">
            </div>
          <div class="flex flex-col mb-4"> 
                <h1 class="mb-2 font-bold text-lg text-gray-900">Confirm Password <span class="text-sm font-thin"> | type same password</span></h1>
                   <input class="border py-2 px-3 text-grey-800 rounded-lg border-gray-200" placeholder="••••••••••••••"
                   required v-model="newUser.confirm" type="password" minlength="8" maxlength="14">
            </div>


            <div class="grid grid-cols-2 mb-2 gap-x-2">
              <h1 class="font-bold text-lg text-gray-900">Role<span class="text-sm font-thin"> | select your role</span>
              </h1>
              <!-- <h1 class="font-bold text-lg text-gray-900">Duration</h1> -->
            </div>
            <div class="grid grid-cols-1 mb-4 gap-x-2">
              <select v-model="newUser.newRole" class="border py-2 px-3 text-grey-800 rounded-lg border-gray-200" required>
                <option selected="selected" disabled>Please select one</option>
                <option value="student">
                  Student
                </option>
                <option value="lecturer">
                  Lecturer
                </option>
                <option value="admin">
                  Admin
                </option>
              </select>
            </div>

            <!-- div:: button action of toggle -->
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

              <button @click="$emit('addUser',
                newUser.newName, newUser.newEmail , newUser.newPassword , newUser.confirm, newUser.newRole
              );" class="inline-block px-2 py-2.5 mt-1.5 bg-blue-400
                        text-white font-bold text-sm leading-tight
                        uppercase rounded shadow-sm hover:bg-blue-500 
                        hover:shadow-lg focus:bg-blue-500 focus:shadow-lg
                        focus:outline-none focus:ring-0 active:bg-blue-600
                        active:shadow-lg transition duration-150 ease-in-out" type="submit">
                CREATE AN ACCOUNT
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