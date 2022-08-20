<script setup>
import { ref, onBeforeMount, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const myRouter = useRouter()
const goToUserDetail = () => myRouter.push({ name: 'UserDetail' })


const users = ref([]);

const baseUrl = import.meta.env.PROD
    ? `${import.meta.env.VITE_BASE_URL}/api`
    : '/api'

//GET
const getUser = async () => {
    const resUser = await fetch(`${baseUrl}/users`);
    if (resUser.status === 200) {
        users.value = await resUser.json();
        console.log(users.value);
        console.log(resUser);
    } else console.log("error cannot get users");
};
onBeforeMount(async () => {
    await getUser();
})
</script>
 
<template>
    <div class="overflow-x-auto">
        <div class="min-w-screen min-h-screen flex items-center justify-center font-sans overflow-hidden">
            <div class="w-full lg:w-5/6">
                <div class="bg-white shadow-md rounded my-6">
                    <table class="min-w-max w-full table-auto">
                        <thead>
                            <tr class="bg-blue-400 text-white uppercase text-sm leading-normal">
                                <th class="py-3 px-6 text-left">NAME</th>
                                <th class="py-3 px-6 text-left">EMAIL</th>
                                <th class="py-3 px-6 text-center">ROLE</th>
                                <th class="py-3 px-6 text-center">ACTION</th>
                            </tr>
                        </thead>

                        <tbody class="text-gray-600 text-sm font-light">
                            <tr v-for="user in users" class="border-b border-gray-200 hover:bg-gray-100">

                                <td class="py-3 px-6 text-left whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="mr-2">
                                            <!---user name here-->
                                            {{ user.name }}

                                        </div>

                                    </div>
                                </td>
                                <td class="py-3 px-6 text-left">
                                    <div class="flex items-center">
                                        <div class="mr-2">
                                            {{ user.email }}
                                        </div>
                                    </div>
                                </td>
                                <td class="py-3 px-6 text-center">
                                    <div class="flex items-center justify-center">
                                        {{ user.role }}
                                    </div>
                                </td>
                                <td class="py-3 px-6 text-center">

                                    <router-link :to="{
                                        name: 'UserDetail',
                                        params: { id: user.id }
                                    }">
                                        <span
                                            class="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">detail-
                                            icon</span>
                                    </router-link>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
 
<style>
</style>