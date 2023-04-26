// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    shim: false
  },
  app: {
    head: {
      htmlAttrs: { lang: "de" },
    },
  },
  css: [
    '@/assets/css/styles.scss'
  ],
})
