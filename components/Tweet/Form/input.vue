<script lang="ts" setup>
import useTailwindConfig from '~/components/composables/useTailwindConfig';
import type { UserType } from '~/shared/types';

const props = defineProps<{
    user: UserType;
    placeholder?: string;
}>();
const emits = defineEmits(['onSubmit']);

const { twitterBorderColor } = useTailwindConfig();

const text = ref<string>('');
const imageInput = ref();
const selectedFile = ref<File | null>(null);
const inputImageUrl = ref<string | null>(null);

function handleSubmit() {
    emits('onSubmit', {
        text: text.value,
        mediaFiles: [selectedFile.value]
    })
}

function handleImageInput() {
    imageInput.value.click()
}

function handleImageChange(event: any) {
    const file = event?.target?.files[0];
    selectedFile.value = file;

    const reader = new FileReader()
    reader.onload = (event) => {
        inputImageUrl.value = event.target?.result as string;
    }
    reader.readAsDataURL(file)
}
</script>

<template>
    <div>
        <div class="flex items-center flex-shrink-0 p-4 pb-0">
            <div class="flex w-12 items-top">
                <img :src="user.avatar ?? 'https://picsum.photos/200/200'" alt=""
                    class="inline-block w-10 h-10 rounded-full">
            </div>
            <div class="w-full p-2">
                <textarea v-model="text"
                    class="w-full min-h-10 h-10 text-lg text-gray-900 placeholder:text-gray-400 bg-transparent border-0 dark:text-white focus:ring-0 overflow-hidden"
                    :placeholder="placeholder ?? 'What’s new ?'"></textarea>
            </div>
        </div>
        <div class="p-4 pl-16">
            <img v-if="inputImageUrl" :src="inputImageUrl" alt="" class="rounded-2xl border"
                :class="twitterBorderColor">
            <input ref="imageInput" type="file" hidden accept="image/png,image/jpg,image/jpeg,image/gif"
                @change="handleImageChange">
        </div>
        <div class="flex p-2 pl-14">
            <div class="flex items-center w-full text-white">
                <div class="p-2 text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-dim-800 cursor-pointer"
                    @click="handleImageInput">
                    <svg viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor">
                        <g>
                            <path
                                d="M19.75 2H4.25C3.01 2 2 3.01 2 4.25v15.5C2 20.99 3.01 22 4.25 22h15.5c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2zM4.25 3.5h15.5c.413 0 .75.337.75.75v9.676l-3.858-3.858c-.14-.14-.33-.22-.53-.22h-.003c-.2 0-.393.08-.532.224l-4.317 4.384-1.813-1.806c-.14-.14-.33-.22-.53-.22-.193-.03-.395.08-.535.227L3.5 17.642V4.25c0-.413.337-.75.75-.75zm-.744 16.28l5.418-5.534 6.282 6.254H4.25c-.402 0-.727-.322-.744-.72zm16.244.72h-2.42l-5.007-4.987 3.792-3.85 4.385 4.384v3.703c0 .413-.337.75-.75.75z">
                            </path>
                            <circle cx="8.868" cy="8.309" r="1.542"></circle>
                        </g>
                    </svg>
                </div>
            </div>
            <div class="ml-auto">
                <UIButton size="sm" @click="handleSubmit" :disabled="text.length === 0">
                    <span class="font-bold">Tweet</span>
                </UIButton>
            </div>
        </div>
    </div>
</template>