<script lang="ts" setup>
import useAuth from '~/components/composables/useAuth';
import useTweets from '~/components/composables/useTweets';

const isLoading = ref(false)
const { getTweetById } = useTweets()
const { useAuthUser } = useAuth()
const user = useAuthUser()

watch(() => useRoute().fullPath, () => getTweet())

const tweet = ref()

function getTweetIdFromRoute(): string {
    return useRoute().params.id as string
}

async function getTweet() {
    isLoading.value = true
    try {
        const response = await getTweetById(getTweetIdFromRoute())
        tweet.value = response.tweet
    } catch (error) {
        console.log(error);

    } finally {
        isLoading.value = false
    }
}

onBeforeMount(() => {
    getTweet()
})
</script>

<template>
    <div>
        <MainSection :loading="isLoading" title="Home">

            <Head>
                <Title>Status / Twitter</Title>
            </Head>

            <TweetDetails :user :tweet />
        </MainSection>
    </div>
</template>