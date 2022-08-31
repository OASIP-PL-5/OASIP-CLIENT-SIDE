<script setup>
    import { ref, onBeforeMount, computed } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import EventList from '../components/EventList.vue'
    import CreateEditEvent from '../components/CreateEditEvent.vue'
    import IconFilter from '../components/icons/IconFilter.vue'
    console.clear()
    // binding-CSS
    const btnTailWind =
        'inline-block px-6 py-2.5 mt-1.5 bg-blue-400 text-white font-bold text-xs leading-tight uppercase rounded shadow-sm hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out'
    const myRouter = useRouter()
    const { params } = useRoute()
    const goToDetail = () => myRouter.push({ name: 'EventDetailBase' })
    const goToCreate = () => myRouter.push({ name: 'CreateEvent' })
    // goHome จาก component create
    const goToHome = () => myRouter.push({ path: '/' })
    const goToAboutProject = () => myRouter.push({ name: 'AboutProject' })
    // object -- แสดงรายการ event เป็น card ต่างๆ
    const eventCard = ref([])
    // object -- จัดการการ searching
    const searchingInfo = ref([])
    const eventCat = ref([])
    // GET:: Card
    const baseUrl = import.meta.env.PROD
        ? `${import.meta.env.VITE_BASE_URL}/api`
        : '/api'
    // const checkURL = `${import.meta.env.PROD}`
    // console.log(checkURL);
    const getEventCard = async () => {
        // console.log(`${baseUrl}/events`)
        // ลดรูปเหลือเป็น const res = await fetch(`api/event`) ได้
        // ซึ่งก็ไม่จำเป็นต้องใช้ baseUrl
        const resEvent = await fetch(`${baseUrl}/events`)
        // const res = await fetch(`${import.meta.env.VITE_BASE_URL}/event`)
        eventCard.value = await resEvent.json()
    }
    onBeforeMount(async () => {
        await getEventCard()
        console.log('length of eventCard: ', eventCard.value)
    })
    const noScheduleImg =
        'https://img.freepik.com/free-vector/man-reading-concept-illustration_114360-8705.jpg?t=st=1651136740~exp=1651137340~hmac=d17fed796546aa370aea3c826f9743b6eb558fd34399d6cf89663051933ab10f&w=826'
    // console.log(toggleModal.value);
    const toggleModal = ref(false)
    const closeToggle = () => window.location.reload()
    // method: POST -- add event
    const addEvent = async (
        newBookingName,
        newBookingEmail,
        newStartTime,
        newNotes,
        categorySelection
    ) => {
        console.log(`${baseUrl}/events`)
        const res = await fetch(`${baseUrl}/events`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                // มีผลต่อ payload ต้องใส่
                bookingName: newBookingName,
                bookingEmail: newBookingEmail,
                eventStartTime: newStartTime,
                eventDuration: categorySelection.eventDuration,
                eventNotes: newNotes,
                eventCategoryId: categorySelection.eventCategoryId,
                eventCategoryName: categorySelection.eventCategoryName
            })
        })
        if (newBookingName.trim().length == 0) {
            newBookingName = null
            alert('Booking Name must be filled out!')
            res.status = 400
        } if (res.status == 400) {
            console.log(currentDateTime);
            alert('Appointment start time must be present or future.')
            // return res.status = 400
        }
        if (res.status === 201) {
            const addedEvent = await res.json()
            eventCard.value.push(addedEvent)
            console.log('added sucessfully')
            alert(`Booking Name: ${newBookingName} is created successfully`)
            window.location.reload()
        }
    }
    // SEARCHING METHOD
    // search-catName-option
    const eventCategory = ref([])
    const getEventCategory = async () => {
        console.log(`${baseUrl}/event-categories`)
        const res = await fetch(`${baseUrl}/event-categories`)
        eventCategory.value = await res.json()
        console.log('data from api: ' + eventCategory.value)
    }
    onBeforeMount(async () => {
        await getEventCategory()
    })
    // ลองกำหนด model สำหรับรับ id 
    const modelId = ref(null)
    // model for filter: time/chrono
    const filterByCategory = async () => {
        // fetch for filter catName
        // const test = modelId.value
        if (modelId.value == 'all') {
            const res = await fetch(`${baseUrl}/events`)
            eventCard.value = await res.json()
        }
        else {
            var id = modelId.value.eventCategoryId
            const res = await fetch(`${baseUrl}/events/getByEventCategories/${id}`)
            if (res.status == 204) {
                eventCard.value = 0;
            } else {
                eventCard.value = await res.json()
                console.log("res", res.url);
            }
        }
    }
    // let isShow = ref(true);
    // const isShowListAll = ref(true)
    // const eventCardFilterUp = ref([])
    // const eventCardFilterPast = ref([])
    const modelTime = ref()
    // obj สำหรับ จัดการ div show scheldule by period
    const haveUpcoming = ref(false)
    const havePast = ref(false)
    const haveAll = ref(false)
    // สำหรับแสดง text-header ของแต่ละ filter
    const isFilterAll = ref(true)
    const isFilterUp = ref(false)
    const isFilterPast = ref(false)
    const filterByPeriod = async () => {
        // // fetch for filter period/chrono
        if (modelTime.value == 'all') {
            isFilterAll.value = true
            isFilterUp.value = false
            isFilterPast.value = false
            const res = await fetch(`${baseUrl}/events`)
            eventCard.value = await res.json()
            haveAll.value = true
            // ถ้าหาก กดมาที่ตรงนี้จะปิด show ของ no upcoming & past
            haveUpcoming.value = false
            havePast.value = false
        }
        else if (modelTime.value == 'upcoming') {
            // ถ้าหาก กดมาที่ตรงนี้จะปิด show ของ no past 
            const resUp = await fetch(`${baseUrl}/events/getEventByUpcoming`)
            havePast.value = false
            haveAll.value = false
            isFilterUp.value = true
            isFilterAll.value = false
            isFilterPast.value = false
            if (resUp.status == 204) {
                console.log(`event card returned: ${haveUpcoming.value.length} + no upcoming or on-going events`);
                haveUpcoming.value = true
            }
            else {
                eventCard.value = await resUp.json()
            }
        } else if (modelTime.value == 'past') {
            const resPast = await fetch(`${baseUrl}/events/getEventByPast`)
            isFilterPast.value = true
            isFilterAll.value = false
            isFilterUp.value = false
            // ถ้าหาก กดมาที่ตรงนี้จะปิด show ของ no upcoming 
            haveUpcoming.value = false
            haveAll.value = false
            if (resPast.status == 204) {
                havePast.value = true
            } else {
                eventCard.value = await resPast.json()
            }
        }
    }
    const modelDate = ref()
    const filterByDate = async () => {
        var date = modelDate.value
        const res = await fetch(`${baseUrl}/events/getEventsByEventStartTime/${date}`)
        if (res.status == 204) {
            eventCard.value = 0
        }
        else {
            eventCard.value = await res.json()
            console.log("modelDate: ", modelDate.value);
        }
    }
    const showFilterMenu = ref(false)
    const picked = ref(false)
    const refresh = () => window.location.reload()
    // เพื่อ disable เวลาที่เป็นอดีต
    var currentDateTime = new Date();
    console.log(currentDateTime.toJSON());
    var dd = String(currentDateTime.getDate()).padStart(2, '0');
    var mm = String(currentDateTime.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = currentDateTime.getFullYear();
    var hr = String(currentDateTime.getHours())
    var m = String(currentDateTime.getMinutes().toLocaleString().padStart(2, '0'))
    currentDateTime = yyyy + '-' + mm + '-' + dd + 'T' + hr + ":" + m;
    </script>
    <template>
        <div>
            <!-- show filter component button -->
            <button class="border rounded-xl bg-blue-400 text-white bg-blue-400 
                                font-medium text-lg leading-tight uppercase rounded 
                                shadow-sm hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500
                                focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600
                                active:shadow-lg transition duration-150 ease-in-out
                            font-bold mx-10 mt-4 px-2 rounded inline-flex items-center
                            absolute top-56 lg:top-36 right-6" @click="showFilterMenu = !showFilterMenu">
                <span class="mx-2">Filter Menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
                    role="img" class="iconify iconify--mdi" width="32" height="32" preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24">
                    <path fill="currentColor"
                        d="M9 6v2H2V6h7m0 5v2H2v-2h7m9 5v2H2v-2h16m1.31-4.5c.44-.68.69-1.5.69-2.39c0-2.5-2-4.5-4.5-4.5s-4.5 2-4.5 4.5s2 4.5 4.5 4.5c.87 0 1.69-.25 2.38-.68L21 16l1.39-1.39l-3.08-3.11m-3.81.11c-1.38 0-2.5-1.11-2.5-2.5s1.12-2.5 2.5-2.5a2.5 2.5 0 0 1 0 5Z">
                    </path>
                </svg>
            </button>
            <!-- filter component -->
            <div class="relative">
                <div class="border rounded-xl shadow-2xl justify-center bg-white text-gray-900 sm:w-3/12
                        sm:absolute -top-16 right-0 z-50 lg:h-screen" v-show="showFilterMenu">
                    <div>
                        <form class="grid sm:grid-col gap-4 my-4 mx-auto w-10/12 ">
                            <div>
                                <h2 class="text-4xl font-bold text-blue-400 mb-3">FILTER MENU</h2>
                                <hr class="mb-3">
                                <div class="form-check mb-2">
                                    <input class="form-check-input appearance-none rounded-full h-4 w-4 border 
                                        border-gray-300 bg-white checked:bg-blue-600 
                                        checked:border-blue-600 focus:outline-none transition
                                        duration-200 mt-1 align-top bg-no-repeat bg-center
                                        bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault"
                                        id="flexRadioDefault1" v-model="picked" value="1">
                                    <label class="form-check-label inline-block text-gray-800" for="flexRadioDefault1">
                                        Filter by event-category
                                    </label>
                                </div>
                                <select v-if="picked == 1" class="border py-2 px-3 text-grey-800 rounded-lg mb-2 w-full"
                                    required v-model="modelId" @change="filterByCategory">
                                    <option value="all">All Event Category</option>
                                    <option v-for="(eventCat, index) in eventCategory" :key="index" :value="{
                                        eventCategoryId: eventCat.id
                                        // eventCategoryName: eventCat.eventCategoryName
                                    }">
                                        {{ eventCat.eventCategoryName }}
                                    </option>
                                </select>
                                <div class="form-check mb-2">
                                    <input class="form-check-input appearance-none rounded-full h-4 w-4 border 
                                        border-gray-300 bg-white checked:bg-blue-600 
                                        checked:border-blue-600 focus:outline-none transition
                                        duration-200 mt-1 align-top bg-no-repeat bg-center
                                        bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault"
                                        id="flexRadioDefault1" v-model="picked" value="2">
                                    <label class="form-check-label inline-block text-gray-800" for="flexRadioDefault1">
                                        Filter by date
                                    </label>
                                </div>
                                <select v-if="picked == 2" v-model="modelTime" @change="filterByPeriod"
                                    class="border py-2 px-3 text-grey-800 rounded-lg mb-2 w-full">
                                    <option value="all">All Events Date</option>
                                    <option value="past">Past</option>
                                    <option value="upcoming">Upcoming</option>
                                </select>
                                <div class="form-check mb-2">
                                    <input class="form-check-input appearance-none rounded-full h-4 w-4 border 
                                        border-gray-300 bg-white checked:bg-blue-600 
                                        checked:border-blue-600 focus:outline-none transition
                                        duration-200 mt-1 align-top bg-no-repeat bg-center
                                        bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault"
                                        id="flexRadioDefault1" v-model="picked" value="3">
                                    <label class="form-check-label inline-block text-gray-800" for="flexRadioDefault1">
                                        Filter by specific date
                                    </label>
                                </div>
                            </div>
                            <input v-if="picked == 3" class="border py-2 px-3 text-grey-800 rounded-lg"
                                type="date" v-model="modelDate" @change="filterByDate" />
                            <button @click="refresh"
                                class="bg-gray-400 
                                font-medium text-lg leading-tight uppercase rounded text-white
                                shadow-sm hover:bg-gray-500 hover:shadow-lg focus:bg-gray-500
                                focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-600
                                active:shadow-lg transition duration-150 ease-in-out border py-2 px-3 text-grey-800 rounded-lg" type="reset">
                                RESET
                            </button>
                            <button class="bg-blue-400 
                                font-medium text-lg leading-tight uppercase rounded 
                                shadow-sm hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500
                                focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600
                                active:shadow-lg transition duration-150 ease-in-out text-white border 
                                py-2 px-3 text-grey-800 rounded-lg" type="button"
                                @click="showFilterMenu = !showFilterMenu">
                                CLOSE
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <!-- modal for POST-event from CreateEditEvent.vue(component)-->
            <CreateEditEvent v-if="toggleModal" @closeToggle="closeToggle" @addEventComp="addEvent" />
            <!-- No Schedule -->
            <div v-show="eventCard == 0" class="grid place-items-center h-screen">
                <h1 class="font-bold text-5xl text-blue-500">No Scheduled Events</h1>
                <img :src="noScheduleImg" alt="noScheduleImg" />
            </div>
            <div v-show="haveUpcoming && eventCard != 0" class="grid place-items-center h-screen">
                <h1 class="font-bold text-5xl text-blue-500">No Upcoming or On-going Events</h1>
                <!-- <img :src="noScheduleImg" alt="noScheduleImg" /> -->
            </div>
            <div v-show="havePast && eventCard != 0" class="grid place-items-center h-screen">
                <h1 class="font-bold text-5xl text-blue-500">No Past Events</h1>
                <!-- <img :src="noScheduleImg" alt="noScheduleImg" /> -->
            </div>
            <!-- GET ALL -->
            <div>
                <div v-show="eventCard != 0 && haveUpcoming != true && havePast != true">
                    <h2 class="font-bold text-5xl mx-10 mt-16 text-slate-700">
                        <span v-show="isFilterAll">SCHEDULED EVENTS:: </span>
                        <span v-show="isFilterPast">SCHEDULED EVENTS:: FILTER PAST </span>
                        <span v-show="isFilterUp">SCHEDULED EVENTS:: FILTER UPCOMING </span>
                        <span class="text-3xl text-blue-400 mb-4">{{ eventCard.length }} events
                        </span>
                    </h2>
                    <div class="w-full m-auto mt-12 grid md:grid-cols-4 items-center justify-center bg-white text-gray-900">
                        <div class="mx-10 my-6 max-w-sm rounded-lg overflow-hinden shadow-lg hover:scale-110 transition-transform"
                            v-for="(event, index) in eventCard" :key="index">
                            <div class="px-6 py-2 text-left">
                                <div>
                                    <div class="font-bold text-2xl mb-2 text-gray-700">
                                        {{ event.eventCategoryName }}
                                        <span>
                                            <!--Space between eventCategory and date-->
                                        </span>
                                        <span
                                            class="text-blue-400 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none transition duration-500 ease-in-out focus:ring-blue-300 font-semibold rounded-3xl text-sm px-1.5 py-1 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800">
                                            {{
                                                    new Date(event.eventStartTime).toLocaleDateString('en')
                                            }}
                                        </span>
                                    </div>
                                    <ul class="mb-2">
                                        <li>Name: {{ event.bookingName }}</li>
                                        <li>
                                            Start Time:
                                            {{
                                                    new Date(event.eventStartTime).toLocaleTimeString('en', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })
                                            }}
                                        </li>
                                        <li>Duration: {{ event.eventDuration }} minutes</li>
                                    </ul>
                                </div>
                                <hr />
                                <div class="flex my-2">
                                    <span class="content-center mx-auto">
                                        <router-link :to="{
                                            name: 'EventDetailBase',
                                            params: { id: event.id, bookingName: event.bookingName }
                                        }">
                                            <button :class="btnTailWind">Details</button>
                                        </router-link>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="relative">
                <button @click="toggleModal = !toggleModal" type="button"
                    class="fixed bottom-8 right-16 p-0 w-25 h-25 bg-blue-400 rounded-full hover:bg-blue-500 hover:scale-150 transition-transform active:shadow-lg mouse shadow ease-in duration-200 focus:outline-none">
                    <svg viewBox="0 0 20 20" enable-background="new 0 0 20 20" class="w-16 h-16 inline-block">
                        <path fill="#FFFFFF" d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                        C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                        C15.952,9,16,9.447,16,10z" />
                    </svg>
                </button>
            </div>
        </div>
    </template>