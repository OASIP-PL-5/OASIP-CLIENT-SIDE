<script setup>
// import { ref, onBeforeMount } from 'vue'
// import EventList from '../components/EventList.vue';
// const eventList = ref([])
// // GET
// const getEvent = async () => {
//     const res = await fetch(`${import.meta.env.VITE_BASE_URL}/event`)
//     eventList.value = await res.json()
// }
// onBeforeMount(async () => {
//     await getEvent()
// })
</script>
 
<template>
    <div>
        <!-- <h2 class="font-bold text-5xl mx-10 my-10">LIST-ALL</h2>
        <EventList :event="eventList" /> -->
    </div>
</template>
 
<style>
</style>






<!-- <script setup>
import { ref, onBeforeMount } from 'vue'
import EventList from '../components/EventList.vue';

const eventURL = 'http://localhost:8080/api/event';
// const eventList = ref([])

// // const getEvent = async () => {
// //     const res = await fetch(eventURL)
// //     eventList.value = await res.json()
// // }

// const getEvent = async () => {
//     // const res = await fetch('http://localhost:5000/notes')
//     const res = await fetch(`${import.meta.env.VITE_BASE_URL}/event`)
//     eventList.value = await res.json()
// }


// onBeforeMount(async () => {
//     await getEvent()
// })

</script>
 
<template>
    <div>
        <h2 class="font-bold text-5xl mx-10 my-10">LIST-ALL</h2>
        <hr>
        <div>
             <p>Date Object: {{ new Date() }}</p>
            <p>toISOString(): {{ new Date().toISOString() }}</p>
            <p>toLocaleString(): {{ new Date().toLocaleString() }}</p>
            <p>getTime():{{ new Date().getTime() }}</p>
            <p>getFullYear():{{ new Date().getFullYear() }}</p>
            <p>getMonth(): {{ new Date().getMonth() }}</p>
            <p>getDate(): {{ new Date().getDate() }}</p>
            <p>getHours():{{ new Date().getHours() }}</p>
            <p>getMinutes():{{ new Date().getMinutes() }}</p> -->
            <!-- <img src="../assets/xd.png" alt="fake"> -->
        <!-- </div> -->

        <!-- <EventList :eventList="eventList" /> -->
        <!-- <EventList :eventProp="eventList" /> -->

    <!-- </div> -->
<!-- </template> -->
 
<!-- <style>
</style> -->
<!-- <script setup>
import { ref, onBeforeMount } from 'vue'

const eventCategoryInfo = ref([])

const eventCategoryURL = 'http://localhost:8080/api/event-category';
const eventURL = 'http://localhost:8080/api/event';

const getEventCategory = async () => {
    const res = await fetch(eventCategoryURL)
    eventCategoryInfo.value = await res.json()
}


onBeforeMount(async () => {
    await getEventCategory()
})

</script>
 
<template>
    <div>
        {{ eventCategoryInfo }}
    </div>
</template>
 
<style>
</style> --> 