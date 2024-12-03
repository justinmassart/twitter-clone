<script lang="ts" setup>
import useAuth from "~/components/composables/useAuth";
import type { TransformedTweet } from "./shared/types";
import useTweets from "./components/composables/useTweets";
import useEmitter from "./components/composables/useEmitter";
const { useAuthUser, initAuth, useAuthLoading } = useAuth();
const { closePostTweetModal, usePostTweetModal, openPostTweetModal, useReplyTweet } = useTweets()

const darkMode = ref(false);
const isLoading = useAuthLoading();
const user = useAuthUser();
const postTweetModal = usePostTweetModal();
const emitter = useEmitter()
const replyTweet = useReplyTweet()

emitter.$on('replyTweet', (tweet: any) => {
  openPostTweetModal(tweet)
})

function handleFormSuccess(tweet: TransformedTweet) {
  closePostTweetModal()
  navigateTo({
    path: `/status/${tweet.id}`
  })
}

function handleModalClose() {
  closePostTweetModal()
}

function handleOpenTweetModal() {
  openPostTweetModal(null)
}

onBeforeMount(() => {
  initAuth();
})
</script>

<template>
  <div :class="{ dark: darkMode }">
    <div class="bg-white dark:bg-dim-900">
      <LoadingPage v-if="isLoading" />
      <div v-else-if="user" class="min-h-full">
        <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">
          <div class="hidden md:block xs-col-span-1 xl:col-span-2">
            <div class="sticky top-0">
              <SidebarLeft @on-tweet="handleOpenTweetModal" />
            </div>
          </div>
          <main class="col-span-12 md:col-span-8 xl:col-span-6">
            <NuxtPage />
          </main>
          <div class="hidden md:block xl:col-span-4 md:col-span-3">
            <div class="sticky top-0">
              <SidebarRight />
            </div>
          </div>
        </div>
      </div>
      <AuthPage v-else />
      <UIModal v-if="user" :isOpen="postTweetModal" @on-close="handleModalClose">
        <TweetForm :user :reply-to="replyTweet" showReply @on-success="handleFormSuccess" />
      </UIModal>
    </div>
  </div>
</template>
