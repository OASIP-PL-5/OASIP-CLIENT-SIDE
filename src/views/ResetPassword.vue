<script setup>
import { computed,ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
let url = route.query
console.log("url")
console.log(url.token)//pattern https://url.com?token=บลาๆ
const getToken = url.token
console.log(getToken)

// const password = computed(()=>{
//     newPassword =''
//     confirmPassword = ''
// })

const newPassword = ref('')
const confirmPassword = ref('')

const reset = async (password)=>{
    // console.log(password.newPassword)
    // console.log(password.confirmPassword)
    console.log(newPassword.value);
    console.log(confirmPassword.value);
    if(newPassword.value.length>=8 && newPassword.value.length<=15){
        if(password.newPassword.localeCompare(password.confirmPassword) == 0){
            const res = await fetch(`${baseUrl}/users/forgot`,{
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${url.token}`
                },
                body:JSON.stringify({
                    password: newPassword.value
                })
            })
            if(res.status===200){
                alert("Change password complete")
            }
        }else{
            alert("password and confirm password not match")
        }
    }else{
        alert("Password must have between 8-15 charecters")
    }
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
                                type="password" placeholder="Enter new password" />
                            <label class="block mt-2 mb-2 text-lg font-bold text-blue-400">
                                Confirm password
                            </label>
                            <input v-model="confirmPassword"
                                class="w-full mb-2 px-3 py-2 text-lg leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                type="password" placeholder="Enter new password again" />
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