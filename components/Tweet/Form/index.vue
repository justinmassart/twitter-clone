<script lang="ts" setup>
import useTweets from '~/components/composables/useTweets';

const props = defineProps({
    user: {
        type: Object,
        required: true,
    }
})

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
            mediaFiles: data.mediaFiles
        });
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
            <TweetFormInput :user="props.user" @on-submit="handleFormSubmit" />
        </div>
    </form>
</template>