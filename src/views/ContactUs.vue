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
        avatar: "https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?fit=clamp&w=400&h=400&q=80",
        contactLink: 'https://github.com/willvaritchai'
    }
]

</script>
 
<template>
    <!-- แสดงหน้า Contact Us ของสมาชิกทีม ซึ่งเมื่อ click ที่ภาพก็จะสามารถ link ไปหา github ของ member ได้ -->
    <div class="flex items-center justify-center min-h-screen bg-white py-30">
        <div class="flex flex-col">
            <div class="flex flex-col mt-2">
                <div class="container max-w-8xl px-48">
                    <div class="flex justify-center text-center mb-20">
                        <div class="w-full lg:w-8/12 px-4">
                            <h1 class="text-gray-700 text-6xl font-bold mb-8">
                                PL-5 | AllForOne
                            </h1>
                            <p class="text-gray-700 text-lg font-light">
                                INT221 | INFORMATION TECHNOLOGY INTEGRATED PROJECT
                            </p>
                        </div>
                    </div>

                    <!-- Team Members -->
                    <div class="flex">
                        <!-- Member #1 -->
                        <div v-for="(member, propKey, index) in teamMembers" :key="member.name"
                            class="md:w-7/14 lg:w-4/12 mb-6 px-6 sm:px-6 lg:px-8">
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