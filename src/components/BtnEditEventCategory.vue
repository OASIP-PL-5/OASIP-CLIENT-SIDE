<script setup>
import { computed } from 'vue'
defineEmits(['editEventCategory'])
const props = defineProps({
    currentEvent: { type: Object, default: {} }
})

const newEventCate = computed(() => {
    return {
        id: props.currentEvent.id,
        eventCategoryName: props.currentEvent.eventCategoryName,
        eventCategoryDescription: props.currentEvent.eventCategoryDescription,
        eventDuration: props.currentEvent.eventDuration  
    }
})

</script>
 
<template>
    <div>
        <button @click="$emit('editEventCategory', newEventCate)">UPDATE CATEGORY</button>
    </div>
</template>
 
<style>
</style>