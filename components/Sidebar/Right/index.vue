<script lang="ts" setup>
import useTailwindConfig from "~/components/composables/useTailwindConfig";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import useEmitter from "~/components/composables/useEmitter";

const emitter = useEmitter()

const { defaultTransition } = useTailwindConfig();
const whatsHappeningItems = ref([
  {
    title: "#ItsSnowing",
    count: "18.8k Tweets",
  },
  {
    title: "CodingIsFun",
    count: "125.2k Tweets",
  },
  {
    title: "Cars",
    count: "3.7k Tweets",
  },
]);
const whoToFollowItems = ref([
  {
    name: "Arthur Morgan",
    handle: "@ArthurMorgan",
    image: "https://picsum.photos/200/200",
  },
  {
    name: "John Marston",
    handle: "@JohnMarston",
    image: "https://picsum.photos/200/200",
  },
  {
    name: "Sadie Adler",
    handle: "@SadieAdler",
    image: "https://picsum.photos/200/200",
  },
]);
const search = ref('')

function handleSearch() {
  useRouter().push({
    path: '/search',
    query: {
      q: search.value
    }
  })
}

function handleToggleDarkMode() {
  emitter.$emit('toggleDarkMode')
}
</script>

<template>
  <div class="flex flex-col">
    <div class="relative m-2">
      <div class="flex items-center justify-between h-full text-gray-600 cursor-pointer">
        <MagnifyingGlassIcon class="w-6 h-6 absolute left-4" @click="handleSearch" />
        <input v-model="search" type="text"
          class="flex items-center w-full pl-12 text-sm font-normal text-black dark:text-gray-100 bg-gray-200 border border-gray-200 rounded-full shadow dark:bg-dim-400 dark:border-dim-400 focus:bg-gray-100 dark:focus:bg-dim-900 focus:outline-none focus:border-blue-200 h-9"
          placeholder="Search anything">
      </div>
    </div>
    <SidebarRightPreviewCard title="What’s happening">
      <SidebarRightPreviewCardItem v-for="whatsHappening in whatsHappeningItems">
        <h3 class="font-bold text-gray-800 text-md dark:text-white">
          {{ whatsHappening.title }}
        </h3>
        <p class="text-xs text-gray-400 dark:text-white">
          {{ whatsHappening.count }}
        </p>
      </SidebarRightPreviewCardItem>
    </SidebarRightPreviewCard>
    <SidebarRightPreviewCard title="Who to follow">
      <SidebarRightPreviewCardItem v-for="whoToFollow in whoToFollowItems">
        <div class="flex flex-row items-center justify-between p-2">
          <div class="flex flex-row items-center">
            <img :alt="`Profile picture of the user : ${whoToFollow.name}`" :src="whoToFollow.image"
              class="w-10 h-10 rounded-full" />
            <div class="ml-2">
              <h3 class="text-sm font-bold text-gray-900 dark:text-white">
                {{ whoToFollow.name }}
              </h3>
              <p class="text-xs text-gray-400">{{ whoToFollow.handle }}</p>
            </div>
          </div>
          <button :class="defaultTransition"
            class="h-max px-4 py-2 font-bold text-xs bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-gray-700 dark:hover:bg-gray-300"
            type="button">
            Follow
          </button>
        </div>
      </SidebarRightPreviewCardItem>
    </SidebarRightPreviewCard>
    <div>
      <ul class="mx-2 my-4 text-xs text-gray-500">
        <li class="inline-block mx-2">
          <a @click.prevent="handleToggleDarkMode" href="#" class="hover:underline">Dark mode</a>
        </li>
        <li class="inline-block mx-2">
          <a href="#" class="hover:underline">Privacy policy</a>
        </li>
        <li class="inline-block mx-2">
          <a href="#" class="hover:underline">Cookie policy</a>
        </li>
        <li class="inline-block mx-2">
          <a href="#" class="hover:underline">Accessability</a>
        </li>
        <li class="inline-block mx-2">
          <a href="#" class="hover:underline">Ads info</a>
        </li>
        <li class="inline-block mx-2">
          <a href="#" class="hover:underline">More</a>
        </li>
        <li class="inline-block mx-2">
          © {{ new Date().getFullYear() }} Twitter-Clone, Inc.
        </li>
      </ul>
    </div>
  </div>
</template>
