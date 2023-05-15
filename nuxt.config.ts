// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    shim: false
  },
  app: {
    head: {
      htmlAttrs: { lang: "de" },
      meta: [
        // { charset: "utf-8" },
        // { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "msapplication-TileColor", content: "#2d89ef" },
        { name: "msapplication-config", content: "/browserconfig.xml" },
        { name: "theme-color", content: "#ffffff" },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/img/icons/favicon.ico' },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/img/icons/apple-touch-icon.png" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/img/icons/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/img/icons/favicon-16x16.png" },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "mask-icon", href: "/img/icons/safari-pinned-tab.svg", color: "#5bbad5" },
        { rel: "shortcut icon", href: "/img/icons/favicon.ico" },
      ],
    },
  },
  css: [
    '@/assets/css/styles.scss'
  ],
})
