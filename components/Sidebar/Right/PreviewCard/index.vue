<script lang="ts" setup>
import useTailwindConfig from "~/components/composables/useTailwindConfig";

const { twitterBorderColor, defaultTransition } = useTailwindConfig();

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div
    :class="twitterBorderColor"
    class="m-2 border bg-gray-50 dark:bg-dim-700 rounded-2xl overflow-hidden"
  >
    <h2
      :class="twitterBorderColor"
      class="p-3 text-xl font-extrabold text-gray-900 border-b dark:text-white"
    >
      {{ props.title }}
    </h2>
    <slot></slot>
    <div
      :class="defaultTransition"
      class="p-3 text-sm text-blue-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-dim-300"
    >
      Show more
    </div>
  </div>
</template>
