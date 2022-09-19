<script setup>
import SignInUserVue from '../components/SignInUser.vue';
import { ref, onBeforeMount, computed } from 'vue'
import VueCookies from 'vue-cookies'

const goToSignUp = () => myRouter.push({ name: 'SignUp' })


const tokens = ref([]);
const baseUrl = import.meta.env.PROD
    ? `${import.meta.env.VITE_BASE_URL}/api`
    : '/api'

const wrongPassword = ref(false);
const notFound = ref(false)

// const matchUser = async (newEmail, newPassword) => {
//     console.log(`${baseUrl}/match`)
//     const res = await fetch(`${baseUrl}/match`, {
//         method: 'POST',
//         headers: { 'content-type': 'application/json' },
//         body: JSON.stringify({
//             // มีผลต่อ payload ต้องใส่
//             email: newEmail,
//             password: newPassword
//         })
//     })
//     if (res.status === 200) {
//         // const matched = await res.json()
//         alert('Login Success')
//     }
//     else if (res.status === 401) {
//         wrongPassword.value = true;
//         alert('Wrong Password')
//     }
//     else{
//         notFound.value = true;
//         alert('Not Found')
//     }
// }
const matchUser = async (newEmail, newPassword) => {
    console.log(`${baseUrl}/login`)
    const res = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            // มีผลต่อ payload ต้องใส่
            email: newEmail,
            password: newPassword
        })
    })
    if (res.status === 200) {
        tokens.value = await res.json();
        console.log(tokens.value);
        console.log(tokens.value.jwtToken);
        // this.$cookies.set(tokens,tokens.value.jwtToken)
        VueCookies.set('jwtToken', tokens.value.jwtToken)
        alert('Login Success')
    }
    // else if (res.status === 401) {
    //     wrongPassword.value = true;
    //     alert('Wrong Password')
    // }
    else{
        notFound.value = true;
        alert('Not Found')
    }
}
</script>
 
<template>
    <div>
        <SignInUserVue @matchUser="matchUser" />
    </div>
</template>
 
<style>
</style>