<script setup>
import { computed } from 'vue'
defineEmits(['editEvent'])
const props = defineProps({
    currentEvent: { type: Object, default: {} }
})

const newEvent = computed(() => {
    return {
        id: props.currentEvent.id,
        bookingName: props.currentEvent.bookingName,
        bookingEmail: props.currentEvent.bookingEmail,
        eventStartTime: props.currentEvent.eventStartTime,
        eventDuration: props.currentEvent.eventDuration,
        eventNotes: props.currentEvent.eventNotes,
        eventCategoryId: props.currentEvent.eventCategoryId,
        eventCategoryName: props.currentEvent.eventCategoryName
    }
})

</script>
 
<template>
    <div>
        <button 
            @click="$emit('editEvent', newEvent)">UPDATE EVENT</button>
    </div>
</template>
 
<style>
</style>