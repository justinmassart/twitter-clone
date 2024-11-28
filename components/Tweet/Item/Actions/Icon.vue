<script lang="ts" setup>
import useTailwindConfig from "~/components/composables/useTailwindConfig";

const { defaultTransition } = useTailwindConfig()

defineProps<{
    color: string;
}>()
</script>

<template>
    <div class="flex items-center text-gray-400 cursor-pointer group">
        <div
            :class="`p-2 group-hover:bg-${color}-100 group-hover:text-${color}-400 rounded-full dark:group-hover:bg-opacity-20 ${defaultTransition}`">
            <slot name="icon" classes="w-5 h-5" />
        </div>
        <span :class="`ml-1 group-hover:text-${color}-400`">
            <slot name="count" />
        </span>
    </div>
</template>