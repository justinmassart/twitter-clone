<script lang="ts" setup>
import useTailwindConfig from '~/components/composables/useTailwindConfig';
import type { TransformedTweet } from '~/shared/types';

const { twitterBorderColor } = useTailwindConfig()

defineProps<{
    tweet: TransformedTweet
}>()
</script>

<template>
    <div>
        <TweetItemHeader :tweet="tweet" />
        <div class="ml-16">
            <p class="flex-shrink w-auto font-medium text-gray-800 dark:text-white">{{ tweet.text }}</p>
            <div v-for="(image, index) in tweet.mediaFiles" :key="`${tweet.id}_${index}`"
                class="flex my-3 mr-2 border-2 rounded-2xl overflow-hidden" :class="twitterBorderColor">
                <img :src="image.url" alt="" class="w-full">
            </div>
            <div class="mt-2">
                <TweetItemActions :tweet />
            </div>
        </div>
    </div>
</template>