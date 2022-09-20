<script setup>
    import { ref, onBeforeMount } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import BtnEditEventCategory from '../components/BtnEditEventCategory.vue'
    import VueCookies from 'vue-cookies'
    const token = VueCookies.get('jwtToken');
    
    const myRouter = useRouter()
    const goToNotFound = () => myRouter.push({ name: 'NotFound' })
    const goToHome = () => myRouter.push({ name: 'Home' })
    
    
    console.clear()
    const { params } = useRoute()
    const goToAllEvent = () => myRouter.push({ name: 'AllEvent' })
    
    
    // model สำหรับเก็บค่า edit จาก user
    const editCategoryNameModel = ref('')
    const editDescriptionModel = ref('')
    const editDurationModel = ref('')
    
    const thisEventCategoryDetail = ref([])
    const baseUrl = import.meta.env.PROD
        ? `${import.meta.env.VITE_BASE_URL}/api`
        : '/api'
    
    const getThisEventCatCard = async () => {
        const id = params.id
        const res = await fetch(`${baseUrl}/event-categories/${id}`,{
            headers:{ 'content-type': 'application/json', 'Authorization': `Bearer ${token}` }
        })
    
        thisEventCategoryDetail.value = await res.json()
        // ควรไว้ทีหลัง res.json()
        editCategoryNameModel.value = thisEventCategoryDetail.value.eventCategoryName
        editDescriptionModel.value = thisEventCategoryDetail.value.eventCategoryDescription
        editDurationModel.value = thisEventCategoryDetail.value.eventDuration
    
        console.log(`res.status = 200? --> ${res.status == 200 ? true : false}`)
        console.log(thisEventCategoryDetail.value)
    
        if (res.status !== 200) {
            await goToNotFound()
            console.log(`event: ${id} is not exist!`)
        }
    }
    onBeforeMount(async () => {
        await getThisEventCatCard()
    })
    
    const CateNameValidate = ref(false)
    const DurationValidate = ref(false)
    const updateEventCategory = async () => {
        const id = params.id
        const resGet = await fetch(`${baseUrl}/event-categories/${id}`,{
            headers:{ 'content-type': 'application/json', 'Authorization': `Bearer ${token}` }
        })
        // const bookingName = params.bookingName
        // method: GET
        console.clear()
        // method: PUT
        const resPut = await fetch(`${baseUrl}/event-categories/${id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                id: thisEventCategoryDetail.value.id,
                eventCategoryName: editCategoryNameModel.value,
                eventCategoryDescription: editDescriptionModel.value,
                eventDuration: editDurationModel.value,
            })
        }
        )
    
        if (resPut.status == 500) {
            // let CateNameStore = ref('undefined')
            // alert(`Can not update, ${editCategoryNameModel.value} is already used.`)
            CateNameValidate.value = true
            // CateNameStore.value = editCategoryNameModel.value
            // console.log(CateNameStore.value);
    
        }
        if (resPut.status == 400) {
            // if (editDescriptionModel.value.length > 500) {
            //     alert("Description maximum at 500 characters")
            // }
            if (editDurationModel.value > 480) {
                // alert("Duration must be between 1-480 minutes.")
                DurationValidate.value = true
            }
            if (editCategoryNameModel.value.trim().length == 0) {
                alert("Please fill out Category Name")
            }
        }
    
        // หลังบ้านเปลี่ยนข้อมูลแล้ว เมื่อ restart-page ใหม่ ก็จะดึงข้อมูลแบบใหม่มาแล้ว
        else if (resPut.status == 200) {
            window.location.reload()
        }
    
    }
    
    
    // ส่วนการทำงาน PUT
    const isClickEdit = ref(false)
    const onClickEdit = () => {
        isClickEdit.value = true
    }
    const cancelEdit = () => {
        isClickEdit.value = false
    }
    </script>
    
    <template>
        <div>
            <div>
                <h2 class="font-bold text-4xl mx-10 my-10 text-slate-700">
                    EVENT-CATEGORY-DETAIL-BASE::
                </h2>
                <div class="w-11/12 m-auto grid items-center justify-center bg-white text-gray-900">
                    <div class="mx-10 my-3 max-w-none rounded-lg overflow-hinden shadow-lg">
                        <div class="px-6 py-4 text-left">
                            <div class="md:flex flex-col justify-center items-center">
                                <!-- <div class="text-xl font-thin text-center">| Category Name |</div> -->
                                <div class="font-bold text-center text-5xl mb-4 text-gray-700 max-w-2xl"
                                    v-if="isClickEdit == false">
                                    {{ thisEventCategoryDetail.eventCategoryName }}
                                </div>
                                <div v-show="isClickEdit" class="mb-4">
                                    <h2 class="font-bold text-3xl mb-2 text-gray-800 max-w-2xl">
                                        You're editing {{ thisEventCategoryDetail.eventCategoryName }}
                                    </h2>
    
                                    <form class="grid grid-col gap-y-2">
                                        <label>Category Name
                                            <span class="text-sm font-thin text-red-400">| Must be unique*</span></label>
                                        <input type="name" class="border py-2 px-3 text-gray-800 rounded-lg shadow-lg"
                                            v-model.trim="editCategoryNameModel" required />
                                        <span v-show="CateNameValidate == true" class="text-red-500">
                                            This Category Name is already used.</span>
                                        <label>Description <span class="text-sm font-thin text-red-400">| Maximum 500
                                                characters*</span></label>
                                        <textarea type="text" rows="3" maxlength="500"
                                            class="border py-2 px-3 text-gray-800 rounded-lg shadow-lg"
                                            v-model="editDescriptionModel" required />
                                        <label>Duration<span class="text-sm font-thin text-red-400">
                                                | Between 1 - 480 minutes*</span></label>
                                        <input type="number" min="1" max="480"
                                            class="border py-2 px-3 text-gray-800 rounded-lg shadow-lg"
                                            v-model="editDurationModel" required />
                                        <span v-show="DurationValidate == true" class="text-red-500">
                                            Please fill out duration properly.</span>
    
                                    </form>
    
                                </div>
    
                                <div class="flex flex-col justify-center items-center">
                                    <!-- <div class="text-xl font-thin text-center ">| Description |</div> -->
                                    <div class="text-gray-500 text-xl mb-3 max-w-xl" v-if="isClickEdit == false">
                                        <p v-if="
                                            thisEventCategoryDetail.eventCategoryDescription === null ||
                                            thisEventCategoryDetail.eventCategoryDescription.trim().length == 0
                                        ">
                                            Unfortunately this clinic has no description yet.📁
                                        </p>
                                        <p v-else>
                                            {{ thisEventCategoryDetail.eventCategoryDescription }}
                                        </p>
                                        <p>
                                            meeting available for
                                            <span class="font-bold text-xl text-blue-500">
                                                {{ thisEventCategoryDetail.eventDuration }}-minutes</span>
                                        </p>
                                    </div>
    
                                    <div class="grid md:grid-cols-4 w-full">
                                        <button
                                            class="text-blue-400 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none transition duration-500 ease-in-out focus:ring-blue-300 font-light rounded-xl text-lg text-center mt-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                                            @click="goToHome" v-if="isClickEdit == false">
                                            BACK
                                        </button>
                                        <span class="mx-14"></span>
                                        <span class="mx-14"></span>
                                        <!-- click เพื่อเริ่มต้นการ edit -->
                                        <button @click="onClickEdit"
                                            class="text-orange-400 hover:text-white border border-orange-700 hover:bg-orange-800 focus:ring-4 inline-flex items-center focus:outline-none transition duration-500 ease-in-out focus:ring-orange-300 font-light rounded-xl text-lg px-3 py.5 text-center mt-2 dark:border-orange-500 dark:text-orange-500 dark:hover:text-white dark:hover:bg-orange-600 dark:focus:ring-orange-800"
                                            v-if="isClickEdit == false">
                                            <span class="mx-auto">MANAGE</span>
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
                                                class="iconify iconify--ph" width="32" height="32"
                                                preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256">
                                                <path fill="currentColor"
                                                    d="m234.8 150.4l-14.9-19.8c.1-1.8 0-3.7 0-5.1l14.9-19.9a7.8 7.8 0 0 0 1.3-6.9a114.8 114.8 0 0 0-10.9-26.4a8.2 8.2 0 0 0-5.8-4l-24.5-3.5l-3.7-3.7l-3.5-24.5a8.2 8.2 0 0 0-4-5.8a114.8 114.8 0 0 0-26.4-10.9a7.8 7.8 0 0 0-6.9 1.3L130.6 36h-5.2l-19.8-14.8a7.8 7.8 0 0 0-6.9-1.3a114.8 114.8 0 0 0-26.4 10.9a8.2 8.2 0 0 0-4 5.8l-3.5 24.5l-3.7 3.7l-24.5 3.5a8.2 8.2 0 0 0-5.8 4a114.8 114.8 0 0 0-10.9 26.4a7.8 7.8 0 0 0 1.3 6.9l14.9 19.8v5.1l-14.9 19.9a7.8 7.8 0 0 0-1.3 6.9a114.8 114.8 0 0 0 10.9 26.4a8.2 8.2 0 0 0 5.8 4l24.5 3.5l3.7 3.7l3.5 24.5a8.2 8.2 0 0 0 4 5.8a114.8 114.8 0 0 0 26.4 10.9a7.6 7.6 0 0 0 2.1.3a7.7 7.7 0 0 0 4.8-1.6l19.8-14.8h5.2l19.8 14.8a7.8 7.8 0 0 0 6.9 1.3a114.8 114.8 0 0 0 26.4-10.9a8.2 8.2 0 0 0 4-5.8l3.5-24.6c1.2-1.2 2.6-2.5 3.6-3.6l24.6-3.5a8.2 8.2 0 0 0 5.8-4a114.8 114.8 0 0 0 10.9-26.4a7.8 7.8 0 0 0-1.3-6.9ZM128 172a44 44 0 1 1 44-44a44 44 0 0 1-44 44Z">
                                                </path>
                                            </svg>
                                        </button>
    
                                        <!-- <span class="mx-14" v-show="isClickEdit"></span> -->
                                    </div>
    
                                    <div class="grid md:grid-cols-2 w-full">
                                        <!--  CANCEL EDIT เพื่อยกเลิกการ edit -->
                                        <button v-show="isClickEdit" @click="cancelEdit"
                                            class="text-red-400 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none transition duration-500 ease-in-out focus:ring-red-300 font-light rounded-xl text-lg px-3 py.5 text-center mt-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800">
                                            CANCEL EDIT
                                        </button>
                                        <!-- save เพื่อบันทึกการ edit -->
                                        <BtnEditEventCategory @editEventCategory="updateEventCategory" v-show="isClickEdit"
                                            class="text-orange-400 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none transition duration-500 ease-in-out focus:ring-green-300 font-light rounded-xl text-lg px-3 py.5 text-center sm:ml-2 mt-2 dark:border--500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800" />
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