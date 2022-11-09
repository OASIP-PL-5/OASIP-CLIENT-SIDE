<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BtnEditEvent from '../components/BtnEditEvent.vue'
// import VueCookies from 'vue-cookies'
const myRouter = useRouter()
const goToNotFound = () => myRouter.push({ name: 'NotFound' })

console.clear()
const { params } = useRoute()
const goToAllEvent = () => myRouter.push({ name: 'AllEvent' })
const goToAllUser = () => myRouter.push({ name: 'AllUser' })
const token = localStorage.getItem('jwtToken');
const IsAuthorized = ref(true)
const alert404 = "Sorry... Something went wrong with this event.\nWe'll take you back to the EVENT-LIST-PAGE"



// model สำหรับเก็บค่า edit จาก user
const editStartTimeModel = ref('')
const editNotesModel = ref('')
// GET:: DetailBases
const thisEventDetail = ref([])
const baseUrl = import.meta.env.PROD
  ? `${import.meta.env.VITE_BASE_URL}/api`
  : '/api'

  const getThisEventCard = async () => {
  const id = params.id
  const res = await fetch(`${baseUrl}/events/${id}/`, {
    headers:
    {
      'content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }
  )
  if(res.status === 404){
    alert(alert404)
    goToAllEvent()
  }
  // ต้องการให้ เมื่อ token หมดอายุแล้วไปเรียก refreshToken ที่หน้า list-all-user แล้วกลับมาหน้าเดิมก่อนไปเรียก refreshToken
  if (res.status === 401) {
    alert("Please login again")
    await myRouter.push({ path: '/list-all-user' }) // เพื่อไปขอ refreshToken มาใหม่
    myRouter.go(-1) // กลับมาหน้าเดิมหลังไปเรียก refreshToken
  }
  // เมื่อ get หน้า detail-base จะรับค่าจาก thisEventDetail มายัด model ที่ต้องการ
  // เมื่อกด "edit" จะมีข้อมูล startTime & notes แสดงแล้วนั่นเอง
  if (res.status === 200) {
    thisEventDetail.value = await res.json()
    console.log(`model startTime:: ${thisEventDetail.value[0].eventStartTime}`);
    console.log(`model notes:: ${thisEventDetail.value[0].eventNotes}`);
    editStartTimeModel.value = thisEventDetail.value[0].eventStartTime
    editNotesModel.value = thisEventDetail.value[0].eventNotes
    console.log(`res.status = 200? --> ${res.status == 200 ? true : false}`)
    console.log(thisEventDetail.value)
  } else if (res.status === 403) {
    alert("You are not authorized to view this page")
    goToAllEvent()
  } else if (res.status === 400) {
    goToNotFound()
  }
  // else {
  //   await goToNotFound()
  //   console.log(`event: ${id} is not exist!`)
  // }
}

const fileId = ref('')
const fileType = ref('')
const hasFile = ref(false)
const thisEventFile = ref([])
const getFile = async () => {
  const id = params.id
  const res = await fetch(`${baseUrl}/files/${id}/`, {
    headers:
    {
      'content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      // 'responseType': 'blob'
    }
  }
  )
  if (res.status === 200) {
    thisEventFile.value = await res.json()
    hasFile.value = true
    console.log("thisEventFile = ", thisEventFile)
    console.log(thisEventFile.value.fileName);
    console.log(thisEventFile.value.fileType);
    console.log(thisEventFile.value.eventBooking);
    console.log(thisEventFile.value.id);
    fileId.value = thisEventFile.value.id
    console.log(`fileId = ${fileId.value}`);
    fileType.value = thisEventFile.value.fileType
    console.log(`fileType = ${fileType.value}`);
  }
}


const fileUrl = ref('')
const clicked = ref(false)
const toggle = ref(true)

const downloadFile = async () => {
  const id = fileId.value
  const res = await fetch(`${baseUrl}/files/download/${id}`, {
    headers:
    {
      'content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      // 'responseType': 'blob'

    }
  }
  )
  if (res.status === 200) {
    clicked.value = true
    toggle.value = false
    // thisEventFile.value = await res.json()
    console.log("res", res);
    // console.log(res.url);
    fileUrl.value = res.url
    console.log("fileUrl", fileUrl.value);
    console.log("thisEventFile = ", thisEventFile)
    console.log(thisEventFile.value.fileName);
    console.log(thisEventFile.value.fileType);
    console.log(thisEventFile.value.eventBooking);
    console.log(thisEventFile.value.id);
    fileId.value = thisEventFile.value.id
    console.log(`fileId = ${fileId.value}`);
    fileType.value = thisEventFile.value.fileType
    console.log(`fileType = ${fileType.value}`);

  }

}



onBeforeMount(async () => {
  await getThisEventCard()
  await getFile()
  // await downloadFile()

})

// DELETE: event
const cancelEvent = async () => {
  console.clear()
  console.log(thisEventFile.value.id);
  const fileId = thisEventFile.value.id
  const id = params.id
  let confirmation = 'Are you sure?'
  if (confirm(confirmation) == true) {
    //warning:: delete-file-before-event !!!
    const resDelFile = await fetch(`${baseUrl}/files/delete/${fileId}`, {
      method: 'DELETE'})

    const res = await fetch(`${baseUrl}/events/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    if (resDelFile.status === 404 && res.status === 404) {
    alert(alert404)
    goToAllEvent()
  }

    if (res.status === 200) {
      console.log('cancel bookingId: [' + id + '] success')
      await goToAllEvent()
    } else if (res.status === 403) {
      alert("You are not authorized to this action")
    }
    else {
      console.log(
        'ERROR, cannot delete this note \n"please check your response status code"'
      )
    }
  } else {
    console.log('confirmation false')
  }
  console.log(`${baseUrl}/event/${id}`)
  // if (res.status === 200) {
  //     console.log('cancel bookingId: [' + id + '] success');
  //     await goToHome()
  // } else {
  //     console.log('ERROR, cannot delete this note \n"please check your response status code"');
  // }
}

// ส่วนการทำงาน PUT
const isClickEdit = ref(false)
const onClickEdit = () => {
  isClickEdit.value = true
}
const cancelEdit = () => {
  isClickEdit.value = false
}
// model สำหรับเก็บค่า edit จาก user
// const editStartTimeModel = ref(`${thisEventDetail.value.eventStartTime}`)
// const editNotesModel = ref(`${thisEventDetail.value.eventNotes}`)
const updateEvent = async () => {
  const id = params.id
  const resGet = await fetch(`${baseUrl}/events/${id}`, {
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  if(resGet.status === 404){
    alert(alert404)
    goToAllEvent()
  }
  // const bookingName = params.bookingName
  // method: GET
  console.clear()
  console.log(editStartTimeModel.value);
  console.log(editNotesModel.value);
  // method: PUT
  const resPut = await fetch(`${baseUrl}/events/${id}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({
      id: thisEventDetail.value[0].id,
      eventStartTime: editStartTimeModel.value, // รับค่าจาก model
      eventNotes: editNotesModel.value, //รับค่าจาก model
    })
  })
  if (resPut.status == 400) {
    alert("Appointment date can not be time in the past.")
  }
  if (resPut.status === 403) {
    alert("You are not authorized to this action")
    myRouter.go(0)
  }
  // หลังบ้านเปลี่ยนข้อมูลแล้ว เมื่อ restart-page ใหม่ ก็จะดึงข้อมูลแบบใหม่มาแล้ว
  if (fileEditModel.value != null) {
      const fileEditedData = new FormData() 
    console.log(fileEditModel.value);
    fileEditedData.append('file',fileEditModel.value)
    const resPutFile = await fetch(`${baseUrl}/files/update/${id}`, {
    method: 'PATCH',
    body: fileEditedData
  })
  if (resPutFile.status === 200) {
    window.location.reload()
  }  
  }
  window.location.reload()
  
}

// สำหรับจัดการ edit-file
const fileEditModel = ref(null)
const fileAction = (e)=>{
  const file = e.target.files[0]
  // console.log(file)
  fileEditModel.value = file
  console.clear()
  console.log(fileEditModel.value);
}

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
    <div>
      <div>
        <h2 class="font-bold text-4xl mx-10 my-10 text-slate-700">
          EVENT-DETAIL-BASE::
        </h2>

        <div>

          <div class="w-11/12 m-auto grid items-center justify-center bg-white text-gray-900">
            <div class="mx-10 my-3 max-w-none rounded-lg overflow-hinden shadow-lg">
              <div class="px-6 py-4 text-left">
                <div v-for="(eventDetail, index) in thisEventDetail" :key="index"
                  class="md:flex flex-col justify-center items-center">
                  <div class="font-bold text-center text-5xl mb-2 text-gray-700 max-w-xl" v-if="isClickEdit == false">
                    {{ eventDetail.bookingName }}

                  </div>
                  <div class="font-bold text-center text-5xl mb-2 text-gray-200 max-w-xl" v-if="isClickEdit == true">
                    {{ eventDetail.bookingName }}

                  </div>
                  <div class="flex flex-col justify-center items-center">
                    <div class="text-gray-500 text-xl mb-4" v-if="isClickEdit == false">
                      {{ eventDetail.bookingEmail }}
                    </div>
                    <div class="text-gray-200 text-xl mb-4" v-if="isClickEdit == true">
                      {{ eventDetail.bookingEmail }}
                    </div>

                    <div class="text-blue-400 hover:text-white border
                       border-blue-700 hover:bg-blue-800
                       focus:ring-4 focus:outline-none
                       transition duration-500 ease-in-out
                       focus:ring-blue-300 font-bold rounded-xl
                       text-3xl px-2 py-1 text-center mb-2 dark:border-blue-500
                       dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600
                       dark:focus:ring-blue-800" v-if="isClickEdit == false">
                      {{ eventDetail.eventCategoryName }}
                      <span v-show="isClickEdit" class="font-light text-lg">({{ eventDetail.eventDuration }}
                        minutes)</span>
                    </div>

                    <div class="text-gray-400 hover:text-white border
                       border-gray-200 hover:bg-gray-200
                       focus:ring-4 focus:outline-none
                       transition duration-200 ease-in-out
                       focus:ring-gray-300 font-bold rounded-xl
                       text-3xl px-2 py-1 text-center mb-2 dark:border-gray-200
                       dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-200
                       dark:focus:ring-gray-200" v-if="isClickEdit == true">
                      {{ eventDetail.eventCategoryName }}
                      <span v-show="isClickEdit" class="font-light text-lg">({{ eventDetail.eventDuration }}
                        minutes)</span>
                    </div>

                    <!-- เมื่อกดปุ่ม save จะซ่อน บรรทัด startTime-duration เดิมทั้งหมด... -->
                    <div v-show="isClickEdit == false" class="text-gray-800 text-2xl">
                      {{
                          new Date(
                            eventDetail.eventStartTime
                          ).toLocaleDateString('en')
                      }}
                      {{
                          new Date(
                            eventDetail.eventStartTime
                          ).toLocaleTimeString('en', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })
                      }}
                      <span class="font-light text-lg">({{ eventDetail.eventDuration }} minutes)</span>
                    </div>

                    <!-- แล้วจะแสดง div ตัวนี้แทน (modelStartTime) -->
                    <div v-show="isClickEdit" class="text-gray-800 text-2xl mt-2 mb-3 relative">
                      <div class="grid">
                        <input class="py-2 px-16 rounded-lg shadow-lg border-gray-200" required
                          v-model="editStartTimeModel" type="datetime-local" :min="currentDateTime" />
                      </div>
                    </div>



                    <!-- detail: event-notes || เมื่อ click edit จะ ซ่อน div ของ notes นี้แล้วจะกลายเป็น input-->
                    <div class="w-full mb-3" v-show="isClickEdit == false">

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


                      <div class="mt-2">
                        <button @click="downloadFile" v-if="hasFile == true" v-show="toggle"
                          class="font-bold text-blue-600 dark:text-orange-500 hover:underline">
                          1 File attached.</button>


                      </div>

                      <!-- <a href="${fileUrl}">download file</a> -->
                      <div>
                        <a :href="fileUrl" v-show="clicked"
                          class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                          {{ thisEventFile.fileName }}</a>
                      </div>



                    </div>




                    <!-- <textarea v-show="isClickEdit" class="" type="text" v-model="editNotesModel"
                        placeholder="maximum at 500 characters" maxlength="500" /> -->


                    <textarea id="message" rows="3" v-model="editNotesModel" v-show="isClickEdit" class="block p-2.5 w-full text-lg text-gray-900 bg-white py-2 px-3 text-grey-800 
                        rounded-lg border border-white focus:ring-blue-500 
                        focus:border-blue-500 dark:bg-white dark:border-white
                        dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500
                        dark:focus:border-blue-500 shadow-lg mb-3" placeholder="maximum at 500 characters" />

                    <!-- input สำหรับ Edit File -->
                    <div class="flex flex-col mb-2" v-if="isClickEdit == true">
                      <label class="mb-2 font-bold text-lg text-gray-900">File <span class="text-sm font-thin"> |
                          Optional</span></label>
                      <input class="text-sm px-16 pl-2
               text-gray-900 rounded-lg border
                cursor-pointer" type="file" @change="fileAction">
                    </div>

                    <div class="grid md:grid-cols-4 w-full" v-if="isClickEdit == false">
                      <button class="text-blue-400 hover:text-white border 
                          border-blue-700 hover:bg-blue-800 focus:ring-4 
                          focus:outline-none transition duration-500 
                          ease-in-out focus:ring-blue-300 font-light 
                          rounded-xl text-lg text-center sm:mr-12 mt-2 
                          dark:border-blue-500 dark:text-blue-500 
                          dark:hover:text-white dark:hover:bg-blue-600 
                          dark:focus:ring-blue-800" @click="goToAllEvent">
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
</template>