<script lang="ts" setup>
import type { TransformedTweet, TransformedUser, UserType } from '~/shared/types';

defineProps<{
    tweet: TransformedTweet;
    user: any;
}>()

function handleFormSuccess(tweet: TransformedTweet) {
    navigateTo({
        path: `/status/${tweet.id}`
    })
}
</script>

<template>
    <div>
        <TweetItem :tweet />
        <TweetForm :user placeholder="Tweet your reply !" :reply-to="tweet" @on-success="handleFormSuccess" />
        <TweetListFeed :tweets="tweet.replies ?? []" />
    </div>
</template>