<script setup>
import { ref, onBeforeMount, computed } from 'vue'
import { useRouter } from 'vue-router'
const myRouter = useRouter()
const goToForgot = () => myRouter.push({ name: 'ForgotPassword' })
const goToHome = () => myRouter.push({ path: "/" });


const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const baseUrl = import.meta.env.PROD
    ? `${import.meta.env.VITE_BASE_URL}/api`
    : "/api";

const token = localStorage.getItem("jwtToken");

const oldPassIncorrect = ref(false)
const passMatch = ref(false)

const setPassword = async () => {
    console.clear()
    oldPassIncorrect.value = false
    passMatch.value = false
    if (newPassword.value.length >= 8 && newPassword.value.length <= 14) {
        if (newPassword.value.localeCompare(confirmPassword.value) == 0) {
            const res = await fetch(`${baseUrl}/users/change-password`, {
                method: "PUT",
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    password: oldPassword.value,
                    newPassword: newPassword.value
                })
            })
            if (res.status === 200) {
                alert("Your password has been changed.")
                localStorage.clear()
                goToHome()
                
            }
            else if (res.status === 401) {
                alert("Password incorrect")
                oldPassIncorrect.value = true
            }
        } else {
            alert("New password and confirm password must be matched")
            passMatch.value = true
        }
    }

    console.log("oldPass", oldPassword.value);
    console.log("newPass", newPassword.value);
    console.log("conPass", confirmPassword.value);



}


</script>
 
<template>
    <div class="container mx-auto ">
        <div class="flex justify-center px-6 my-12 ">
            <div class="w-full xl:w-3/4 lg:w-11/12 flex rounded-3xl shadow-2xl">
                <div class="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"><img
                        src="../assets/6374585.jpg" alt="forgot-pic"></div>
                <div class="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none ">
                    <div class="px-8 mb-2 text-center">
                        <h3 class="pt-4 mb-1 text-2xl text-blue-400 font-bold">Change password</h3>
                        <p class="font-thin text-slate-800 text-2sm">Make sure your new password is secure enough.</p>

                    </div>
                    <form class="px-8 pt-3 pb-8 mb-4 bg-white rounded">
                        <div class="mb-4">
                            <label class="block mb-2 text-lg font-bold text-blue-400">
                                Old password
                            </label>
                            <input v-model="oldPassword"
                                class="mb-2 w-full px-3 py-2 text-lg leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                type="password" placeholder="Enter your password" minlength="8" maxlength="14"/>
                                <h2 v-if="oldPassIncorrect == true" class="text-red-400 text-sm italic"> Incorrect password.Please try again.</h2>
                            <div class="flex justify-end text-lg mb-2">
                                <a @click="goToForgot" class="font-semibold text-slate-400 
                                     hover:underline hover:scale-105 
                                     transition-transform cursor-pointer">Forgot password?</a>
                            </div>

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
                                <h2 v-if="passMatch == true" class="text-red-400 text-sm italic">Ensure that password is matched.</h2>
                        </div>
                        <div class="mb-3 text-center">
                            <button @click="setPassword()"
                                class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                type="button">
                                Set Password
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