<script lang="ts" setup>
import type { PropType } from 'vue';

const props = defineProps({
    type: {
        type: String as PropType<'button' | 'submit' | 'reset'>,
        default: 'button',
        validator: (value: string) => ['button', 'submit', 'reset'].includes(value)
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    size: {
        type: String as PropType<'sm' | "lg">,
        default: "md",
    },
    liquid: {
        type: Boolean,
        default: false
    }
})

const paddingClasses = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'px-2 py-3';
        case 'lg':
            return 'px-4 py-3';
        default:
            return 'px-3 py-3';
    }
})

const textFontSize = computed(() => {
    switch (props.size) {
        case 'lg':
            return 'text-md';
        default:
            return 'text-sm';
    }
})

const defaultWidth = computed(() => {
    switch (props.size) {
        default:
            return 'w-min';
    }
})

const classes = computed(() => `${paddingClasses.value} ${props.liquid ? 'w-full' : defaultWidth.value}`)
</script>

<template>
    <button :type="props.type"
        class="flex justify-center text-white bg-blue-400 rounded-full hover:bg-blue-500 font-sm disabled:bg-blue-300 disabled:cursor-not-allowed"
        :disabled="props.disabled" :class="classes">
        <span :class="textFontSize">
            <slot />
        </span>
    </button>
</template>