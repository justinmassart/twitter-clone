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
  <div class="flex flex-col w-full">
    <div class="flex justify-center">
      <div class="w-10 h-10">
        <LogoTwitter />
      </div>
    </div>
    <form class="pt-5 space-y-6 w-full" method="POST" @submit.prevent="handleLogin">
      <UIInput v-model="data.username" label="Username" placeholder="@MyUsername"></UIInput>
      <UIInput v-model="data.password" label="Password" placeholder="••••••••••••••" type="password"></UIInput>
      <UIButton liquid :disabled="!data.username || !data.password || data.loading" type="submit">
        Login
      </UIButton>
    </form>
  </div>
</template>
