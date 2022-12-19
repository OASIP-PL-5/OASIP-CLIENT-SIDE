<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'
const myRouter = useRouter()
const goToSignIn = () => myRouter.push({ name: 'SignIn' })
// const goToReset = () => myRouter.push({ name: 'ResetPassword' })
const route = useRoute()
let url = route.query

// console.log("url")
// console.log(url.token)//pattern https://url.com?token=บลาๆ
// const getToken = url.token
// console.log(getToken)

const token = localStorage.getItem("jwtToken");
// const mail = computed(() => {
//     email = ''
// })

const baseUrl = import.meta.env.PROD
    ? `${import.meta.env.VITE_BASE_URL}/api`
    : "/api";

// const email = ref('')


// const inputEmail = computed(() => {
//     email: ''
// })

const loading = ref(false)
const emailNotFound = ref(false)
const sent = ref(false)

const inputEmail = ref('')

const sentMail = async (email) => {
    console.clear()

    loading.value = true
    emailNotFound.value = false
    sent.value = false


    console.log("inputEmail:", inputEmail.value)
    console.log("email param:", email);
    const res = await fetch(`${baseUrl}/users/mailForgot`, {
        method: "POST",
        headers: {
            'content-type': 'application/json',
            // ไม่ต้องใส่ Auth header เพราะ back permitAll
            // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            // email:inputEmail.email
            email: inputEmail.value
        })
    })
    loading.value = true
    console.log(inputEmail.value);
    if (res.status === 200) {
        alert("Sent email complete")
        inputEmail.value = ''
        loading.value = false
        sent.value = true

    } else if (res.status === 404) {
        alert("Email not found")
        loading.value = false
        emailNotFound.value = true
    }

    console.log(inputEmail.value);


}
</script>
 
<template>
    <div v-if="loading == true">
        <div class="relative w-full rounded">
            <div style="width: 100%" class="absolute top-0 h-4 rounded shim-red"></div>
        </div>
    </div>
    <form v-on:submit.prevent>
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
                                <input v-model="inputEmail"
                                    class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="email" type="email" placeholder="Enter Email Address..." />
                                <h2 v-if="emailNotFound == true" class="text-red-500 text-sm italic">We can't find this
                                    email in our website.</h2>
                                <h2 v-if="sent == true" class="text-green-500 text-sm font-bold italic">We've already
                                    sent the email.</h2>

                            </div>
                            <div class="mb-6 text-center">
                                <button @click="sentMail(inputEmail)"
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
    </form>


</template>
 
<style scoped>
.shim-red {
    position: relative;
    overflow: hidden;
    background-color: rgba(63, 140, 241, 0.7);
}

.shim-red::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(90deg,
            rgba(233, 233, 233, 1) 0,
            rgba(233, 233, 233, 0.9) 50%,
            rgba(233, 233, 233, 0.8) 100%);
    animation: shimmer 3s ease-out infinite;
    content: "";
}

@keyframes shimmer {
    100% {
        transform: translateX(0%);
        opacity: 0;
    }
}
</style>