<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import jwt_decode from "jwt-decode";


console.clear()
const myRouter = useRouter();

const goToSignIn = () => myRouter.push({ name: 'SignIn' })
const goToHome = () => myRouter.push({ name: 'Home' })
const route = useRoute()
let url = route.query
console.log("url")
// console.log(url.token)
//pattern https://url.com?token=บลาๆ
console.log(url);
// check ว่า url ที่ได้่มาเป็น empty obj หรือไม่
// console.log(Object.keys(url).length === 0)
if (Object.keys(url).length > 0 && Object.keys(url) == 'token') {
    const getToken = url.token
    console.log(jwt_decode(getToken));
    const email = jwt_decode(getToken)
    console.log(email.sub);
} else {
    console.log("ไม่พบ token ใน url-path = reset-password ไม่ควรทำงานได้");
    alert("please input your email in ForgotPassword's page")
    myRouter.push('forgot-password')
}
// const password = computed(()=>{
//     newPassword =''
//     confirmPassword = ''
// })
const baseUrl = import.meta.env.PROD
    ? `${import.meta.env.VITE_BASE_URL}/api`
    : "/api";
const newPassword = ref('')
const confirmPassword = ref('')

const notMatched = ref(false)
const invalidPassword = ref(false)

const reset = async () => {
    console.clear()
    notMatched.value = false
    invalidPassword.value = false

    // console.log(password.newPassword)
    // console.log(password.confirmPassword)
    console.log("newPass", newPassword.value);
    console.log("ConPass", confirmPassword.value);
    if (newPassword.value.length >= 8 && newPassword.value.length <= 14) {
        console.log(newPassword.value);
        if (newPassword.value.localeCompare(confirmPassword.value) == 0) {
            const res = await fetch(`${baseUrl}/users/forgot`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${url.token}`
                },
                body: JSON.stringify({
                    password: newPassword.value
                })
            })
            if (res.status === 200) {
                alert("Change password complete")
                goToHome()
            }
            else if(res.status === 401){
                alert("Token expired")
                goToSignIn()
            }
        } else {
            alert("password and confirm password not match")
            notMatched.value = true
        }
    } else {
        alert("Password must have between 8-15 charecters")
        invalidPassword.value = true
    }
    
    console.log(`${url.token}`);
}
</script>
 
<template>
    <div class="container mx-auto ">
        <div class="flex justify-center px-6 my-12 ">
            <div class="w-full xl:w-3/4 lg:w-11/12 flex rounded-3xl shadow-2xl">
                <div class="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"><img
                        src="../assets/3293465.jpg" alt="forgot-pic"></div>
                <div class="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none ">
                    <div class="px-8 mb-4 text-center">
                        <h3 class="pt-4 mb-2 text-2xl text-blue-400 font-bold">Reset password</h3>

                    </div>
                    <form class="px-8 pt-3 pb-8 mb-4 bg-white rounded">
                        <div class="mb-4">
                            <label class="block mb-2 text-lg font-bold text-blue-400">
                                New password <span class="text-slate-400 font-thin">| minimum 8 maximum 14
                                    characters</span>
                            </label>
                            <input v-model="newPassword"
                                class="w-full px-3 py-2 text-lg leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                type="password" placeholder="Enter new password" minlength="8" maxlength="14" />
                            <label class="block mt-2 mb-2 text-lg font-bold text-blue-400">
                                Confirm password
                            </label>
                            <input v-model="confirmPassword"
                                class="w-full mb-2 px-3 py-2 text-lg leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                type="password" placeholder="Enter new password again" minlength="8" maxlength="14" />
                            <h2 v-if="invalidPassword == true" class="text-sm text-red-500 italic">Password must be at
                                least 8 characters and maximum 15 characters.</h2>
                            <h2 v-if="notMatched == true" class="text-sm text-red-500 italic">Password must be matched.
                            </h2>
                        </div>
                        <div class="mb-3 text-center">
                            <button @click="reset()"
                                class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                type="button">
                                Reset Password
                            </button>
                        </div>
                        <!-- <hr class="mb-6 border-t" />

                        <div class="text-center">
                            <a @click="goToSignIn"
                                class="cursor-pointer inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">
                                Already have an account? Login!
                            </a>
                        </div> -->
                    </form>
                </div>
            </div>
        </div>
    </div>

</template>
 
<style>

</style>