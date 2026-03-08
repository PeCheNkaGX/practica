
export default defineNuxtConfig({
  devtools: { enabled: true },
  

  modules: [
    '@pinia/nuxt',
  ],
  

  css: [
    'vuetify/lib/styles/main.css',
    '@mdi/font/css/materialdesignicons.min.css'
  ],
  

  build: {
    transpile: ['vuetify'],
  },
  

  typescript: {
    strict: true,
    typeCheck: true
  },
  
  
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || '/api'
    }
  },
  
  compatibilityDate: '2025-03-01'
})