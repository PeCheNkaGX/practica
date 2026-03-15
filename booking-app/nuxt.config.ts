export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  css: [
    'vuetify/lib/styles/main.css',
    '@mdi/font/css/materialdesignicons.min.css'
  ],
  build: {
    transpile: ['vuetify']
  },
  typescript: {
    strict: false,
    typeCheck: false
  },
  vite: {
    optimizeDeps: {
      include: ['vuetify']
    }
  },
  compatibilityDate: '2025-03-01'
})