<script setup>

defineProps({
    event: { type: Array, require: true }
})
</script>
 
<template>
    <div>
        <!-- <ul>
            <li v-for="(events, index) in event" :key="index">
                {{ events.bookingId }}
            </li>
        </ul> -->
    </div>
</template>
 




<!-- <script setup>
import { ref, onBeforeMount } from 'vue'

defineProps({
    eventProp: {
        type: Array,
        require: true
    }
})


const eventList = ref([])


const getEvent = async () => {
    // const res = await fetch('http://localhost:5000/notes')
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/event`)
    if (res.status === 200) {
        eventList.value = await res.json()
    } else {
        console.log('what happen!?');
    }

}
onBeforeMount(async () => {
    await getEvent()
})

</script>
 
<template>
    <div>
        <ul>
            <li v-for="(events, index) in eventList" :key="index">
                {{ events }}
            </li>
        </ul>
        
    </div>
</template>
 
<style>
</style> -->