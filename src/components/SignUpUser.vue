<script setup>
import { ref, onBeforeMount, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CreateUser from '../components/CreateUser.vue'
const myRouter = useRouter()
const goToUserDetail = () => myRouter.push({ name: 'UserDetail' })
const goToAllUser = () => myRouter.push({ name: 'AllUser' })
const goToSignIn = () => myRouter.push({ name: 'SignIn' })

defineEmits(['addUser'])
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
            <div class="min-w-screen min-h-screen flex items-center justify-center px-5 py-5">
                <div class="text-gray-500 rounded-3xl shadow-2xl w-full overflow-hidden" style="max-width:1000px">
                    <div class="md:flex w-full">
                        <div class="hidden md:block bg-blue-300 py-10 px-2 rounded-xl">
                            <img src="../assets/login-vector.png" alt="signup" class="flip-horizontal my-14">
                        </div>
                        <div class="w-full md:w-1/2 py-10 px-5 md:px-10">
                            <div class="text-center mb-5">
                                <h1 class="font-bold text-6xl text-blue-400">Sign Up</h1>
                                <p class="font-thin mt-3">Please fill out details to create an account.</p>
                            </div>
                            <div>
                                <div class="flex -mx-3">
                                    <div class="w-full px-3 mb-5">
                                        <label class="text-xl font-semibold text-blue-400">Username</label>
                                        <div class="flex">
                                            <div
                                                class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                <svg width="24" height="24" viewBox="0 0 256 256">
                                                    <path fill="currentColor"
                                                        d="M235.4 210a124.2 124.2 0 0 0-61.8-53.2a76 76 0 1 0-91.2 0A124.2 124.2 0 0 0 20.6 210a12 12 0 0 0 20.8 12a100 100 0 0 1 173.2 0a12.1 12.1 0 0 0 10.4 6a11.7 11.7 0 0 0 6-1.6a12 12 0 0 0 4.4-16.4ZM76 96a52 52 0 1 1 52 52a52 52 0 0 1-52-52Z" />
                                                </svg>
                                            </div>
                                            <input required v-model.trim="newUser.newName" type="name"
                                                :placeholder="'Somchai Jairuk (ss-5)'" maxlength="100"
                                                class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500">
                                        </div>
                                    </div>

                                </div>
                                <div class="flex -mx-3">
                                    <div class="w-full px-3 mb-5">
                                        <label class="text-xl font-semibold text-blue-400">Email address</label>
                                        <div class="flex">
                                            <div
                                                class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24">
                                                    <path fill="currentColor"
                                                        d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5l-8-5h16zm0 12H4V8l8 5l8-5v10z" />
                                                </svg>
                                            </div>
                                            <input required v-model.trim="newUser.newEmail" type="email"
                                                placeholder="Somchai.jairuk@gmail.com" maxlength="50"
                                                class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500">
                                        </div>
                                    </div>
                                </div>
                                <div class="flex -mx-3">
                                    <div class="w-full px-3 mb-5">
                                        <label for="" class="text-xl font-semibold text-blue-400">Password</label>
                                        <div class="flex">
                                            <div
                                                class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24">
                                                    <path fill="currentColor"
                                                        d="M18 8h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2V7a6 6 0 1 1 12 0v1zM5 10v10h14V10H5zm6 4h2v2h-2v-2zm-4 0h2v2H7v-2zm8 0h2v2h-2v-2zm1-6V7a4 4 0 1 0-8 0v1h8z" />
                                                </svg>
                                            </div>
                                            <input placeholder="••••••••••••••" required v-model="newUser.newPassword"
                                                type="password" minlength="8" maxlength="14"
                                                class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500">
                                        </div>
                                    </div>
                                </div>
                                <div class="flex -mx-3">
                                    <div class="w-full px-3 mb-5">
                                        <label for="" class="text-xl font-semibold text-blue-400">Confirm
                                            Password</label>
                                        <div class="flex">
                                            <div
                                                class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24">
                                                    <path fill="currentColor"
                                                        d="M18 8h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2V7a6 6 0 1 1 12 0v1zM5 10v10h14V10H5zm6 4h2v2h-2v-2zm-4 0h2v2H7v-2zm8 0h2v2h-2v-2zm1-6V7a4 4 0 1 0-8 0v1h8z" />
                                                </svg>
                                            </div>
                                            <input placeholder="••••••••••••••" required v-model="newUser.confirm"
                                                type="password" minlength="8" maxlength="18"
                                                class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500">
                                        </div>
                                    </div>
                                </div>
                                <div class="grid grid-cols-1 mb-5">
                                    <label class="text-xl font-semibold text-blue-400">Role</label>
                                    <select v-model="newUser.newRole" class="border py-2 px-3 text-grey-800 rounded-lg"
                                        required>
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
                                <div class="flex flex-row-reverse gap-x-4">
                                    <div>
                                        <button @click="$emit('addUser',
                                            newUser.newName, newUser.newEmail, newUser.newPassword, newUser.confirm, newUser.newRole
                                        );" class="inline-block px-4 py-2.5 bg-blue-400
                        text-white font-bold text-2xl leading-tight
                        uppercase rounded-lg shadow-sm hover:bg-blue-500 
                        hover:shadow-lg focus:bg-blue-500 focus:shadow-lg
                        focus:outline-none focus:ring-0 active:bg-blue-600
                        active:shadow-lg transition duration-150 ease-in-out" type="submit">
                                            SIGN UP NOW</button>
                                    </div>
                                    <div>
                                        <button class="text-gray-400 
                        hover:text-white border
                        border--700 hover:bg-gray-800
                        focus:ring-4 focus:outline-none
                        transition duration-500 ease-in-out
                        focus:ring-gray-300 font-light
                        rounded text-xl px-4 py-2.5 
                        text-center dark:border-gray-500
                        dark:text-gray-500 dark:hover:text-white
                        dark:hover:bg-gray-600 dark:focus:ring-gray-800" type="reset">
                                            RESET</button>
                                    </div>


                                </div>
                                <div class="flex justify-center mt-2 text-xl">Already have an account?&nbsp;
                                    <button 
                                    @click="goToSignIn"
                                     class="font-bold text-blue-400 
                                     hover:underline hover:scale-110 
                                     transition-transform" >Sign in</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>

</template>
 
<style>
.flip-horizontal {
    transform: scaleX(-1);
}
</style>