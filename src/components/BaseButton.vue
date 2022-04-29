<!-- <script setup>
import {ref,onBeforeMount} from 'vue'
const prop = defineProps({
    buttonName: {
        type: String,
        require: true
    }
})

// GET:: Btn_EventDetail
const eventBtn = ref([])
const baseUrl = import.meta.env.PROD ? `${import.meta.env.VITE_BASE_URL}/api` : '/api'
// const checkURL = `${import.meta.env.PROD}`
// console.log(checkURL);
const getEventBtn = async () => {
    console.log(`${baseUrl}/event`)
    // ลดรูปเหลือเป็น const res = await fetch(`api/event`) ได้
    // ซึ่งก็ไม่จำเป็นต้องใช้ baseUrl
    const res = await fetch(`${baseUrl}/event`)
    eventBtn.value = await res.json()
    console.log('data from api: ', eventBtn.value)
}
onBeforeMount(async () => {
    await getEventBtn()
})
</script>
 
<template>
    <button class="inline-block px-6 py-2.5 bg-blue-400 text-white 
                    font-medium text-xs leading-tight uppercase rounded 
                    shadow-sm hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500
                    focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600
                    active:shadow-lg transition duration-150 ease-in-out">
        <router-link :to="{ name: 'EventDetailBase', params: { bookingName: event.bookingName } }">
            {{ buttonName }}
        </router-link>
    </button>
</template>
 
<style>
</style> -->