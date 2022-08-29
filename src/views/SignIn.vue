<script setup>
import SignInUserVue from '../components/SignInUser.vue';
import { ref, onBeforeMount, computed } from 'vue'

const baseUrl = import.meta.env.PROD
    ? `${import.meta.env.VITE_BASE_URL}/api`
    : '/api'

const wrongPassword = ref(false);
const notFound = ref(false)

const matchUser = async (newEmail, newPassword) => {
    console.log(`${baseUrl}/match`)
    const res = await fetch(`${baseUrl}/match`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            // มีผลต่อ payload ต้องใส่
            email: newEmail,
            password: newPassword
        })
    })
    if (res.status === 200) {
        // const matched = await res.json()
        alert('Login Success')
    }
    else if (res.status === 401) {
        wrongPassword.value = true;
        alert('Wrong Password')
    }
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