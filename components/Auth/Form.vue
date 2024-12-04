<script lang="ts" setup>
import useAuth from "~/components/composables/useAuth";

const data = reactive({
  loginUsername: "",
  loginPassword: "",
  registerUsername: "",
  registerPassword: "",
  registerEmail: "",
  registerName: "",
  registerConfirmPassword: "",
  loading: false,
});
const displayLoginForm = ref(true)

async function handleLogin() {
  const { login } = useAuth();
  data.loading = true;
  try {
    await login({
      username: data.loginUsername,
      password: data.loginPassword,
    });
  } catch (e) {
    console.log(e);
  } finally {
    data.loading = false;
  }
}

async function handleRegister() {
  const { register } = useAuth();
  data.loading = true;
  try {
    await register({
      username: data.registerUsername,
      email: data.registerEmail,
      password: data.registerPassword,
      confirmPassword: data.registerConfirmPassword,
      name: data.registerName,
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
    <div class="flex flex-col items-center justify-center">
      <div class="w-10 h-10">
        <LogoTwitter />
      </div>
      <h1 class="pt-4 text-xl font-bold text-gray-800 dark:text-white">{{ displayLoginForm ? 'Login' : 'Register' }}
      </h1>
    </div>
    <form v-if="displayLoginForm" class="pt-5 space-y-6 w-full" method="POST" @submit.prevent="handleLogin">
      <UIInput v-model="data.loginUsername" label="Username" placeholder="MyUsername" />
      <UIInput v-model="data.loginPassword" label="Password" placeholder="••••••••••••••" type="password" />
      <p @click="displayLoginForm = false" class="text-gray-400 hover:text-gray-800">Don’t have an account yet ? <span
          class="cursor-pointer hover:underline">Register
          here</span>
      </p>
      <UIButton liquid :disabled="!data.loginUsername || !data.loginPassword || data.loading" type="submit">
        Login
      </UIButton>
    </form>
    <form v-else class="pt-5 space-y-6 w-full" method="POST" @submit.prevent="handleRegister">
      <UIInput v-model="data.registerUsername" label="Username" placeholder="johndoe" />
      <UIInput v-model="data.registerEmail" label="Email" placeholder="john@doe.com" type="email" />
      <UIInput v-model="data.registerName" label="Name" placeholder="John Doe" />
      <UIInput v-model="data.registerPassword" label="Password" placeholder="••••••••••••••" type="password" />
      <UIInput v-model="data.registerConfirmPassword" label="Confirm Password" placeholder="••••••••••••••"
        type="password" />
      <p @click="displayLoginForm = true" class="text-gray-400 hover:text-gray-800">Already have an account ? <span
          class="cursor-pointer hover:underline">Login here</span>
      </p>
      <UIButton liquid :disabled="!data.registerUsername || !data.registerPassword || data.loading" type="submit">
        Register
      </UIButton>
    </form>
  </div>
</template>
