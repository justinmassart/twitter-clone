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
  PencilIcon
} from "@heroicons/vue/24/outline";
import useTailwindConfig from "~/components/composables/useTailwindConfig";

const { defaultTransition } = useTailwindConfig()

const emits = defineEmits(['onTweet'])
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
  </div>
</template>