<script lang="ts" setup>
import {
    ChatBubbleOvalLeftEllipsisIcon,
    ArrowPathRoundedSquareIcon,
    HeartIcon,
    ArrowUpTrayIcon,
} from "@heroicons/vue/24/outline";
import type { TransformedTweet } from "~/shared/types";

defineProps<{
    tweet: TransformedTweet;
}>()
</script>

<template>
    <div class="flex items-center justify-around w-full">
        <TweetItemActionsIcon color="blue">
            <template v-slot:icon="{ classes }">
                <ChatBubbleOvalLeftEllipsisIcon :class="classes" />
            </template>
            <template v-slot:count>
                {{ tweet.repliesCount }}
            </template>
        </TweetItemActionsIcon>
        <TweetItemActionsIcon color="green">
            <template v-slot:icon="{ classes }">
                <ArrowPathRoundedSquareIcon :class="classes" />
            </template>
            <template v-slot:count>
                {{ Math.floor(Math.random() * 1000) }}
            </template>
        </TweetItemActionsIcon>
        <TweetItemActionsIcon color="red">
            <template v-slot:icon="{ classes }">
                <HeartIcon :class="classes" />
            </template>
            <template v-slot:count>
                {{ Math.floor(Math.random() * 1000) }}
            </template>
        </TweetItemActionsIcon>
        <TweetItemActionsIcon color="blue">
            <template v-slot:icon="{ classes }">
                <ArrowUpTrayIcon :class="classes" />
            </template>
            <template v-slot:count>
                {{ Math.floor(Math.random() * 1000) }}
            </template>
        </TweetItemActionsIcon>
    </div>
</template>