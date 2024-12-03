<script lang="ts" setup>
import useAuth from '~/components/composables/useAuth';
import useTailwindConfig from '~/components/composables/useTailwindConfig';
import useTweets from '~/components/composables/useTweets';
import type { TransformedTweet } from '~/shared/types';

const { useAuthUser } = useAuth()
const { twitterBorderColor } = useTailwindConfig()
const { getHomeTweets } = useTweets()

const user: Record<string, any> = useAuthUser()
const isLoading = ref(false)
const homeTweets = ref<TransformedTweet[]>([])

function handleFormSuccess(tweet: TransformedTweet) {
  navigateTo({
    path: `/status/${tweet.id}`
  })
}

onBeforeMount(async () => {
  isLoading.value = true
  try {
    const { tweets } = await getHomeTweets()
    homeTweets.value = tweets
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div>
    <MainSection :loading="isLoading" title="Home">

      <Head>
        <Title>Home / Twitter</Title>
      </Head>
      <div class="border-b" :class="twitterBorderColor">
        <TweetForm :user="user" @on-success="handleFormSuccess" />
      </div>
      <TweetListFeed :tweets="homeTweets" />
    </MainSection>
  </div>
</template>
