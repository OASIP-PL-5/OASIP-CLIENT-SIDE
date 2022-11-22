<script setup>
import { ref, onBeforeMount, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import aad from "../services/aad.js"
const myRouter = useRouter()
const goToSignUp = () => myRouter.push({ name: 'SignUp' })
const goToHome = () => myRouter.push({ name: 'Home' })

defineEmits(['matchUser'])
const props = defineProps({
    currentEvent: {
        type: Object,
        default: {}
    }
})
const matching = computed(() => {
    return {
        // เราต้องกำหนด .ชื่อประจำ object เนื่องจาก ไม่งั้น model [Object] จะไปแทนที่ placeholder แทน
        email: props.email,
        password: props.password
    }
})


const test = () => {
    alert('hello')
}

const aadLogin = () => {
    aad.login().then((account) => {
        // account.userName
        myRouter.push({ path: '/' })

    })
}

</script>
 
<template>

    <div class=" -my-10">
        <form v-on:submit.prevent>
            <div class="min-w-screen min-h-screen flex items-center justify-center px-5 py-5">
                <div class="text-gray-500 rounded-3xl shadow-2xl w-full overflow-hidden" style="max-width:550px">
                    <div class="md:flex w-full">
                        <!-- <div class="hidden md:block bg-blue-300 py-10 px-2 rounded-xl">
                            <img src="../assets/login-vector.png" alt="signup" class="flip-horizontal my-14">
                        </div> -->
                        <div class="w-full py-10 px-5 md:px-10">
                            <div class="text-center mb-5">
                                <h1 class="font-bold text-6xl text-blue-400">Sign In</h1>
                                <p class="font-thin mt-3">Please enter your email address and password.</p>
                            </div>
                            <div>

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
                                            <input required v-model.trim="matching.newEmail" type="email"
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
                                            <input placeholder="••••••••••••••" required v-model="matching.newPassword"
                                                type="password" minlength="8" maxlength="18"
                                                class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500">
                                        </div>
                                    </div>
                                </div>

                                <div class="flex justify-center">
                                    <div>
                                        <button
                                            @click="test, $emit('matchUser', matching.newEmail, matching.newPassword)"
                                            class="inline-block px-8 py-2.5 bg-blue-400
                        text-white font-bold text-2xl leading-tight
                        uppercase rounded-lg shadow-sm hover:bg-blue-500 
                        hover:shadow-lg focus:bg-blue-500 focus:shadow-lg
                        focus:outline-none focus:ring-0 active:bg-blue-600
                        active:shadow-lg transition duration-150 ease-in-out" type="submit">
                                            Login</button>
                                    </div>

                                </div>
                                <div
                                    class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                                    <p class="text-center font-semibold mx-4 mb-0">OR</p>
                                </div>
                                <a @click="aadLogin" class="px-7 py-3 
                                leading-snug uppercase rounded border-2
                                hover:shadow-lg hover:text-blue-500 focus:shadow-lg focus:outline-none 
                                focus:ring-0 active:shadow-lg transition 
                                duration-150 ease-in-out w-full flex justify-center 
                                items-center mb-3 bg-slate-100 cursor-pointer	">
                                <img src="../assets/microsoft.png" alt="ms-logo" class="w-8 mr-2">

                                    <span class="text-slate-500 font-semibold text-xl">Continue with Microsoft</span>
                                </a>

                                <!-- <div class="flex justify-center mt-2 text-xl">New here?&nbsp;
                                    <button @click="goToSignUp" class="font-bold text-blue-400 
                                     hover:underline hover:scale-105 
                                     transition-transform">Create an account</button>
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>

    </div>
</template>
 
<style>

</style>