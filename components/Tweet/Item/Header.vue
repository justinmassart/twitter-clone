<script lang="ts" setup>
import type { TransformedTweet } from '~/shared/types';

defineProps<{
    tweet: TransformedTweet
}>()

</script>

<template>
    <div class="p-4">
        <div class="flex items-center">
            <img :src="tweet.author.avatar ?? ''" :alt="`Profile picture of ${tweet.author.name}`"
                class="w-10 h-10 rounded-full">
            <span class="ml-3 font-medium text-gray-800 dark:text-white">{{ tweet.author.name }}</span>
            <span class="ml-3 flex gap-3 items-center text-sm font-medium text-gray-400 dark:text-white">
                <NuxtLink to="#">{{ tweet.author.handle }}</NuxtLink>
                {{ tweet.postedAtHuman }}
            </span>
        </div>
        <div class="ml-12" v-if="tweet.replyTo">
            <p class="text-sm">
                <span class="text-gray-500">
                    Replying to :
                </span>
                <NuxtLink :to="`/status/${tweet.replyTo.id}`" class="text-blue-400">
                    {{ tweet.replyTo.author.handle }}
                </NuxtLink>
            </p>
        </div>
    </div>
</template>