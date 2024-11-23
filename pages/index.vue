<script lang="ts" setup>
const isLoading = ref(false);
</script>

<template>
  <div>
    <MainSection :loading="isLoading" title="Home"> Content </MainSection>
  </div>
</template>
