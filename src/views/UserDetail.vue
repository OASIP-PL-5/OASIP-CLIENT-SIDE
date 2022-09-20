<script setup>
    import { ref, onBeforeMount } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import BtnEditUser from '../components/BtnEditUser.vue'
    // import VueCookies from 'vue-cookies'
    const myRouter = useRouter()
    const goToAllUser = () => myRouter.push({ name: 'AllUser' })
    // const token = VueCookies.get('jwtToken');
    const token = localStorage.getItem('jwtToken');
    
    // const myRouter = useRouter()
    const { params } = useRoute()
    // const id = params.id;
    
    // model สำหรับเก็บค่า edit จาก  user
    const editUserId = ref('')
    const editUserNameModel = ref('')
    const editUserEmailModel = ref('')
    const editUserRoleModel = ref('')
    
    
    // object "thisUser" ใช้สำหรับเก็บค่าข้อมูล user-detail ในรูปแบบของ arrays
    const thisUser = ref([])
    const baseUrl = import.meta.env.PROD
        ? `${import.meta.env.VITE_BASE_URL}/api`
        : '/api'
    //Get all users
    const users = ref([]);
    //GET
    const getUser = async () => {
        const resUser = await fetch(`${baseUrl}/users`,{
            headers:{
           'content-type': 'application/json',
           'Authorization': `Bearer ${token}`
           }
        })
        if (resUser.status === 200) {
            users.value = await resUser.json();
            console.log(users.value);
            console.log(resUser);
        } else console.log("error cannot get users");
    };
    onBeforeMount(async () => {
        await getUser();
    })
    //GET
    const getThisUser = async () => {
        const id = params.id
        const res = await fetch(`${baseUrl}/users/${id}`,{headers:{ 'content-type': 'application/json', 'Authorization': `Bearer ${token}` }})
        thisUser.value = await res.json()
        console.log(`model Name:: ${thisUser.value[0].name}`)
        console.log(`model Role:: ${thisUser.value[0].role}`)
        console.log(`model email:: ${thisUser.value[0].email}`)
        // เมื่อ get user-detail นี้แล้ว จะนำข้อมูลแต่ละค่าเก็บเข้าตาม object ที่่เหมาะสมไป สำหรับทำ edit
        editUserId.value = thisUser.value[0].id
        editUserNameModel.value = thisUser.value[0].name
        editUserRoleModel.value = thisUser.value[0].role
        editUserEmailModel.value = thisUser.value[0].email
    
        if (res.status === 200) {
            console.log(thisUser.value)
            console.log(res)
        } else console.log('error cannot get this user detail')
    }
    onBeforeMount(async () => {
        await getThisUser()
    })
    //DELETE
    const cancelEvent = async () => {
        const id = params.id
        const confirmDel = 'Are you sure to delete this user?'
        if (confirm(confirmDel) == true) {
            const res = await fetch(`${baseUrl}/users/${id}`, {
                method: 'DELETE',
                headers: { 'content-type': 'application/json', 'Authorization': `Bearer ${token}` }
            })
            if (res.status === 200) {
                console.log('cancel userId: [' + id + '] success')
                await goToAllUser()
                location.reload()
            } else
                console.log('error cannot delete userId: [' + id + '] please try again')
        } else console.log('user not confirm to delete this user')
    }
    const isNameExist = ref(false)
    const isEmailExist = ref(false)
    //PUT
    const editUser = async () => {
        const id = params.id
        const getUserid = await fetch(`${baseUrl}/users/${id}`,{headers:{ 'content-type': 'application/json', 'Authorization': `Bearer ${token}` }})
        // console.clear()
        console.log(`Name:: ${thisUser.value[0].name}`)
        // const nameValidate = (false)
        // const emailValidate = (false)
    
        //function:validate-name & email 
        var checkName = users.value.filter(function (user) {
            return user.name == editUserNameModel.value && user.id !== editUserId.value;
        });
        var checkEmail = users.value.filter(function (user) {
            return user.email == editUserEmailModel.value && user.id !== editUserId.value;
        });
        console.log(checkName);
        // method: PUT
        // if (checkEmail.length == 0) {
        if (checkName.length == 0) {
            if (checkEmail.length == 0) {
                const resEdit = await fetch(`${baseUrl}/users/${id}`, {
                    method: 'PUT',
                    headers: { 'content-type': 'application/json', 'Authorization': `Bearer ${token}`},
                    body: JSON.stringify({
                        id: thisUser.value.id,
                        name: editUserNameModel.value,
                        email: editUserEmailModel.value,
                        role: editUserRoleModel.value
                    })
                })
                if (resEdit.status === 200) {
                    console.log('edit user complete')
                    location.reload()
                } else if (resEdit.status === 400) {
                    alert("invalid format")
                }
            }
            else {
                isEmailExist.value = true
                // alert('Email must unique')
            }
        }
        else {
            isNameExist.value = true
            // alert('Name must unique')
        }
    }
    // else {
    //         isEmailExist.value = true
    //         // alert('Email must unique')
    // }
    // }
    
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
                                            <div v-show="isClickEdit" class="mb-4">
                                                <h2 class="font-bold text-3xl mb-2 text-gray-800 max-w-2xl">
                                                    You're editing "{{ user.name }}"
                                                </h2>
    
                                                <form class="grid grid-col gap-y-2">
                                                    <label>Name
                                                        <span class="text-sm font-thin text-red-400">| Must be
                                                            unique*</span></label>
                                                    <input type="name"
                                                        class="border py-2 px-3 text-gray-800 rounded-lg shadow-lg"
                                                        v-model.trim="editUserNameModel" required maxlength="100" />
                                                    <span v-show="isNameExist" class="text-red-400">This user name is
                                                        already used.</span>
                                                    <label>Email
                                                        <span class="text-sm font-thin text-red-400">| Must be
                                                            unique*</span></label>
                                                    <input type="email"
                                                        class="border py-2 px-3 text-gray-800 rounded-lg shadow-lg"
                                                        v-model.trim="editUserEmailModel" required maxlength="50" />
                                                    <span v-show="isEmailExist" class="text-red-400">This email is
                                                        already used.</span>
                                                    <label>Role
                                                        <!-- <span class="text-sm font-thin text-red-400">| Must be
                                                            unique*</span>-->
                                                    </label>
                                                    <div class="grid grid-cols-1 mb-4 gap-x-2">
                                                        <select v-model="editUserRoleModel"
                                                            class="border py-2 px-3 text-grey-800 rounded-lg" required>
                                                            <option selected="selected" disabled>
                                                                Please select your role
                                                            </option>
                                                            <option value="student">
                                                                Student
                                                            </option>
                                                            <option value="lecturer">
                                                                Lecturer
                                                            </option>
                                                            <option value="admin">
                                                                Admin
                                                            </option>
                                                        </select>
                                                        <!-- <input class="border py-2 px-3 text-grey-800 rounded-lg" v-model="newEvent.newStartTime"
                  type="datetime-local" /> -->
                                                    </div>
                                                    <!-- <span v-show="CateNameValidate == true" class="text-red-500">
                                            This Category Name is already used.</span> -->
                                                    <!-- <label>Description <span class="text-sm font-thin text-red-400">| Maximum 500
                                                characters*</span></label> -->
                                                    <!-- <textarea type="text" rows="3" maxlength="500"
                                            class="border py-2 px-3 text-gray-800 rounded-lg shadow-lg"
                                            v-model="editDescriptionModel" required />
                                        <label>Duration<span class="text-sm font-thin text-red-400">
                                                | Between 1 - 480 minutes*</span></label>
                                        <input type="number" min="1" max="480"
                                            class="border py-2 px-3 text-gray-800 rounded-lg shadow-lg"
                                            v-model="editDurationModel" required />
                                        <span v-show="DurationValidate == true" class="text-red-500">
                                            Please fill out duration properly.</span> -->
                                                </form>
                                            </div>
                                            <div class="font-bold text-center text-5xl mb-2 text-gray-700 max-w-xl"
                                                v-if="isClickEdit == false">
                                                {{ user.name }}
    
                                                <span class="text-blue-400 hover:text-white border border-blue-700 
                                                hover:bg-blue-800 focus:ring-4 focus:outline-none transition 
                                                duration-500 ease-in-out focus:ring-blue-300 font-bold 
                                                rounded-xl text-4xl px-2 py-1 text-center 
                                                dark:border-blue-500 dark:text-blue-500 dark:hover:text-white 
                                                dark:hover:bg-blue-600 dark:focus:ring-blue-800 capitalize"
                                                    v-if="isClickEdit == false">
                                                    {{ user.role }}
                                                    <!-- <span v-show="isClickEdit" class="font-light text-lg">( {{ user.email }}
                                                        minutes)</span> -->
                                                </span>
                                            </div>
    
                                            <!-- <div class="font-bold text-center text-5xl mb-2 text-gray-200 max-w-xl"
                                                v-if="isClickEdit == true">
                                                {{ user.name }}
                                            </div> -->
    
                                            <!-- เมื่อกด edit จะเบลอ text พื้นหลัง (เป็นเพียง demo event ที่เกิดเฉยๆ) -->
                                            <div class="flex flex-col justify-center items-center">
                                                <div class="text-gray-500 text-xl mb-2 mt-2" v-if="isClickEdit == false">
                                                    {{ user.email }}
                                                </div>
    
    
                                                <!-- เมื่อกดปุ่ม save จะซ่อน บรรทัด startTime-duration เดิมทั้งหมด... -->
                                                <div v-show="isClickEdit == false" class="text-gray-800 mb-2 sm:text-2xl">
                                                    <div>
                                                        <span class="text-slate-700">Member since </span>
                                                        <span class="font-bold text-blue-400">{{
                                                                new Date(user.createdOn).toLocaleDateString('en')
                                                        }}
                                                            {{
                                                                    new Date(user.createdOn).toLocaleTimeString('en', {
                                                                        hour: '2-digit',
                                                                        minute: '2-digit'
                                                                    })
                                                            }}</span>
    
                                                    </div>
                                                    <div>
                                                        <span class="text-slate-700">Last modified </span>
                                                        <span class="font-bold text-blue-400">{{
                                                                new Date(user.updatedOn).toLocaleDateString('en')
                                                        }}
                                                            {{
                                                                    new Date(user.updatedOn).toLocaleTimeString('en', {
                                                                        hour: '2-digit',
                                                                        minute: '2-digit'
                                                                    })
                                                            }}</span>
    
                                                    </div>
    
    
                                                </div>
    
                                                <div class="grid md:grid-cols-4 w-full" v-if="isClickEdit == false">
    
                                                    <button
                                                        class="text-blue-400 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none transition duration-500 ease-in-out focus:ring-blue-300 font-light rounded-xl text-lg text-center sm:mr-12 mt-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                                                        @click="goToAllUser">
                                                        <svg class="inline-block " width="24" height="24"
                                                            viewBox="0 40 512 512">
                                                            <path fill="currentColor" d="M321.94 98L158.82 
                                                                237.78a24 24 0 0 0 0 
                                                                36.44L321.94 414c15.57 
                                                                13.34 39.62 2.28 
                                                                39.62-18.22v-279.6c0-20.5-24.05-31.56-39.62-18.18Z" />
                                                        </svg>
                                                        <span class="mr-2">BACK</span>
    
                                                    </button>
                                                    <span class="mx-14" v-if="isClickEdit == false"></span>
    
                                                    <!-- click เพื่อเริ่มต้นการ edit -->
                                                    <button @click="onClickEdit"
                                                        class="text-orange-400 hover:text-white border border-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none transition duration-500 ease-in-out focus:ring-orange-300 font-light rounded-xl text-lg px-3 py.5 text-center sm:mr-2 mt-2 dark:border-orange-500 dark:text-orange-500 dark:hover:text-white dark:hover:bg-orange-600 dark:focus:ring-orange-800">
                                                        EDIT
                                                    </button>
    
                                                    <!-- ยก -->
                                                    <button @click="cancelEvent"
                                                        class="text-red-400 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none transition duration-500 ease-in-out focus:ring-red-300 font-light rounded-xl text-lg px-3 py.5 text-center mt-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800">
                                                        DELETE
                                                    </button>
                                                </div>
                                                <div class="grid md:grid-cols-2 w-full">
                                                    <!--  CANCEL EDIT เพื่อยกเลิกการ edit -->
                                                    <button v-show="isClickEdit" @click="cancelEdit"
                                                        class="text-red-400 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none transition duration-500 ease-in-out focus:ring-red-300 font-light rounded-xl text-lg px-3 py.5 text-center mt-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800">
                                                        CANCEL EDIT
                                                    </button>
    
                                                    <!-- save เพื่อบันทึกการ edit -->
                                                    <BtnEditUser @editUser="editUser" v-show="isClickEdit"
                                                        class="text-orange-400 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none transition duration-500 ease-in-out focus:ring-green-300 font-light rounded-xl text-lg px-3 py.5 text-center sm:ml-2 mt-2 dark:border--500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800" />
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