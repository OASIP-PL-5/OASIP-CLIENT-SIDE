<script setup>
import { ref, onBeforeMount } from 'vue'
console.clear()

defineProps({
    eventList: {
        type: Array,
        require: true
    }
})

const eventList = ref([])

// GET
const baseUrl = import.meta.env.PROD ? `${import.meta.env.VITE_BASE_URL}/api` : '/api'
// const checkURL = `${import.meta.env.PROD}`
// console.log(checkURL);
const getEvent = async () => {
    console.log(`${baseUrl}/event`)
    // ลดรูปเหลือเป็น const res = await fetch(`api/event`) ได้
    // ซึ่งก็ไม่จำเป็นต้องใช้ baseUrl
    const res = await fetch(`${baseUrl}/event`)
    eventList.value = await res.json()
    console.log('data from api: ', eventList.value)
}
onBeforeMount(async () => {
    await getEvent()
})
</script>

<template>
    <div>
        <ul>
            <li v-for="(event, index) in eventList" :key="index">
                {{ event.eventCategory1 }} - {{ event.id }} - {{ event.bookingName }} -
                {{ event.bookingEmail }} - {{ event.eventStartTime }}
                <hr />
            </li>
        </ul>
    </div>
</template>
