// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  typescript: {
    typeCheck: true,
  },
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
  },
  pages: true,
});
