<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: "text",
  },
});
const emits = defineEmits(["update:modelValue"]);
</script>

<template>
  <div>
    <label
      v-if="props.label"
      class="block pl-3 ml-px text-sm font-medium text-gray-700"
      for=""
      >{{ props.label }}</label
    >
    <input
      :placeholder="props.placeholder"
      :type="props.type"
      :value="props.modelValue"
      class="block px-4 w-full border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      @input="
        (event) =>
          emits('update:modelValue', (event.target as HTMLInputElement).value)
      "
    />
  </div>
</template>
