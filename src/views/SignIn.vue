<script setup>
import SignInUserVue from '../components/SignInUser.vue';
import Home from './Home.vue';
import { ref, onBeforeMount, computed } from 'vue'
import { useRouter } from 'vue-router';

// import VueCookies from 'vue-cookies'

const myRouter = useRouter()
const goToSignUp = () => myRouter.push({ name: 'SignUp' })
const goToHome = () => myRouter.push({ name: 'Home' })
const goToAllEvent = () => myRouter.push({ name: 'AllEvent' })

const tokens = ref([]);
const baseUrl = import.meta.env.PROD
    ? `${import.meta.env.VITE_BASE_URL}/api`
    : '/api'

const wrongPassword = ref(false);
const notFound = ref(false)


const userEmail = ref()
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
        // VueCookies.set('jwtToken', tokens.value.jwtToken)
        localStorage.setItem('jwtToken', tokens.value.jwtToken)
        localStorage.setItem('refreshToken', tokens.value.refreshToken)
        localStorage.setItem('email',newEmail) //เพิ่ม1/10/22
        userEmail.value = newEmail
        console.log("userEmail: ",userEmail.value);
        alert('Login Successful')
        // goToHome()
        // window.location.reload()
        await myRouter.push({ path: '/' })
        myRouter.go(0)
    }
    // ตรงนี้ต้องทำเพิ่มอีก back ส่ง 401 กรณี password ผิด alert "Incorrect password" 
    // back ส่ง 404 กรณี email ไม่มีใน database alert "A user with the specified email DOES NOT exist"
    // else if (res.status === 401) {
    //     wrongPassword.value = true;
    //     alert('Incorrect password')
    // }
    // else{
    //     notFound.value = true;
    //     alert('A user with the specified email DOES NOT exist')
    // }
    else if (res.status === 401) {
        wrongPassword.value = true;
        alert('Password Incorrect')
    }
    else{
        notFound.value = true;
        alert('A user with the specified email DOES NOT exist')
    }


    // else {
    //     notFound.value = true;
    //     alert('Not Found')
    // }
}
</script>
     
<template>
    <div>
        <SignInUserVue @matchUser="matchUser" />
    </div>
</template>
     
<style>

</style>