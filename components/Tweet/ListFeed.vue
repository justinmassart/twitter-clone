<script lang="ts" setup>
import type { TransformedTweet } from '~/shared/types';
import useTailwindConfig from '../composables/useTailwindConfig';

defineProps<{
    tweets: TransformedTweet[],
}>()

const { twitterBorderColor, defaultTransition } = useTailwindConfig()

function redirect(tweet: TransformedTweet) {
    navigateTo(`/status/${tweet.id}`)
}
</script>
<template>
    <div>
        <div v-if="tweets.length === 0" class="p-4">
            <p class="text-center text-gray-500">There are no tweets 😢</p>
        </div>
        <div v-else v-for="tweet in tweets" :key="tweet.id"
            class="pb-4 border-b hover:bg-gray-100 cursor-pointer dark:hover:bg-dim-300"
            :class="[twitterBorderColor, defaultTransition]">
            <TweetItem :tweet compact @click.native="redirect(tweet)" />
        </div>
    </div>
</template>