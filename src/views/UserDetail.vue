<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const myRouter = useRouter()
const goToAllUser = () => myRouter.push({ name: 'AllUser' })


// const myRouter = useRouter()
const { params } = useRoute();
// const id = params.id;

const baseUrl = import.meta.env.PROD
    ? `${import.meta.env.VITE_BASE_URL}/api`
    : '/api'
const thisUser = ref([]);
//GET
const getThisUser = async () => {
    const id = params.id;
    const res = await fetch(`${baseUrl}/users/${id}`)
    if (res.status === 200) {
        thisUser.value = await res.json();
        console.log(thisUser.value);
        console.log(res);
    } else console.log("error cannot get this user detail")

};
onBeforeMount(async () => {
    await getThisUser();
})


const isClickEdit = ref(false)
const onClickEdit = () => {
    isClickEdit.value = true
}
const cancelEdit = () => {
    isClickEdit.value = false
}
</script>
 
<template>
    <!-- this is user detail -->

    <div>
        <div>
            <div>
                <div>
                    <h2 class="font-bold text-4xl mx-10 my-10 text-slate-700">
                        USER-DETAIL-BASE::
                    </h2>
                    <div>
                        <div class="w-11/12 m-auto grid items-center justify-center bg-white text-gray-900">
                            <div class="mx-10 my-3 max-w-none rounded-lg overflow-hinden shadow-lg">
                                <div class="px-6 py-4 text-left">
                                    <div v-for="(user, index) in thisUser" :key="index"
                                        class="md:flex flex-col justify-center items-center">
                                        <div class="font-bold text-center text-5xl mb-2 text-gray-700 max-w-xl"
                                            v-if="isClickEdit == false">
                                            {{ user.name }}

                                        </div>
                                        <div class="font-bold text-center text-5xl mb-2 text-gray-200 max-w-xl"
                                            v-if="isClickEdit == true">
                                            {{ user.name }}

                                        </div>
                                        <div class="flex flex-col justify-center items-center">
                                            <div class="text-gray-500 text-xl mb-4" v-if="isClickEdit == false">
                                                {{ user.email }}
                                            </div>
                                            <div class="text-gray-200 text-xl mb-4" v-if="isClickEdit == true">
                                                {{ user.email }}
                                            </div>

                                            <div class="text-blue-400 hover:text-white border
                     border-blue-700 hover:bg-blue-800
                     focus:ring-4 focus:outline-none
                     transition duration-500 ease-in-out
                     focus:ring-blue-300 font-bold rounded-xl
                     text-3xl px-2 py-1 text-center mb-2 dark:border-blue-500
                     dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600
                     dark:focus:ring-blue-800" v-if="isClickEdit == false">
                                                {{ user.role }}
                                                <!-- <span v-show="isClickEdit" class="font-light text-lg">( {{ user.email }}
                                                    minutes)</span> -->
                                            </div>
                                            <div class="text-gray-400 hover:text-white border
                     border-gray-200 hover:bg-gray-200
                     focus:ring-4 focus:outline-none
                     transition duration-200 ease-in-out
                     focus:ring-gray-300 font-bold rounded-xl
                     text-3xl px-2 py-1 text-center mb-2 dark:border-gray-200
                     dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-200
                     dark:focus:ring-gray-200" v-if="isClickEdit == true">
                                                {{ user.role }}
                                                <!-- <span v-show="isClickEdit" class="font-light text-lg">( {{ user.email }}
                                                    minutes)</span> -->
                                            </div>
                                            <!-- เมื่อกดปุ่ม save จะซ่อน บรรทัด startTime-duration เดิมทั้งหมด... -->
                                            <div v-show="isClickEdit == false" class="text-gray-800 text-2xl mb-2">
                                                <div>createdOn:
                                                    {{
                                                            new Date(
                                                                user.createdOn
                                                            ).toLocaleDateString('en')
                                                    }}
                                                    {{
                                                            new Date(
                                                                user.createdOn
                                                            ).toLocaleTimeString('en', {
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })
                                                    }}</div>
                                                <div>updatedOn: {{
                                                        new Date(
                                                            user.updatedOn
                                                        ).toLocaleDateString('en')
                                                }}
                                                    {{
                                                            new Date(
                                                                user.updatedOn
                                                            ).toLocaleTimeString('en', {
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })
                                                    }}</div>



                                                <!-- <span class="font-light text-lg">({{ user.email }} minutes)</span> -->
                                            </div>
                                            <!-- แล้วจะแสดง div ตัวนี้แทน (modelStartTime) -->
                                            <!-- <div v-show="isClickEdit" class="text-gray-800 text-2xl mt-2 mb-3">
                      <div class="grid">
                        <input class="border py-2 px-3 text-grey-800 rounded-lg shadow-lg	" required
                          v-model="editStartTimeModel" type="datetime-local" :min="currentDateTime" />
                      </div>
                    </div> -->
                                            <!-- detail: event-notes || เมื่อ click edit จะ ซ่อน div ของ notes นี้แล้วจะกลายเป็น input-->
                                            <!-- <div class="w-full mb-3" v-show="isClickEdit == false">
                      <div class="border rounded-lg bg-gray-100 max-w-md mt-2 text-gray-600 px-3 py-3 text-2sm" v-if="
                        eventDetail.eventNotes === null ||
                        eventDetail.eventNotes.trim().length === 0
                      ">
                        no note from user.
                      </div>

                      <div class="border rounded-lg bg-gray-100
                       max-w-md mt-2 text-gray-600 px-3 py-3 
                       text-2sm " v-else>
                        {{ eventDetail.eventNotes }}
                      </div>
                    </div> -->




                                            <!-- <textarea v-show="isClickEdit" class="" type="text" v-model="editNotesModel"
                      placeholder="maximum at 500 characters" maxlength="500" /> -->


                                            <!-- <textarea id="message" rows="3" v-model="editNotesModel"
                                                v-show="isClickEdit" class="block p-2.5 w-full text-lg text-gray-900 bg-white py-2 px-3 text-grey-800 
                      rounded-lg border border-white focus:ring-blue-500 
                      focus:border-blue-500 dark:bg-white dark:border-white
                      dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500
                      dark:focus:border-blue-500 shadow-lg mb-3" placeholder="maximum at 500 characters" /> -->

                                            <div class="grid md:grid-cols-4 w-full" v-if="isClickEdit == false">
                                                <button class="text-blue-400 hover:text-white border 
                        border-blue-700 hover:bg-blue-800 focus:ring-4 
                        focus:outline-none transition duration-500 
                        ease-in-out focus:ring-blue-300 font-light 
                        rounded-xl text-lg text-center sm:mr-12 mt-2 
                        dark:border-blue-500 dark:text-blue-500 
                        dark:hover:text-white dark:hover:bg-blue-600 
                        dark:focus:ring-blue-800" @click="goToAllUser">
                                                    BACK
                                                </button>
                                                <span class="mx-14" v-if="isClickEdit == false"></span>
                                                <!-- click เพื่อเริ่มต้นการ edit -->
                                                <button @click="onClickEdit" class="text-orange-400 hover:text-white border 
                        border-orange-700 hover:bg-orange-800 focus:ring-4
                        focus:outline-none transition duration-500 ease-in-out
                        focus:ring-orange-300 font-light rounded-xl text-lg
                        px-3 py.5 text-center sm:mr-2 mt-2 dark:border-orange-500
                        dark:text-orange-500 dark:hover:text-white dark:hover:bg-orange-600
                        dark:focus:ring-orange-800">
                                                    EDIT
                                                </button>

                                                <!-- <span class="mx-14" v-show="isClickEdit"></span> -->

                                                <!-- ยกเลิกการจองนัด -->
                                                <button @click="cancelEvent" class="text-red-400 hover:text-white 
                        border border-red-700 hover:bg-red-800
                        focus:ring-4 focus:outline-none transition
                        duration-500 ease-in-out focus:ring-red-300
                        font-light rounded-xl text-lg px-3 py.5 text-center
                        mt-2 dark:border-red-500 dark:text-red-500
                        dark:hover:text-white dark:hover:bg-red-600
                        dark:focus:ring-red-800">
                                                    CANCEL
                                                </button>
                                            </div>
                                            <div class="grid md:grid-cols-2 w-full">
                                                <!--  CANCEL EDIT เพื่อยกเลิกการ edit -->
                                                <button v-show="isClickEdit" @click="cancelEdit" class="text-red-400 hover:text-white border
                        border-red-700 hover:bg-red-800 focus:ring-4 
                        focus:outline-none transition duration-500 ease-in-out 
                        focus:ring-red-300 font-light rounded-xl text-lg px-3
                        py.5 text-center mt-2 dark:border-red-500 dark:text-red-500
                        dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800">
                                                    CANCEL EDIT
                                                </button>
                                                <!-- save เพื่อบันทึกการ edit -->
                                                <BtnEditEvent @editEvent="updateEvent" v-show="isClickEdit" class="text-orange-400 
                    hover:text-white border
                    border-green-700 hover:bg-green-800
                    focus:ring-4 focus:outline-none
                    transition duration-500 ease-in-out
                    focus:ring-green-300 font-light
                    rounded-xl text-lg px-3 py.5 
                    text-center sm:ml-2 mt-2 dark:border--500
                    dark:text-green-500 dark:hover:text-white
                    dark:hover:bg-green-600 dark:focus:ring-green-800" />
                                            </div>

                                        </div>

                                    </div>
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