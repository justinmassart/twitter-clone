<script lang="ts" setup>
import type { PropType } from 'vue';
import useTailwindConfig from '~/components/composables/useTailwindConfig';
import type { TransformedTweet } from '~/shared/types';

const { twitterBorderColor } = useTailwindConfig()

const props = defineProps({
    tweet: {
        type: Object as PropType<TransformedTweet>,
        required: true,
    },
    compact: {
        type: Boolean,
        required: false,
        default: false,
    }
})

const tweetBodyWrapper = computed(() => props.compact ? 'ml-16' : 'ml-2')
const textSize = computed(() => props.compact ? 'text-base' : 'text-2xl')
</script>

<template>
    <div>
        <TweetItemHeader :tweet="tweet" />
        <div :class="tweetBodyWrapper">
            <p class="flex-shrink w-auto font-medium text-gray-800 dark:text-white" :class="textSize">{{ tweet.text }}
            </p>
            <div v-for="(image, index) in tweet.mediaFiles" :key="`${tweet.id}_${index}`"
                class="flex my-3 mr-2 border-2 rounded-2xl overflow-hidden" :class="twitterBorderColor">
                <img :src="image.url" alt="" class="w-full">
            </div>
            <div class="mt-2 relative z-50">
                <TweetItemActions :tweet :compact="compact" />
            </div>
        </div>
    </div>
</template>