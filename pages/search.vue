<script lang="ts" setup>
import useTweets from '~/components/composables/useTweets';
import type { TransformedTweet } from '~/shared/types';

const { getTweets: getTweetsComposable } = useTweets()

const isLoading = ref(false)
const searchedTweets = ref<TransformedTweet[]>([])

const searchQuery = computed(() => useRoute().query.q)

watch(() => useRoute().fullPath, () => getTweets())

async function getTweets() {
    isLoading.value = true
    try {
        const { tweets } = await getTweetsComposable({
            q: searchQuery.value
        })
        searchedTweets.value = tweets
    } catch (error) {
        console.log(error)
    } finally {
        isLoading.value = false
    }
}

onBeforeMount(async () => {
    await getTweets()
})
</script>

<template>
    <div>
        <MainSection :loading="isLoading" title="Search">

            <Head>
                <Title>Search / Twitter</Title>
            </Head>
            <TweetListFeed :tweets="searchedTweets" />
        </MainSection>
    </div>
</template>
