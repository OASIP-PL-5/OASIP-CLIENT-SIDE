<script setup>
import { ref, onBeforeMount, toHandlers } from "vue";
import { useRoute, useRouter } from "vue-router";
const myRouter = useRouter();
const goToNotFound = () => myRouter.push({ name: "NotFound" });

console.clear();
const { params } = useRoute();
const goToAllEvent = () => myRouter.push({ name: "AllEvent" });

// GET:: DetailBases
const thisEventDetail = ref([]);
const baseUrl = import.meta.env.PROD
  ? `${import.meta.env.VITE_BASE_URL}/api`
  : "/api";

const BASEURL = "http://202.44.9.103:8080/pl5/api"
const getThisEventCard = async () => {
  const id = params.id;
  // const res = await fetch(`${baseUrl}/event/${id}`)
  const res = await fetch(`${BASEURL}/event/${id}`);
  thisEventDetail.value = await res.json();

  console.log(`res.status = 200? --> ${res.status == 200 ? true : false}`);
  console.log(thisEventDetail.value);

  if (res.status !== 200) {
    await goToNotFound();
    console.log(`event: ${id} is not exist!`);
  }
};
onBeforeMount(async () => {
  await getThisEventCard();
});

// DELETE: event
const cancelEvent = async () => {
  const id = params.id;
  let confirmation = "Are you sure?";
  if (confirm(confirmation) == true) {
    const res = await fetch(`${BASEURL}/event/${id}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      console.log("cancel bookingId: [" + id + "] success");
      await goToAllEvent();
    } else {
      console.log(
        'ERROR, cannot delete this note \n"please check your response status code"'
      );
    }
  } else {
    console.log("confirmation false");
  }
  console.log(`${baseUrl}/event/${id}`);

  // if (res.status === 200) {
  //     console.log('cancel bookingId: [' + id + '] success');
  //     await goToHome()
  // } else {
  //     console.log('ERROR, cannot delete this note \n"please check your response status code"');
  // }
};
</script>

<template>
  <div>
    <div>
      <div>
        <h2 class="font-bold text-4xl mx-10 my-10 text-slate-700">
          EVENT-DETAIL-BASE::
        </h2>
        <div>
          <div
            class="
              w-11/12
              m-auto
              grid
              items-center
              justify-center
              bg-white
              text-gray-900
            "
          >
            <div
              class="mx-10 my-3 max-w-none rounded-lg overflow-hinden shadow-lg"
            >
              <div class="px-6 py-4 text-left">
                <div>
                  <div
                    class="
                      font-bold
                      text-5xl
                      mb-2
                      flex flex-wrap
                      gap-x-4
                      text-gray-700
                    "
                  >
                    {{ thisEventDetail.eventCategory }}
                    <span
                      class="
                        text-blue-400
                        hover:text-white
                        border border-blue-700
                        hover:bg-blue-800
                        focus:ring-4 focus:outline-none
                        transition
                        duration-500
                        ease-in-out
                        focus:ring-blue-300
                        font-semibold
                        rounded-3xl
                        text-lg
                        px-1.5
                        py-1.5
                        text-center
                        mb-2
                        dark:border-blue-500
                        dark:text-blue-500
                        dark:hover:text-white
                        dark:hover:bg-blue-600
                        dark:focus:ring-blue-800
                      "
                    >
                      {{
                        new Date(
                          thisEventDetail.eventStartTime
                        ).toLocaleDateString("th")
                      }}
                    </span>
                  </div>

                  <ul class="max-w-md">
                    <li>Name: {{ thisEventDetail.bookingName }}</li>
                    <li>Email: {{ thisEventDetail.bookingEmail }}</li>
                    <li v-if="thisEventDetail.eventNotes === null">Notes: -</li>
                    <li v-else>Notes: {{ thisEventDetail.eventNotes }}</li>
                    <li>
                      Start Time:
                      {{
                        new Date(
                          thisEventDetail.eventStartTime
                        ).toLocaleTimeString("en", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      }}
                    </li>
                    <li>
                      Duration: {{ thisEventDetail.eventDuration }} minutes
                    </li>
                  </ul>
                  <div class="grid sm:grid-cols-4">
                    <button
                      class="
                        text-blue-400
                        hover:text-white
                        border border-blue-700
                        hover:bg-blue-800
                        focus:ring-4 focus:outline-none
                        transition
                        duration-500
                        ease-in-out
                        focus:ring-blue-300
                        font-light
                        rounded-xl
                        text-lg text-center
                        mr-16
                        mt-2
                        dark:border-blue-500
                        dark:text-blue-500
                        dark:hover:text-white
                        dark:hover:bg-blue-600
                        dark:focus:ring-blue-800
                      "
                      @click="goToAllEvent"
                    >
                      BACK
                    </button>
                    <span></span>
                    <button
                      class="
                        text-orange-400
                        hover:text-white
                        border border-orange-700
                        hover:bg-orange-800
                        focus:ring-4 focus:outline-none
                        transition
                        duration-500
                        ease-in-out
                        focus:ring-orange-300
                        font-light
                        rounded-xl
                        text-lg
                        px-3
                        py.5
                        text-center
                        mr-2
                        mt-2
                        dark:border-orange-500
                        dark:text-orange-500
                        dark:hover:text-white
                        dark:hover:bg-orange-600
                        dark:focus:ring-orange-800
                      "
                    >
                      EDIT
                    </button>
                    <button
                      @click="cancelEvent"
                      class="
                        text-red-400
                        hover:text-white
                        border border-red-700
                        hover:bg-red-800
                        focus:ring-4 focus:outline-none
                        transition
                        duration-500
                        ease-in-out
                        focus:ring-red-300
                        font-light
                        rounded-xl
                        text-lg
                        px-3
                        py.5
                        text-center
                        mt-2
                        dark:border-red-500
                        dark:text-red-500
                        dark:hover:text-white
                        dark:hover:bg-red-600
                        dark:focus:ring-red-800
                      "
                    >
                      CANCEL
                    </button>
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
