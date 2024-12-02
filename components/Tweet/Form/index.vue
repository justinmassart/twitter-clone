<script lang="ts" setup>
import useTweets from '~/components/composables/useTweets';
import type { TransformedTweet } from '~/shared/types';

const props = defineProps<{
    user: any;
    placeholder?: string;
    replyTo?: TransformedTweet;
}>()

const emits = defineEmits(['onSuccess'])
const { postTweet } = useTweets();
const loading = ref(false)


async function handleFormSubmit(data: {
    text: string;
    mediaFiles: [];
}) {
    loading.value = true
    try {
        const response = await postTweet({
            text: data.text,
            mediaFiles: data.mediaFiles,
            replyTo: props.replyTo?.id
        });
        emits('onSuccess', response.tweet)
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <form method="POST" enctype="multipart/form-data">
        <div v-if="loading" class="flex items-center justify-center py-6">
            <UISpinner />
        </div>
        <div v-else>
            <TweetFormInput :placeholder="placeholder" :user="user" @on-submit="handleFormSubmit" />
        </div>
    </form>
</template>