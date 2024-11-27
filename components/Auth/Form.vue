<script lang="ts" setup>
import useAuth from "~/components/composables/useAuth";

const data = reactive({
  username: "",
  password: "",
  loading: false,
});

async function handleLogin() {
  const { login } = useAuth();
  data.loading = true;
  try {
    await login({
      username: data.username,
      password: data.password,
    });
  } catch (e) {
    console.log(e);
  } finally {
    data.loading = false;
  }
}
</script>

<template>
  <form class="pt-5 space-y-6" method="POST" @submit.prevent="handleLogin">
    <UIInput v-model="data.username" label="Username" placeholder="@MyUsername"></UIInput>
    <UIInput v-model="data.password" label="Password" placeholder="••••••••••••••" type="password"></UIInput>
    <button type="submit">Submit</button>
  </form>
</template>
