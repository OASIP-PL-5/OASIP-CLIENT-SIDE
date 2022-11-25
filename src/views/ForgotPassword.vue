<script setup>
import { useRoute, useRouter } from 'vue-router'
const myRouter = useRouter()
const goToSignIn = () => myRouter.push({ name: 'SignIn' })
const goToReset = () => myRouter.push({ name: 'ResetPassword' })

</script>
 
<template>
    <div class="container mx-auto ">
        <div class="flex justify-center px-6 my-12 ">
            <div class="w-full xl:w-3/4 lg:w-11/12 flex rounded-3xl shadow-2xl">
                <div class="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"><img
                        src="../assets/3293465.jpg" alt="forgot-pic"></div>
                <div class="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none ">
                    <div class="px-8 mb-4 text-center">
                        <h3 class="pt-4 mb-2 text-2xl text-blue-400 font-bold">Forgot Your Password?</h3>
                        <p class="mb-2 text-sm text-gray-700">
                            Enter your email here and we will send you a link for you to reset your password.
                        </p>
                    </div>
                    <form class="px-8 pt-3 pb-8 mb-4 bg-white rounded">
                        <div class="mb-4">
                            <label class="block mb-2 text-xl font-bold text-blue-400" for="email">
                                Email Address
                            </label>
                            <input
                                class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="email" type="email" placeholder="Enter Email Address..." />
                        </div>
                        <div class="mb-6 text-center">
                            <button @click="goToReset"
                                class="w-full px-4 py-2 font-bold text-white bg-blue-400 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                type="button">
                                Send Email
                            </button>
                        </div>
                        <hr class="mb-6 border-t" />

                        <div class="text-center">
                            <a @click="goToSignIn"
                                class="cursor-pointer inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">
                                Already have an account? Login!
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</template>
 
<style>

</style>