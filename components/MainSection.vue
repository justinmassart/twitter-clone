<script lang="ts" setup>
import useTailwindConfig from "~/components/composables/useTailwindConfig";

const { twitterBorderColor } = useTailwindConfig();
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <div :class="twitterBorderColor" class="border-x">
    <h1
      class="sticky top-0 px-4 py-3 text-xl font-bold text-gray-800 dark:text-gray-100 bg-white/80 backdrop-blur-md dark:bg-dim-900/80"
    >
      {{ props.title }}
    </h1>
    <div
      v-if="props.loading"
      :class="twitterBorderColor"
      class="flex items-center justify-center p-4 border-b"
    >
      <UISpinner />
    </div>
    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>
