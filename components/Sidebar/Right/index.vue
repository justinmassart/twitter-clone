<script lang="ts" setup>
import useTailwindConfig from "~/components/composables/useTailwindConfig";

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
</script>

<template>
  <div class="flex flex-col">
    <SidebarRightPreviewCard title="What’s happening">
      <SidebarRightPreviewCardItem
        v-for="whatsHappening in whatsHappeningItems"
      >
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
            <img
              :alt="`Profile picture of the user : ${whoToFollow.name}`"
              :src="whoToFollow.image"
              class="w-10 h-10 rounded-full"
            />
            <div class="ml-2">
              <h3 class="text-sm font-bold text-gray-900 dark:text-white">
                {{ whoToFollow.name }}
              </h3>
              <p class="text-xs text-gray-400">{{ whoToFollow.handle }}</p>
            </div>
          </div>
          <button
            :class="defaultTransition"
            class="h-max px-4 py-2 font-bold text-xs bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-gray-700 dark:hover:bg-gray-300"
            type="button"
          >
            Follow
          </button>
        </div>
      </SidebarRightPreviewCardItem>
    </SidebarRightPreviewCard>
  </div>
</template>
