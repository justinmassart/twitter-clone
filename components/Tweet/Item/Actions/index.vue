<script lang="ts" setup>
import {
    ChatBubbleOvalLeftEllipsisIcon,
    ArrowPathRoundedSquareIcon,
    HeartIcon,
    ArrowUpTrayIcon,
} from "@heroicons/vue/24/outline";
import type { TransformedTweet } from "~/shared/types";

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

const emits = defineEmits(['onCommentClick'])

const size = computed(() => props.compact ? 5 : 8)
</script>

<template>
    <div class="flex items-center justify-around w-full">
        <TweetItemActionsIcon @on-click="emits('onCommentClick')" color="blue" :size>
            <template v-slot:icon="{ classes }">
                <ChatBubbleOvalLeftEllipsisIcon :class="classes" />
            </template>
            <template v-if="compact" v-slot:count>
                {{ tweet.repliesCount }}
            </template>
        </TweetItemActionsIcon>
        <TweetItemActionsIcon color="green" :size>
            <template v-slot:icon="{ classes }">
                <ArrowPathRoundedSquareIcon :class="classes" />
            </template>
            <template v-if="compact" v-slot:count>
                {{ Math.floor(Math.random() * 1000) }}
            </template>
        </TweetItemActionsIcon>
        <TweetItemActionsIcon color="red" :size>
            <template v-slot:icon="{ classes }">
                <HeartIcon :class="classes" />
            </template>
            <template v-if="compact" v-slot:count>
                {{ Math.floor(Math.random() * 1000) }}
            </template>
        </TweetItemActionsIcon>
        <TweetItemActionsIcon color="blue" :size>
            <template v-slot:icon="{ classes }">
                <ArrowUpTrayIcon :class="classes" />
            </template>
            <template v-if="compact" v-slot:count>
                {{ Math.floor(Math.random() * 1000) }}
            </template>
        </TweetItemActionsIcon>
    </div>
</template>