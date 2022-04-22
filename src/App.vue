<script setup>

</script>
 
<template>
  <div><div class="flex items-center justify-center h-screen background from-indigo-500 to-indigo-800">
    <div class="bg-white font-semibold text-center rounded-3xl border shadow-lg p-10 max-w-xs bg-opacity-80
        bg-clip-padding">
      <img class="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto"
        src="https://npgblog.dev/static/cf23526f451784ff137f161b8fe18d5a/vue-logo.png" />
      <h1 class="text-lg text-gray-700">OASIP | CLIENT-SIDE</h1>
      <h3 class="text-sm text-gray-500">PL-5 | AllForOne</h3>
      <p class="text-xl text-gray-600 mt-4">Group's project is in process...</p>
      <button class="bg-indigo-600 px-8 py-2 mt-8 rounded-3xl text-gray-100 font-semibold tracking-wide">GitHub</button>
    </div>
  </div>
    <router-link :to="{ name: 'Home' }"><span class="border bg-black text-white">go to home page</span></router-link>

    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
 
<style>
</style>