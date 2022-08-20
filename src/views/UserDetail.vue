<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
// const myRouter = useRouter()
const { params } = useRoute();
// const id = params.id;

const baseUrl = import.meta.env.PROD
    ? `${import.meta.env.VITE_BASE_URL}/api`
    : '/api'
const thisUser = ref([]);
//GET
const getThisUser = async () => {
    const id = params.id;
    const res = await fetch(`${baseUrl}/users/${id}`)
    if (res.status === 200) {
        thisUser.value = await res.json();
        console.log(thisUser.value);
        console.log(res);
    } else console.log("error cannot get this user detail")

};
onBeforeMount(async () => {
    await getThisUser();
})
</script>
 
<template>
    <!-- this is user detail -->

    <div v-for="user, index in thisUser" :key="index">
        <h1> {{ user.name }}</h1>
        {{ user.email }} <br>
        {{ user.role }} <br>
        {{ user.createdOn }} <br>
        {{ user.updatedOn }}
    </div>
</template>
 
<style>
</style>