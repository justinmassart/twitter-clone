<script lang="ts" setup>
import { HomeIcon } from "@heroicons/vue/24/solid";
import {
  BellIcon,
  BookmarkIcon,
  DocumentTextIcon,
  EllipsisHorizontalCircleIcon,
  HashtagIcon,
  InboxIcon,
  UserIcon,
  PencilIcon,
  ChevronDownIcon
} from "@heroicons/vue/24/outline";
import useTailwindConfig from "~/components/composables/useTailwindConfig";

const emits = defineEmits(['onTweet', 'onLogout'])
defineProps({
  user: {
    type: Object,
    required: true,
  }
})

const { defaultTransition } = useTailwindConfig()
const authMenuOpen = ref(false)
</script>

<template>
  <div class="h-screen flex flex-col">
    <div :class="defaultTransition" class="p-2 my-2 rounded-full hover:bg-blue-50 w-min dark:hover:bg-white/20">
      <nuxt-link class="w-full h-full" to="/">
        <div class="w-8 h-8">
          <LogoTwitter />
        </div>
      </nuxt-link>
    </div>
    <div class="mt-2 space-y-3">
      <SidebarLeftTab active>
        <template v-slot:icon>
          <HomeIcon />
        </template>
        <template v-slot:name>Home</template>
      </SidebarLeftTab>
      <SidebarLeftTab>
        <template v-slot:icon>
          <HashtagIcon />
        </template>
        <template v-slot:name>Explore</template>
      </SidebarLeftTab>
      <SidebarLeftTab>
        <template v-slot:icon>
          <BellIcon />
        </template>
        <template v-slot:name>Notifications</template>
      </SidebarLeftTab>
      <SidebarLeftTab>
        <template v-slot:icon>
          <InboxIcon />
        </template>
        <template v-slot:name>Messages</template>
      </SidebarLeftTab>
      <SidebarLeftTab>
        <template v-slot:icon>
          <BookmarkIcon />
        </template>
        <template v-slot:name>Bookmarks</template>
      </SidebarLeftTab>
      <SidebarLeftTab>
        <template v-slot:icon>
          <DocumentTextIcon />
        </template>
        <template v-slot:name>Lists</template>
      </SidebarLeftTab>
      <SidebarLeftTab>
        <template v-slot:icon>
          <UserIcon />
        </template>
        <template v-slot:name>Profile</template>
      </SidebarLeftTab>
      <SidebarLeftTab>
        <template v-slot:icon>
          <EllipsisHorizontalCircleIcon />
        </template>
        <template v-slot:name>More</template>
      </SidebarLeftTab>
      <div class="hidden xl:block">
        <UIButton liquid size="lg" @click="emits('onTweet')">
          <span class="font-bold">Tweet</span>
        </UIButton>
      </div>
      <div class="block xl:hidden">
        <UIButton @click="emits('onTweet')">
          <div class="w-6 h-6 font-bold">
            <PencilIcon />
          </div>
        </UIButton>
      </div>
    </div>
    <div @mouseleave="authMenuOpen = false"
      class="flex flex-row items-center justify-between px-2 py-2 w-full mt-auto mb-5 rounded-full hover:bg-gray-100 dark:hover:bg-dim-800 relative"
      :class="defaultTransition">
      <div @click="authMenuOpen = !authMenuOpen"
        class="flex flex-row items-center justify-between w-full cursor-pointer">
        <img :src="user.avatar ?? '/'" alt="" class="w-10 h-10 rounded-full">
        <div class="flex-col hidden ml-2 xl:block">
          <p class="text-sm font-bold text-gray-800 dark:text-white">{{ user.username }}</p>
          <p class="text-sm text-gray-400">{{ user.handle }}</p>
        </div>
        <div class="hidden ml-auto xl:block">
          <ChevronDownIcon class="w-6 h-6" />
        </div>
      </div>
      <ul v-if="authMenuOpen"
        class="absolute left-0 right-0 bottom-0 bg-gray-100 rounded-2xl border flex flex-col gap-2 overflow-hidden">
        <li @click="emits('onLogout')" class="p-2 cursor-pointer hover:bg-gray-200">Logout</li>
      </ul>
    </div>
  </div>
</template>