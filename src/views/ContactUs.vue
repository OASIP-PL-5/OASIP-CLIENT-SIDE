<script setup>
// รายการสมาชิกในทีม
const teamMembers = [
    {
        name: '404',
        title: 'NOT FOUND',
        avatar: "https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?fit=clamp&w=400&h=400&q=80",
        contactLink: 'http://localhost:3000/notfound'
    },

    {
        name: 'Pattarapon Makhirun',
        title: '63130500091',
        avatar: "https://hooksandharmony.com/wp-content/uploads/2020/07/Rick-Astley-then.jpg",
        contactLink: 'https://github.com/Joe-sit'
    },
    {
        name: `Varitchai Surachaitanawat`,
        title: '63130500103',
        avatar: "https://www.techhub.in.th/wp-content/uploads/2021/05/DhYGYs6WkAAScEU.jpg",
        contactLink: 'https://github.com/willvaritchai'
    }
]

</script>
 
<template>
    <!-- แสดงหน้า Contact Us ของสมาชิกทีม ซึ่งเมื่อ click ที่ภาพก็จะสามารถ link ไปหา github ของ member ได้ -->
    <div class="grid items-center justify-center min-h-screen bg-white py-30">
        <div class="grid grid-col">
            <div class="grid grid-col mt-8">
                <div class="container max-w-8xl px-48">
                    <div class="grid justify-center text-center mb-20">
                        <div class="w-full lg:w-11/12 px-4">
                            <h1 class="text-gray-700 text-5xl font-bold mb-8">
                                PL-5 | AllForOne
                            </h1>
                            <p class="text-gray-700 text-lg font-light">
                                INT221 | INFORMATION TECHNOLOGY INTEGRATED PROJECT
                            </p>
                            <p class="font-thin text-tiny text-gray-700">Support Mobile Device 📱</p>
                        </div>
                    </div>

                    <!-- Team Members -->
                    <div class="md:grid grid-cols-3">
                        <!-- Member #1 -->
                        <div v-for="(member) in teamMembers" :key="member.name"
                            class="md:w-8/14 lg:w-11/12 mb-6 px-6 sm:px-6 lg:px-8">
                            <div class="flex flex-col">
                                <!-- Avatar -->
                                <a :href="member.contactLink" class="mx-auto hover:scale-110 transition-transform">
                                    <img class="rounded-2xl drop-shadow-md hover:drop-shadow-2xl" :src="member.avatar">
                                </a>

                                <!-- Details -->
                                <div class="text-center mt-6">
                                    <!-- Name -->
                                    <h1 class="text-gray-900 text-xl font-bold mb-1">
                                        {{ member.name }}
                                    </h1>

                                    <!-- Title -->
                                    <div class="text-gray-700 font-light mb-2">
                                        {{ member.title }}
                                    </div>

                                    <!-- {{ member.contactLink }} -->

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
 
<style>
</style>