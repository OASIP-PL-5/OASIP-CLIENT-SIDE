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

const isOwner = ref(true)


// model สำหรับเก็บค่า edit จาก user
const editStartTimeModel = ref('')
const editNotesModel = ref('')
// GET:: DetailBases
const thisEventDetail = ref([])
const baseUrl = import.meta.env.PROD
  ? `${import.meta.env.VITE_BASE_URL}/api`
  : '/api'

const loadFile = ref(false)
const loading = ref(true)
const getThisEventCard = async () => {
  const id = params.id
  const res = await fetch(`${baseUrl}/events/${id}/`, {
    headers:
    {
      'content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  }
  )
  // check is fetching
  loading.value = false
  if (res.status === 404) {
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
    if (thisEventDetail.value[0].bookingEmail == null) {
      isOwner.value = false
      console.log("isOwner", isOwner.value);
    }
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
  loadFile.value = true
  console.log("loading file", loadFile.value);
  if (res.status === 200) {
    thisEventFile.value = await res.json()
    hasFile.value = true
    loadFile.value = false
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
  else if (res.status === 404) {
    loadFile.value = false

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
    // loadFile.value = false

    // thisEventFile.value = await res.json()
    console.log("res", res);
    // console.log(res.url);
    fileUrl.value = res.url
    console.log("fileUrl", fileUrl.value);
    console.log("thisEventFile = ", thisEventFile)
    // console.log(thisEventFile.value.fileName);
    // console.log(thisEventFile.value.fileType);
    // console.log(thisEventFile.value.eventBooking);
    // console.log(thisEventFile.value.id);
    fileId.value = thisEventFile.value.id
    console.log(`fileId = ${fileId.value}`);
    fileType.value = thisEventFile.value.fileType
    console.log(`fileType = ${fileType.value}`);

  }

}

// delete file 
const deleteFile = async () => {
  const id = fileId.value
  let confirmation = `Are you sure to delete ${thisEventFile.value.fileName} ?`
  if (confirm(confirmation) == true) {
    const res = await fetch(`${baseUrl}/files/delete/${id}/`, {
      method: 'DELETE',
      headers:
      {
        'content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        // 'responseType': 'blob'
      }
    }
    )
    if (res.status === 200) {
      alert(`${thisEventFile.value.fileName} is deleted.`)
      hasFile.value = false
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


  if (res.status === 200) {
    hasFile.value = false
    console.log("res", res);
    // console.log(res.url);
    fileUrl.value = res.url


  }

}



onBeforeMount(async () => {
  await getThisEventCard()
  await getFile()
  await downloadFile()

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
      method: 'DELETE', headers:{'Authorization': `Bearer ${token}`}
    })

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
      alert('cancel bookingId: [' + id + '] success')
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
const editLoading = ref(false)
const doneEdit = ref(false)
const updateEvent = async () => {
  const id = params.id
  const resGet = await fetch(`${baseUrl}/events/${id}`, {
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  )
  editLoading.value = true
  console.log("edit loading", editLoading.value);

  if (resGet.status == 200) {
    // window.location.reload()
    editLoading.value = false
  }
  else if (resGet.status === 404) {
    alert(alert404)
    goToAllEvent()
  }
  // const bookingName = params.bookingName
  // method: GET
  console.clear()
  // let editStartTimeModel = new Date()
  // editStartTimeModel.value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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
  editLoading.value = true
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
    fileEditedData.append('file', fileEditModel.value)
    const resPutFile = await fetch(`${baseUrl}/files/update/${id}`, {
      method: 'PATCH',
      body: fileEditedData,
      // ถ้าไม่ใส่ header จะ 401
      headers: { 'Authorization': `Bearer ${token}` }
    })
    if (resPutFile.status === 200) {
      window.location.reload()
    }
    else if (resPutFile.status === 404) {
      // fetch post file
      // const addNewFile ({modelFile}) => {

      // }
      console.log(fileEditModel.value.size);
      var fileSize = 10485760 // เทียบขนาดของไฟล์ หาก <= 10MB จะสามารถ post-file ได้ เพื่อดักก่อนจะ post-event
      if (fileEditModel.value.size > fileSize) {
        alert('Could not upload the file. File is too large ! \nThe maximum file size you can upload is "10MB".')
      }

      const fileData = new FormData()
      fileData.append('file', fileEditModel.value)
      // check file size
      console.log(fileEditModel)

      console.log("test file size ::");
      // if(fileEditModel.value.siz>)

      // editStartTimeModel.value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      console.log("format", editStartTimeModel.value);
      // fileData.append('eventStartTime', editStartTimeModel.value.substring(0,16))
      console.log(editStartTimeModel.value);
      console.log(fileEditModel.value)
      console.log(fileData)
      console.log("sub string : ", editStartTimeModel.value.substring(0, 16));
      const completedStartTime = editStartTimeModel.value.substring(0, 16)
      fileData.append('eventStartTime', completedStartTime)
      console.log("completed starttime: ", completedStartTime);

      const resFile = await fetch(`${baseUrl}/files/upload`, {
        method: 'POST',
        // body: `${resGet.eventStartTime}`
        body: fileData,
        headers: { 'Authorization': `Bearer ${token}` }

      })
      editLoading.value = true
      if (resFile.status == 200) {
        editLoading.value = false
        doneEdit.value = true
        // wait 2 seconds then reload page
        setTimeout(() => {
          window.location.reload()
        }, 500)
        // window.location.reload()

      }
      // else{
      //   alert("File size is too large")
      // }
    }
  }
  window.location.reload()

}

// สำหรับจัดการ edit-file
const fileEditModel = ref(null)
const isTooLarge = ref(false)
const fileAction = (e) => {
  const file = e.target.files[0]
  // console.log(file)
  fileEditModel.value = file
  console.clear()
  console.log(fileEditModel.value);
  // byte -> MB
  console.log("size :: ", fileEditModel.value.size * 0.000001);
  const mbfile = fileEditModel.value.size * 0.000001
  const tenMb = 10485760
  // if(mbfile>1048576){
  //   alert("File too large")
  // }
  console.log(fileEditModel.value.size);
  if (fileEditModel.value.size > tenMb) {
    console.log("file size", fileEditModel.value.size);
    alert("The file size cannot be larger than 10 MB")
    fileEditModel.value = null
    isTooLarge.value = true
    // เพื่อ reset file เมื่อขนาดเกินกำหนด
    e.target.value = ''
  }
  else {
    isTooLarge.value = false
  }
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
                <div v-if="loading">
                  <div role="status">
                    <svg aria-hidden="true"
                      class="m-auto w-16 h-16 text-gray-200 animate-spin dark:text-gray-200 fill-blue-400"
                      viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor" />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill" />
                    </svg>
                    <h1 class="mt-2">Loading event details.</h1>
                  </div>
                </div>
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
                        <div v-if="loadFile" class="max-w-sm w-full">
                          <div class="animate-pulse">
                            <!-- <div class="flex-1 space-y-6 py-1"> -->
                            <!-- <div class="space-y-3"> -->
                            <div class="grid grid-cols-3 gap-4">
                              <div class="h-2 bg-orange-200 rounded col-span-1"></div>
                            </div>
                            <!-- </div> -->
                            <!-- </div> -->
                          </div>
                        </div>
                      </div>

                      <!-- <a href="${fileUrl}">download file</a> -->
                      <div v-if="hasFile == true">

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
                          Optional<span v-if="isTooLarge == true" class="block text-red-400 font-bold"> Please Choose
                            again.</span></span></label>
                      <div class="flex item-center justify-between ">
                        <input class="text-sm px-16 pl-2
                        text-gray-900 rounded-lg border w-full
                        cursor-pointer" type="file" @change="fileAction">
                        <button v-if="hasFile == true" @click="deleteFile"><svg width="32" height="32"
                            viewBox="0 0 24 24" class="text-red-500">
                            <path fill="currentColor" d="M7 4V2h10v2h5v2h-2v15a1 1 0 0 1-1 1H5a1 
                           1 0 0 1-1-1V6H2V4h5zM6 6v14h12V6H6zm3
                           3h2v8H9V9zm4 0h2v8h-2V9z" />
                          </svg></button>

                      </div>


                      <p v-if="hasFile == true" class="text-slate-900 mt-1 m-auto">The old file <span
                          class="font-medium text-blue-500">({{
                              thisEventFile.fileName
                          }}) </span>will be replaced/removed.</p>
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
                      <button v-if="isOwner" @click="onClickEdit" class="text-orange-400 hover:text-white border 
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
                      <button v-if="isOwner" @click="cancelEvent" class="text-red-400 hover:text-white 
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
                    <div v-show="isClickEdit" class="text-2xl">
                      <span class="text-slate-600 text-lg" v-if="editLoading">Proceeding.</span>
                      <span class="text-green-600" v-if="doneEdit">Done.</span>
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