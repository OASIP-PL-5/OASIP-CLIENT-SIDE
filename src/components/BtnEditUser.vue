<script setup>
import { computed } from 'vue'
defineEmits(['editUser'])
const props = defineProps({
    currentUser: { type: Object, default: {} }
})

const newUser = computed(() => {
    return {
        id: props.currentUser.id,
        name: props.currentUser.name,
        email: props.currentUser.email
    }
})

</script>
 
<template>
    <div>
        <button 
            @click="$emit('editUser', newUser)">UPDATE USER</button>
    </div>
</template>
 
<style>
</style>
