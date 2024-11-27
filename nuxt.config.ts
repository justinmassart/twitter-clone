// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  typescript: {
    typeCheck: true,
  },
  runtimeConfig: {
    jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SERCET,
    jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SERCET,
  },
  pages: true,
});
