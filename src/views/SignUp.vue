<script setup>
// หน้า signup ใหญ่
import { ref, onBeforeMount, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SignUpUser from '../components/SignUpUser.vue'
// import VueCookies from 'vue-cookies'
const token = localStorage.getItem('jwtToken');

const myRouter = useRouter()

const goToAllUser = () => myRouter.push({ name: 'AllUser' })
const goToSignIn = () => myRouter.push({ name: 'SignIn' })

const users = ref([])
// const check = ref(false)
const baseUrl = import.meta.env.PROD
    ? `${import.meta.env.VITE_BASE_URL}/api`
    : '/api'

//GET
const getUser = async () => {
    const resUser = await fetch(`${baseUrl}/users`, { headers: { 'content-type': 'application/json', 'Authorization': `Bearer ${token}` } })
    if (resUser.status === 200) {
        users.value = await resUser.json()
        console.log(users.value)
        console.log(resUser)
    } else console.log('error cannot get users')
}
onBeforeMount(async () => {
    await getUser()
})

// toggle add-user
const toggleModal = ref(false)
const closeToggle = () => location.reload()

const isNameExist = ref(false)
const isEmailExist = ref(false)

//POST
const addUser = async (
    //ใส่ตัวแปรที่จะใช้POST
    newName,
    newEmail,
    newPassword,
    confirm,
    newRole
    // newPassword,
    // confirm,
) => {
    var checkName = users.value.filter(function (user) {
        return user.name == newName
    })
    var checkEmail = users.value.filter(function (user) {
        return user.email == newEmail
    })
    console.log(checkName)
    console.log(checkEmail)

    console.log(newName)
    console.log(newEmail)
    console.log(newRole)
    // ไม่ครรแสดงข้อมูล password ใน console
    // console.log(newPassword)
    // console.log(confirm)

    console.log(newPassword.localeCompare(confirm))
    // if (newPassword.length > 7) {
    //     return (check = true)
    // }
    // console.log(check)

    if (newName.length !== 0 && newEmail.length !== 0 && newRole.length !== 0) {
        if (checkName.length == 0) {
            if (checkEmail.length == 0) {
                if (newPassword.localeCompare(confirm) == 0) {
                    if (newPassword.length > 7) {
                        // throw new Error('Password must be at least 8 characters')
                        const res = await fetch(`${baseUrl}/users`, {
                            method: 'POST',
                            headers: { 'content-type': 'application/json'},
                            body: JSON.stringify({
                                //แทนตัวแปร เพื่อส่ง value ออกไปผ่านการ post
                                name: newName,
                                email: newEmail,
                                password: newPassword,
                                role: newRole
                            })
                        })
                        if (res.status === 201) {
                            const addedUser = await res.json()
                            users.value.push(addedUser)
                            alert(`User: ${newName} is created successfully`)
                            // location.reload()
                            // go back to all user
                            goToSignIn()
                        }
                    }
                    if (newPassword.length < 7) {
                        alert("password must 8-14")
                    }
                } else {
                    alert('password not match please try again')
                    console.log('password not match please try again')
                }
            } else {
                alert('This email is already used.')
                isEmailExist.value = true
                console.log('is email exist ? : ', isEmailExist.value)
            }
        } else {
            alert('This name is already used.')
            isNameExist.value = true
            console.log('is name exist ? : ', isNameExist.value)
        }
    }

    if (newName.trim().length == 0) {
        newName = null
        alert('name must not be null')
    }
    if (newEmail.trim().length == 0) {
        newEmail = null
        alert('email must not be null')
    }
    // if (res.status === 500) {
    //   alert('user-name or user-email is already used. !')
    // }
}
</script>
        
<template>
    <div class="-my-6">
        <SignUpUser @addUser="addUser" />
    </div>
</template>
        
<style>

</style>
        