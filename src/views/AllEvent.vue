<script setup>
import { ref, onBeforeMount, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CreateEditEvent from '../components/CreateEditEvent.vue'
import IconFilter from '../components/icons/IconFilter.vue'
import jwt_decode from 'jwt-decode'

// ref-message-กรณี จะนำ errormessage ไปใช้งาน
const refMes = ref("")


// import VueCookies from 'vue-cookies'
const token = localStorage.getItem('jwtToken');
const newToken = localStorage.getItem('refreshToken')

const msalToken = localStorage.getItem('msal.634fde75-c93d-4e46-9b36-5f66eff43805.idtoken');
const isMsalLogin = localStorage.getItem('msal.634fde75-c93d-4e46-9b36-5f66eff43805.idtoken') ? true : false



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
const goToSignIn = () => myRouter.push({ name: 'SignIn' })
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

// ตัวแปรไว้เก็บ email
const userEmail = ref()

const ownEvent = ref(false)

// get current datetime
// เพื่อ disable เวลาที่เป็นอดีต
var currentDateTime = new Date();
console.log(currentDateTime.toJSON());
var dd = String(currentDateTime.getDate()).padStart(2, '0');
var mm = String(currentDateTime.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = currentDateTime.getFullYear();
var hr = String(currentDateTime.getHours())
var m = String(currentDateTime.getMinutes().toLocaleString().padStart(2, '0'))
currentDateTime = yyyy + '-' + mm + '-' + dd + 'T' + hr + ":" + m;
console.log("currentDateTime: ", currentDateTime);

const isUpcoming = ref(false)
const isPast = ref(false)

const getEventCard = async () => {

    // console.log(`${baseUrl}/events`)
    // ลดรูปเหลือเป็น const res = await fetch(`api/event`) ได้
    // ซึ่งก็ไม่จำเป็นต้องใช้ baseUrl
    if (isMsalLogin == false) {
        if (checkIsLogin.value == undefined || checkIsLogin.value == null) {
            const resEvent = await fetch(`${baseUrl}/events`, {
                headers: {
                    'content-type': 'application/json',
                    // 'Authorization': `Bearer ${token}`
                }
            }) // const res = await fetch(`${import.meta.env.VITE_BASE_URL}/event`)
            if (resEvent.status === 200) {
                eventCard.value = await resEvent.json()
                userEmail.value = localStorage.getItem('email')
                console.log("userEmail : ", userEmail.value);
                console.log("eventCard : ", eventCard.value);
                console.log(eventCard.value[0].email);
            }
            if (resEvent.status === 401 && checkIsLogin.value === true) {
                const resRefresh = await fetch(`${baseUrl}/refresh`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': `Bearer ${newToken}`
                    },
                    body: JSON.stringify({
                        token: newToken
                    })
                })
                if (resRefresh.status === 401) {
                    localStorage.clear()
                    alert('Please login again')
                    await myRouter.push({ path: '/sign-in' })
                }
                if (resRefresh.status === 200) {
                    const data = await resRefresh.json()
                    localStorage.setItem('jwtToken', data.refreshToken)
                    const resEvent = await fetch(`${baseUrl}/events`, {
                        headers: {
                            'content-type': 'application/json',
                            'Authorization': `Bearer ${newToken}`
                        }
                    })
                    if (resEvent.status === 200) {
                        eventCard.value = await resEvent.json()
                    }
                }
            }
        }
        else{
            const resEvent = await fetch(`${baseUrl}/events`, {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }) // const res = await fetch(`${import.meta.env.VITE_BASE_URL}/event`)
            if (resEvent.status === 200) {
                eventCard.value = await resEvent.json()
                userEmail.value = localStorage.getItem('email')
                console.log("userEmail : ", userEmail.value);
                console.log("eventCard : ", eventCard.value);
                console.log(eventCard.value[0].email);
            }
            if (resEvent.status === 401 && checkIsLogin.value === true) {
                const resRefresh = await fetch(`${baseUrl}/refresh`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': `Bearer ${newToken}`
                    },
                    body: JSON.stringify({
                        token: newToken
                    })
                })
                if (resRefresh.status === 401) {
                    localStorage.clear()
                    alert('Please login again')
                    await myRouter.push({ path: '/sign-in' })
                }
                if (resRefresh.status === 200) {
                    const data = await resRefresh.json()
                    localStorage.setItem('jwtToken', data.refreshToken)
                    const resEvent = await fetch(`${baseUrl}/events`, {
                        headers: {
                            'content-type': 'application/json',
                            'Authorization': `Bearer ${newToken}`
                        }
                    })
                    if (resEvent.status === 200) {
                        eventCard.value = await resEvent.json()
                    }
                }
            }
        }
    }
    if (isMsalLogin == true) {
        const resEvent = await fetch(`${baseUrl}/events`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${msalToken}`
            }
        }) // const res = await fetch(`${import.meta.env.VITE_BASE_URL}/event`)
        if (resEvent.status === 200) {
            eventCard.value = await resEvent.json()
            userEmail.value = localStorage.getItem('email')
            console.log("userEmail : ", userEmail.value);
            console.log("eventCard : ", eventCard.value);
            console.log(eventCard.value[0].email);
        }
        if (resEvent.status === 401 && checkIsLogin.value === true) {
            const resRefresh = await fetch(`${baseUrl}/refresh`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${newToken}`
                },
                body: JSON.stringify({
                    token: newToken
                })
            })
            if (resRefresh.status === 401) {
                localStorage.clear()
                alert('Please login again')
                await myRouter.push({ path: '/sign-in' })
            }
            if (resRefresh.status === 200) {
                const data = await resRefresh.json()
                localStorage.setItem('jwtToken', data.refreshToken)
                const resEvent = await fetch(`${baseUrl}/events`, {
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': `Bearer ${newToken}`
                    }
                })
                if (resEvent.status === 200) {
                    eventCard.value = await resEvent.json()
                }
            }
        }
    }


}
onBeforeMount(async () => {
    await getEventCard()
    console.log('length of eventCard: ', eventCard.value)
    // console.log('student email :', eventCard.value[0].bookingEmail);
})
const noScheduleImg =
    'https://img.freepik.com/free-vector/man-reading-concept-illustration_114360-8705.jpg?t=st=1651136740~exp=1651137340~hmac=d17fed796546aa370aea3c826f9743b6eb558fd34399d6cf89663051933ab10f&w=826'
// console.log(toggleModal.value);
const toggleModal = ref(false)
const closeToggle = () => window.location.reload()


const loggingIn = ref(false)
const allowModal = ref(true)



const checkIsLogin = computed(() => {
    if (localStorage.getItem('email')) {
        console.log('email value  : ', localStorage.getItem('email'))
        const decoded = jwt_decode(localStorage.getItem('jwtToken'))
        if (decoded.role === "lecturer" || decoded.role === null) {
            allowModal.value = false
            console.log('allowModal : ', allowModal.value);
        }
        return loggingIn.value = true
    }
    else {
        loggingIn.value = false
        allowModal.value = false
    }

})

console.log("isLogin", checkIsLogin.value);
// method: POST -- add event
const loading = ref(false)
const addEvent = async (
    newBookingName,
    newBookingEmail,
    newStartTime,
    newNotes,
    categorySelection,
    modelFile
) => {
    loading.value = true
    console.log("loading 1 ", loading.value);
    console.log("***modelFile*** : ", modelFile);
    console.log(`${baseUrl}/events`)
    console.log("booking email", newBookingEmail)
    console.log("have email in localStorage", localStorage.getItem('email')) //เดี๋ยวไปสร้างตัวแปรไว้เก็บเฉพาะ....
    // ถ้าเท่ากันจะได้ 0 ถ้าไม่เท่ากันจะได้ -1
    console.log(newBookingEmail.localeCompare(userEmail.value));
    // if (newBookingEmail.localeCompare(userEmail.value) == 0) {  // ไว้ check สำหรับ login แล้ว email ตรงกับตอนจะ new event มั้ย
    // ยังมีปัญหาอยู่ คาดว่าเกิดจากการเมาปีกกา
    // ไว้ check 2 กรณีคือ สำหรับ login ถ้า login อย่ localeCompare จะเป็น 0 หรือ ถ้าเป็น guest checkIsLogin จะเป็น false

    // กรณี postfile-with-login (Authorized)
    if (newBookingEmail.localeCompare(localStorage.getItem('email')) == 0) {
        // กรณีมี file-upload ด้วย
        if (modelFile != null) {
            var fileSize = 10485760 // เทียบขนาดของไฟล์ หาก <= 10MB จะสามารถ post-file ได้ เพื่อดักก่อนจะ post-event
            if (modelFile.size <= fileSize) {
                const res = await fetch(`${baseUrl}/events`, {
                    method: 'POST',
                    headers: { 'content-type': 'application/json', 'Authorization': `Bearer ${token}` },
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
                }
                )
                loading.value = true
                console.log("loading 1 ", loading.value);
                if (res.status === 201) {
                    const addedEvent = await res.json()
                    eventCard.value.push(addedEvent)
                    console.log("after submit", newBookingEmail);
                    console.log('added sucessfully')

                    // fetch-file-upload :: หากมีไฟล์ที่เพิ่ม upload เข้ามา ก็จะ != null ดังนั้น fecth-api ตัวนี้จึงทำงาน
                    const fileData = new FormData()
                    fileData.append('file', modelFile)
                    fileData.append('eventStartTime', newStartTime)
                    const resFile = await fetch(`${baseUrl}/files/upload`, {
                        method: 'POST',
                        body: fileData
                    })

                    alert(`Booking Name: ${newBookingName} is created successfully.\n We have send a confirmation email to ${newBookingEmail}`)
                    window.location.reload()

                } if (newBookingName.trim().length == 0 && res.status === 417) {
                    newBookingName = null
                    alert('Booking Name must be filled out!')
                }
                if (newBookingEmail.trim().length == 0 && res.status === 417) {
                    alert('Booking Email must be filled out!')
                }
                if (res.status == 400) {
                    console.log(currentDateTime);
                    alert('Appointment start time must be present or future.')
                }
                if (res.status === 409) {
                    alert('Appointment start time unable to schedule overlapping')
                }
            }
            else { alert('Could not upload the file. File is too large ! \nThe maximum file size you can upload is "10MB".') }
        }

        // กรณีไม่มี file-upload / post แค่ event อย่างเดียว
        if (modelFile == null || modelFile == undefined) {
            const res = await fetch(`${baseUrl}/events`, {
                method: 'POST',
                headers: { 'content-type': 'application/json', 'Authorization': `Bearer ${token}` },
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
            }
            )
            loading.value = true
            console.log("loading 1 ", loading.value);
            if (res.status === 201) {
                const addedEvent = await res.json()
                eventCard.value.push(addedEvent)
                console.log("after submit", newBookingEmail);
                console.log('added sucessfully')
                alert(`Booking Name: ${newBookingName} is created successfully.\n We have send a confirmation email to ${newBookingEmail}`)
                window.location.reload()
            } if (newBookingName.trim().length == 0) {
                newBookingName = null
                alert('Booking Name must be filled out!')
                res.status = 400
            } if (res.status == 400) {
                console.log(currentDateTime);
                alert('Appointment start time must be present or future.')
            }
            if (res.status === 409) {

                // alert('Appointment start time unable to schedule overlapping')
                return res.json().then(text => {
                    refMes.value = text.message;
                    console.log(refMes.value);
                    alert(refMes.value)
                })
            }
        }
    }

    // กรณีเป็น "Guest / No-Authorized"
    else {
        // กรณีมี file-upload ด้วย
        if (modelFile != null) {
            const fileSize = 10485760 // เทียบขนาดของไฟล์ หาก <= 10MB จะสามารถ post-file ได้ เพื่อดักก่อนจะ post-event
            if (modelFile.size <= fileSize) {
                console.log("file size", modelFile.size);
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
                }
                )
                if (res.status === 201) {
                    const addedEvent = await res.json()
                    eventCard.value.push(addedEvent)
                    console.log("after submit", newBookingEmail);
                    console.log('added sucessfully')

                    // fetch-file-upload :: หากมีไฟล์ที่เพิ่ม upload เข้ามา ก็จะ != null ดังนั้น fecth-api ตัวนี้จึงทำงาน
                    const fileData = new FormData()
                    fileData.append('file', modelFile)
                    fileData.append('eventStartTime', newStartTime)
                    const resFile = await fetch(`${baseUrl}/files/upload`, {
                        method: 'POST',
                        body: fileData
                    })

                    alert(`Booking Name: ${newBookingName} is created successfully.\n We have send a confirmation email to ${newBookingEmail}`)
                    window.location.reload()

                } if (newBookingName.trim().length == 0 && res.status === 417) {
                    newBookingName = null
                    alert('Booking Name must be filled out!')
                }
                if (newBookingEmail.trim().length == 0 && res.status === 417) {
                    alert('Booking Email must be filled out!')
                }
                if (res.status == 400) {
                    console.log(currentDateTime);
                    alert('Appointment start time must be present or future.')
                }
                if (res.status === 409) {
                    alert('Appointment start time unable to schedule overlapping')
                }
            }
            else { alert('Could not upload the file. File is too large ! \nThe maximum file size you can upload is "10MB".') }
        }

        // กรณีไม่มี file-upload / post แค่ event อย่างเดียว
        if (modelFile == null || modelFile == undefined) {
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
            }
            )
            if (res.status === 201) {
                const addedEvent = await res.json()
                eventCard.value.push(addedEvent)
                console.log("after submit", newBookingEmail);
                console.log('added sucessfully')
                alert(`Booking Name: ${newBookingName} is created successfully.\n We have send a confirmation email to ${newBookingEmail}`)
                window.location.reload()
            } if (newBookingName.trim().length == 0) {
                newBookingName = null
                alert('Booking Name must be filled out!')
                res.status = 400
            } if (res.status == 400) {
                console.log(currentDateTime);
                alert('Appointment start time must be present or future.')
            }
            if (res.status === 409) {
                alert('Appointment start time unable to schedule overlapping')
            }
        }
    }
}//ปีกกาปิดของ function: addEvent()

// SEARCHING METHOD
// search-catName-option
const eventCategory = ref([])
const getEventCategory = async () => {
    console.log(`${baseUrl}/event-categories`)
    const res = await fetch(`${baseUrl}/event-categories`, {
        headers: { 'content-type': 'application/json',
        //  'Authorization': `Bearer ${token}`
         }
    })
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
        const res = await fetch(`${baseUrl}/events`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        eventCard.value = await res.json()
    }
    else {
        var id = modelId.value.eventCategoryId
        const res = await fetch(`${baseUrl}/events/getByEventCategories/${id}`, {
            headers: { 'content-type': 'application/json', 'Authorization': `Bearer ${token}` }
        })
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
        const res = await fetch(`${baseUrl}/events`, {
            headers: { 'content-type': 'application/json', 'Authorization': `Bearer ${token}` }
        })
        eventCard.value = await res.json()
        haveAll.value = true
        // ถ้าหาก กดมาที่ตรงนี้จะปิด show ของ no upcoming & past
        haveUpcoming.value = false
        havePast.value = false
    }
    else if (modelTime.value == 'upcoming') {
        // ถ้าหาก กดมาที่ตรงนี้จะปิด show ของ no past 
        const resUp = await fetch(`${baseUrl}/events/getEventByUpcoming`, {
            headers: { 'content-type': 'application/json', 'Authorization': `Bearer ${token}` }
        })
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
        const resPast = await fetch(`${baseUrl}/events/getEventByPast`, {
            headers: { 'content-type': 'application/json', 'Authorization': `Bearer ${token}` }
        })
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
    const res = await fetch(`${baseUrl}/events/getEventsByEventStartTime/${date}`, {
        headers: { 'content-type': 'application/json', 'Authorization': `Bearer ${token}` }
    })
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


</script>
<template>
    <div>
        <!-- show filter component button -->
        <button v-if="checkIsLogin == true" class="border rounded-xl bg-blue-400 text-white bg-blue-400 
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
                        <input v-if="picked == 3" class="border py-2 px-3 text-grey-800 rounded-lg" type="date"
                            v-model="modelDate" @change="filterByDate" />
                        <button @click="refresh"
                            class="bg-gray-400 
                                font-medium text-lg leading-tight uppercase rounded text-white
                                shadow-sm hover:bg-gray-500 hover:shadow-lg focus:bg-gray-500
                                focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-600
                                active:shadow-lg transition duration-150 ease-in-out border py-2 px-3 text-grey-800 rounded-lg"
                            type="reset">
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
        <CreateEditEvent v-if="toggleModal" @closeToggle="closeToggle" @addEventComp="addEvent" @file="testFile" />
        <div v-if="loading">
            <div class="relative w-full rounded">
                <div style="width: 100%" class="absolute top-0 h-4 rounded shim-red"></div>
            </div>
        </div>
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
                                <div class="flex justify-start">
                                    <div v-if="event.eventStartTime > currentDateTime"
                                        class="bg-blue-100 font-semibold rounded-lg w-fit px-2 text-blue-500 ">
                                        <span class="inline-block">
                                            <svg width="22" height="22" viewBox="0 -2 24 24">
                                                <path fill="currentColor" d="M15 22v-2h4V10H5v4H3V6q0-.825.587-1.412Q4.175 4 
                                                 5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588Q21 5.175 21 
                                                 6v14q0 .825-.587 1.413Q19.825 22 19 22Zm-7 2l-1.4-1.4L9.175 
                                                 20H1v-2h8.175L6.6 15.4L8 14l5 5Z" />
                                            </svg>
                                        </span>
                                        Upcoming
                                    </div>

                                    <div v-if="event.eventStartTime < currentDateTime"
                                        class="border bg-slate-200 font-semibold rounded-lg w-fit px-2 text-slate-600 ">
                                        <span class="inline-block"><svg width="22" height="22" viewBox="0 -3 24 24">
                                                <path fill="currentColor" d="M16.53 11.06L15.47 10l-4.88 
                                                    4.88l-2.12-2.12l-1.06 1.06L10.59 
                                                    17l5.94-5.94zM19 3h-1V1h-2v2H8V1H6v2H5c-1.11 
                                                    0-1.99.9-1.99 2L3 19a2 2 0 0 0 2 2h14c1.1 0 
                                                    2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
                                            </svg>
                                        </span>
                                        Past
                                    </div>
                                    <div v-if="userEmail == event.bookingEmail"
                                        class="rounded-lg bg-yellow-200 bg-opacity-50 text-yellow-600 font-semibold ml-1 px-2">
                                        <span class="inline-block">
                                            <svg width="24" height="24" viewBox="0 -2 24 24">
                                                <path fill="currentColor"
                                                    d="m9.981 14.811l-.467 2.726l2.449-1.287l2.449 1.287l-.468-2.726l1.982-1.932l-2.738-.398L11.963 10l-1.225 2.481L8 12.879z" />
                                                <path fill="currentColor"
                                                    d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm.002 16H5V8h14l.002 12z" />
                                            </svg>
                                        </span>
                                        My event
                                    </div>

                                    <div class="ml-auto">
                                        <span class="ml-1 text-blue-400 
                                        border border-blue-400 
                                        font-bold rounded-lg text-sm px-1.5 py-1 
                                        text-center">
                                            {{
                                                    new Date(event.eventStartTime).toLocaleDateString('en')
                                            }}
                                        </span>
                                    </div>
                                </div>


                                <div class="font-bold text-2xl mb-2 text-gray-700">
                                    {{ event.eventCategoryName }}
                                    <span>
                                        <!--Space between eventCategory and date-->
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
            <button v-if="allowModal == true" @click="toggleModal = !toggleModal" type="button"
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
<style scoped>
.shim-red {
    position: relative;
    overflow: hidden;
    background-color: rgba(63, 140, 241, 0.7);
}

.shim-red::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(90deg,
            rgba(233, 233, 233, 1) 0,
            rgba(233, 233, 233, 0.9) 50%,
            rgba(233, 233, 233, 0.8) 100%);
    animation: shimmer 3s ease-out infinite;
    content: "";
}

@keyframes shimmer {
    100% {
        transform: translateX(0%);
        opacity: 0;
    }
}
</style>