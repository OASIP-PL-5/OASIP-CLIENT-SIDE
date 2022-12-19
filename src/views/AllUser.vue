<script setup>
// modal-addUser
import { ref, onBeforeMount, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import CreateUser from "../components/CreateUser.vue";
// import VueCookies from 'vue-cookies'
// const token = VueCookies.get('jwtToken');
const token = localStorage.getItem("jwtToken");
const newToken = localStorage.getItem("refreshToken");

const myRouter = useRouter();
const goToUserDetail = () => myRouter.push({ name: "UserDetail" });
const goToAllUser = () => myRouter.push({ name: "AllUser" });
const goToSignIn = () => myRouter.push({ name: "SignIn" });
const goToHome = () => myRouter.push({ name: "Home" });

const users = ref([]);
// console.log(VueCookies.get('jwtToken'))
console.log("localStorage token : ", localStorage.getItem("jwtToken"));
console.log(
  "localStorage refreshToken : ",
  localStorage.getItem("refreshToken")
);
console.log("is login : ", localStorage.getItem("email") ? true : false);
const IsAuthorized = ref(true);

const baseUrl = import.meta.env.PROD
  ? `${import.meta.env.VITE_BASE_URL}/api`
  : "/api";

const isMsalLogin = localStorage.getItem(
  "msal.634fde75-c93d-4e46-9b36-5f66eff43805.idtoken"
)
  ? true
  : false;

const msalToken = localStorage.getItem(
  "msal.634fde75-c93d-4e46-9b36-5f66eff43805.idtoken"
);

//GET
const getUser = async () => {
  const isLogin = localStorage.getItem("email") ? true : false;

  if (isLogin == false && isMsalLogin == false) {
    alert("Session timeout...please login again !");
    await myRouter.push({ path: "/sign-in" });
    myRouter.go(0);
  }

  if (isMsalLogin == false) {
    const resUser = await fetch(`${baseUrl}/users`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // พอ access token หมดอายุ จะไป fetch /refresh เพื่อเอา refreshToken มาใช้
    if (resUser.status === 401 || resUser.status === 403) {
      const resRefresh = await fetch(`${baseUrl}/refresh`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${newToken}`,
        },
        body: JSON.stringify({
          token: newToken,
        }),
      });
      // ใช้ตอน refreshToken หมดอายุ ให้ทำการ sign out และกลับไปหน้า sign in ใหม่
      if (resRefresh.status === 401) {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("refreshToken");
        alert("Session timeout...please login again !");
        await myRouter.push({ path: "/sign-in" });
        myRouter.go(0);
      }
      if (resRefresh.status === 200) {
        const data = await resRefresh.json();
        localStorage.setItem("jwtToken", data.refreshToken);
        // localStorage.setItem('refreshToken', data.refreshToken)
        const resUser = await fetch(`${baseUrl}/users`, {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${newToken}`,
          },
        });
        if (resUser.status === 200) {
          users.value = await resUser.json();
          console.log(users.value);
          console.log(resUser);
        } else console.log("error cannot get users");
      } else {
        console.log("error cannot refresh token");
      }
    } else if (resUser.status === 200) {
      users.value = await resUser.json();
      console.log(users.value);
      console.log(resUser);
    }

    // if (resUser.status === 200) {
    //   users.value = await resUser.json()
    //   console.log(users.value)
    //   console.log(resUser)
    // }
    else if (resUser.status === 403) {
      alert("You are not authorized to access this page");
      IsAuthorized.value = false;
      console.log(
        "Is this user allow to access this page:",
        IsAuthorized.value
      );
      goToHome();
    } else console.log("error cannot get users");
  }
  //for azure-token
  else if (isMsalLogin == true) {
    const resUser = await fetch(`${baseUrl}/users`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${msalToken}`,
      },
    });
    // หาก mstoken หมดอายุหรือพัง จะพาไปหน้า signin
    if (resUser.status === 403) {
      alert("You are not authorized to access this page");
      IsAuthorized.value = false;
      console.log(
        "Is this user allow to access this page:",
        IsAuthorized.value
        );
        goToHome();
      } 
      else if (resUser.status === 401 || resUser.status === 403) {
        alert("Session timeout...please login again !");
        await myRouter.push({ path: "/sign-in" });
        myRouter.go(0);
      } 
      else if (resUser.status === 200) {
        users.value = await resUser.json();
        console.log(users.value);
        console.log(resUser);
      } 
      else console.log("error cannot get users");
  }
};

onBeforeMount(async () => {
  await getUser();
});

// toggle add-user
const toggleModal = ref(false);
const closeToggle = () => location.reload();

const isNameExist = ref(false);
const isEmailExist = ref(false);

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
    return user.name == newName;
  });
  var checkEmail = users.value.filter(function (user) {
    return user.email == newEmail;
  });
  console.log(checkName);
  console.log(checkEmail);

  console.log(newName);
  console.log(newEmail);
  console.log(newRole);
  console.log(newPassword);
  console.log(confirm);

  console.log(newPassword.localeCompare(confirm));

  if (
    newName.length !== 0 &&
    newEmail.length !== 0 &&
    newRole.length !== 0 &&
    newPassword.length !== 0
  ) {
    if (checkName.length == 0) {
      if (checkEmail.length == 0) {
        if (newPassword.localeCompare(confirm) == 0) {
          if (newPassword.length > 7) {
            if (isMsalLogin == false) {
              const res = await fetch(`${baseUrl}/users`, {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  //แทนตัวแปร เพื่อส่ง value ออกไปผ่านการ post
                  name: newName,
                  email: newEmail,
                  password: newPassword,
                  role: newRole,
                }),
              });

              if (res.status === 201) {
                // const addedUser = await res.json()
                // users.value.push(addedUser) <- what is this
                alert(`User: ${newName} is created successfully`);
                location.reload();
              } else if (res.status === 409) {
                alert("This name is already used.");
                console.log("This name is already used.");
              } else if (res.status === 400) {
                alert("This email is already used.");
                console.log("This email is already used.");
              } else if (res.status === 401 || res.status === 403) {
                const resRefresh = await fetch(`${baseUrl}/refresh`, {
                  method: "POST",
                  headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${newToken}`,
                  },
                  body: JSON.stringify({
                    token: newToken,
                  }),
                });
                // ใช้ตอน refreshToken หมดอายุ ให้ทำการ sign out และกลับไปหน้า sign in ใหม่
                if (resRefresh.status === 401) {
                  localStorage.removeItem("jwtToken");
                  localStorage.removeItem("refreshToken");
                  alert("Please login again");
                  await myRouter.push({ path: "/sign-in" });
                  myRouter.go(0);
                }
                if (resRefresh.status === 200) {
                  const data = await resRefresh.json();
                  localStorage.setItem("jwtToken", data.refreshToken);
                  // localStorage.setItem('refreshToken', data.refreshToken)
                  const resUser = await fetch(`${baseUrl}/users`, {
                    headers: {
                      "content-type": "application/json",
                      Authorization: `Bearer ${newToken}`,
                    },
                  });
                  if (resUser.status === 200) {
                    users.value = await resUser.json();
                    console.log(users.value);
                    console.log(resUser);
                  } else console.log("error cannot get users");
                } else {
                  console.log("error cannot refresh token");
                }
              }
            } else if (isMsalLogin == true) {
              const res = await fetch(`${baseUrl}/users`, {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                  Authorization: `Bearer ${msalToken}`,
                },
                body: JSON.stringify({
                  //แทนตัวแปร เพื่อส่ง value ออกไปผ่านการ post
                  name: newName,
                  email: newEmail,
                  password: newPassword,
                  role: newRole,
                }),
              });

              if (res.status === 201) {
                // const addedUser = await res.json()
                // users.value.push(addedUser) <- what is this
                alert(`User: ${newName} is created successfully`);
                location.reload();
              } else if (res.status === 409) {
                alert("This name is already used.");
                console.log("This name is already used.");
              } else if (res.status === 400) {
                alert("This email is already used.");
                console.log("This email is already used.");
              } else if (res.status === 401 || res.status === 403) {
                alert("Session timeout...please login again !");
                await myRouter.push({ path: "/sign-in" });
                myRouter.go(0);
              }
            }
          }
          if (newPassword.length < 7) {
            alert("password must 8-14");
          }
        } else {
          alert("password not match please try again");
          console.log("password not match please try again");
        }
      } else {
        alert("This email is already used.");
        isEmailExist.value = true;
        console.log("is email exist ? : ", isEmailExist.value);
      }
    } else {
      alert("This name is already used.");
      isNameExist.value = true;
      console.log("is name exist ? : ", isNameExist.value);
    }
  }
  if (newName.trim().length == 0) {
    newName = null;
    alert("name must not be null");
  }
  if (newEmail.trim().length == 0) {
    newEmail = null;
    alert("email must not be null");
  }
};

const loggingIn = ref(false);
const checkIsLogin = computed(() => {
  if (localStorage.getItem("jwtToken")) {
    console.log("token: ", localStorage.getItem("jwtToken"));
    return (loggingIn.value = true);
  } else {
    return (loggingIn.value = false);
  }
});

const noUsersImg =
  "https://img.freepik.com/free-vector/empty-concept-illustration_114360-1253.jpg?w=826&t=st=1661052554~exp=1661053154~hmac=e91c27a84a9612e6b7b0edd5e394264f3ec6ea7c46a13ef33bfec2fb404cbe8f";
</script>
  
<template>
  <div>
    <!-- No User -->
    <div v-show="users == 0" class="grid place-items-center h-screen">
      <h1 class="font-bold text-6xl text-blue-500 my-6">"No Users"</h1>
      <h1 v-if="loggingIn == false" class="text-xl text-slate-800">
        Please
        <button
          @click="goToSignIn"
          class="
            underline
            font-bold
            text-blue-400
            hover:scale-105
            transition-transform
          "
        >
          sign in
        </button>
        to see users.
      </h1>
      <!-- <h1 v-if="IsAuthorized==false" class="text-xl text-slate-800">You are not allow to access this page.</h1> -->
      <!-- <button
          class="text-blue-400 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none transition duration-500 ease-in-out focus:ring-blue-300 font-semibold rounded-3xl text-2xl px-4 py-1 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
        >
          Add user +
        </button> -->
      <img :src="noUsersImg" alt="noUsersImg" />
    </div>

    <!-- toggle "Add-User" -->
    <CreateUser
      v-if="toggleModal"
      @closeToggle="closeToggle"
      @addUser="addUser"
    />

    <div v-if="users != 0">
      <h2 class="font-bold text-5xl mx-20 mt-16 text-slate-700">
        USER MANAGEMENT
        <span class="text-3xl text-blue-300 mb-4"
          >total {{ users.length }} user(s)
        </span>
      </h2>

      <!-- <button class="text-blue-400 hover:text-white border border-blue-700 
              hover:bg-blue-800 focus:ring-4 focus:outline-none transition duration-500 
              ease-in-out focus:ring-blue-300 font-semibold rounded-3xl text-2xl px-4 
              py-1 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white 
              dark:hover:bg-blue-600 dark:focus:ring-blue-800 absolute top-56 lg:top-36 right-20">Add user +</button> -->
      <div>
        <div class="min-w-screen flex items-center justify-center">
          <div class="w-full md:w-11/12">
            <div class="bg-white shadow-md rounded-lg my-6">
              <table class="min-w-max w-full table-auto">
                <thead>
                  <tr
                    class="
                      bg-blue-400
                      text-white
                      uppercase
                      text-lg
                      leading-normal
                    "
                  >
                    <th class="py-3 pl-4 text-left">#</th>
                    <th class="py-3 px-6 text-left">USER NAME</th>
                    <th class="py-3 px-6 text-left">EMAIL ADDRESS</th>
                    <th class="py-3 px-6 text-center">ROLE</th>
                    <th class="py-3 px-6 text-center">ACTION</th>
                  </tr>
                </thead>

                <tbody class="text-gray-600 text-lg font-light">
                  <tr
                    v-for="(user, index) in users"
                    :key="index"
                    class="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td class="py-3 pl-4 text-left">
                      <div class="flex items-left">
                        {{ index + 1 }}
                      </div>
                    </td>
                    <td class="py-3 px-6 text-left whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="mr-2">
                          <!---user name here-->
                          {{ user.name }}
                        </div>
                      </div>
                    </td>
                    <td class="py-3 px-4 text-left">
                      <div class="flex items-center">
                        <div class="mr-2">
                          {{ user.email }}
                        </div>
                      </div>
                    </td>
                    <td class="py-3 text-center">
                      <div class="flex items-center justify-center">
                        <div
                          v-if="user.role == 'student'"
                          class="
                            font-bold
                            text-white
                            bg-blue-300
                            rounded-full
                            px-3
                            py-1
                            capitalize
                          "
                        >
                          {{ user.role }}
                        </div>
                        <div
                          v-if="user.role == 'lecturer'"
                          class="
                            font-bold
                            text-white
                            bg-orange-300
                            rounded-full
                            px-3
                            py-1
                            capitalize
                          "
                        >
                          {{ user.role }}
                        </div>
                        <div
                          v-if="user.role == 'admin'"
                          class="
                            font-bold
                            text-white
                            bg-red-400
                            rounded-full
                            px-5
                            py-1
                            capitalize
                          "
                        >
                          {{ user.role }}
                        </div>
                      </div>
                    </td>
                    <td
                      class="
                        py-3
                        text-center
                        hover:scale-125
                        transition-transform
                      "
                    >
                      <router-link
                        :to="{
                          name: 'UserDetail',
                          params: { id: user.id },
                        }"
                      >
                        <span
                          class="
                            bg-blue-100
                            text-blue-500
                            py-1
                            px-3
                            rounded-full
                            text-sm
                            hover:underline
                          "
                          >View Details</span
                        >
                      </router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="relative" v-show="users != 0">
              <button @click="toggleModal = !toggleModal" type="button" class="fixed font-bold px-4 py-2 text-3xl text-white bottom-8 right-16 p-0 w-25 h-25 bg-blue-400 rounded-full
                  hover:bg-blue-500 hover:scale-125 transition-transform active:shadow-lg mouse shadow ease-in duration-200 
                  focus:outline-none">
                  Add User +
              </button>
  
  
          </div> -->
    <div class="relative">
      <button
        @click="toggleModal = !toggleModal"
        type="button"
        class="
          fixed
          bottom-8
          right-10
          p-0
          w-25
          h-25
          bg-blue-400
          rounded-full
          hover:bg-blue-500 hover:scale-150
          transition-transform
          active:shadow-lg
          mouse
          shadow
          ease-in
          duration-200
          focus:outline-none
        "
      >
        <svg
          viewBox="0 0 20 20"
          enable-background="new 0 0 20 20"
          class="w-16 h-16 inline-block"
        >
          <path
            fill="#FFFFFF"
            d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                      C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                      C15.952,9,16,9.447,16,10z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
  
<style>
</style>