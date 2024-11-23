<script lang="ts" setup>
import useTailwindConfig from "~/components/composables/useTailwindConfig";

const { defaultTransition, twitterBorderColor } = useTailwindConfig();
const wrapperClasses = computed(
  () => `${defaultTransition} ${twitterBorderColor}`,
);
</script>

<template>
  <div
    :class="wrapperClasses"
    class="p-3 hover:bg-gray-100 cursor-pointer dark:hover:bg-dim-300 border-b"
  >
    <slot></slot>
  </div>
</template>
