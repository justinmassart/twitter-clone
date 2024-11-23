<template>
  <nuxt-link
    :class="defaultTransition"
    class="flex items-center p-3 w-min text-black hover:bg-gray-200 dark:hover:bg-dim-200 dark:text-white rounded-full"
    to="#"
  >
    <div class="w-6 h-6 text-dark">
      <slot name="icon"></slot>
    </div>
    <div :class="textClasses" class="ml-4 text-xl hidden xl:block">
      <slot name="name"></slot>
    </div>
  </nuxt-link>
</template>
<script lang="ts" setup>
import useTailwindConfig from "~/components/composables/useTailwindConfig";

const { defaultTransition } = useTailwindConfig();
const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});
const textClasses = computed(() =>
  props.active ? "font-semibold" : "font-normal",
);
</script>
