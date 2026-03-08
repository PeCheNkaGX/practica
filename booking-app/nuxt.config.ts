// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  css: [],
  typescript: {
    strict: false,
    typeCheck: false
  },
  compatibilityDate: '2025-03-01'
})