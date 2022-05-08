<script setup>

</script>
 
<template>
    <div>
        <h2 class="font-bold text-4xl mx-10 my-10 text-slate-700">
            CREATE-NEW-EVENT::
        </h2>
        <div class="flex justify-center items-center h-full w-full">
            <div class="w-1/2 bg-white rounded shadow-2xl p-8 m-4">
                <div class="block w-full text-center text-gray-800 text-3xl font-bold mb-3">
                    <h1>Booking Information</h1>
                    <p class="text-sm font-light">please fill out the form</p>
                </div>
                <div class="flex flex-col mb-4">
                    <h1 class="mb-2 font-bold text-lg text-gray-900">Booking Name</h1>
                    <input class="border py-2 px-3 text-grey-800 rounded-lg" type="text">
                </div>
                <div class="flex flex-col mb-4">
                    <label class="mb-2 font-bold text-lg text-gray-900">Email</label>
                    <input class="border py-2 px-3 text-grey-800 rounded-lg" type="email">
                </div>
                <div class="grid grid-cols-2 mb-2 gap-x-2  ">
                    <h1 class=" font-bold text-lg text-gray-900">Category</h1>
                    <h1 class=" font-bold text-lg text-gray-900">Duration</h1>
                </div>
                <div class="grid grid-cols-2 mb-4 gap-x-2 ">
                    <select class="border py-2 px-3 text-grey-800 rounded-lg">
                        <option disabled>Please select one</option>
                        <option>Client-side Clinic</option>
                        <option>Server-side Clinic</option>
                        <option>Project Management Clinic</option>
                        <option>Database Clinic</option>
                        <option>DevOps/Infra Clinic</option>
                    </select>
                    <input class="border py-2 px-3 text-grey-800 rounded-lg"
                        placeholder="[duration value is from category selection]" disabled>
                </div>
                <div class="grid grid-cols-2 mb-2  ">
                    <h1 class=" font-bold text-lg text-gray-900">Date</h1>
                    <h1 class=" font-bold text-lg text-gray-900">Start Time</h1>
                </div>
                <div class="grid grid-cols-2 mb-4 gap-x-2 ">
                    <input class="border py-2 px-3 text-grey-800 rounded-lg " type="date">
                    <input class="border py-2 px-3 text-grey-800 rounded-lg " type="time">
                </div>
                <div class="flex flex-col mb-4">
                    <label class="mb-2 font-bold text-lg text-gray-900">Notes</label>
                    <textarea class="border py-2 px-3 text-grey-800 rounded-lg"
                        placeholder="maximum at 500 characters"></textarea>
                </div>
                <div class="flex flex-cols-2">
                    <button class="inline-block px-6 py-2.5 mt-1.5 bg-blue-400 mx-auto
                text-white font-bold text-xl leading-tight uppercase rounded 
                shadow-sm hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 
                focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 
                active:shadow-lg transition duration-150 ease-in-out">SUMBIT
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
 
<style>
</style>