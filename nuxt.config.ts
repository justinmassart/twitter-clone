// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  typescript: {
    typeCheck: true,
  },
  build: {
    transpile: ["@heroicons/vue"],
  },
  runtimeConfig: {
    jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SERCET,
    jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SERCET,
    cldCloudName: process.env.CLD_CLOUD_NAME,
    cldApiKey: process.env.CLD_API_KEY,
    cldApiSecret: process.env.CLD_API_SECRET,
    cldApiEnv: process.env.CLD_API_ENV,
  },
  pages: true,
});
