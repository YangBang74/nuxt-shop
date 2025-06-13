// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  pages: true,
  dir: {
    pages: 'pages',
    layouts: 'layouts',
    public: 'public',
  },
  modules: [
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/icon',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
  runtimeConfig: {
    TELEGRAM_BOT_ID: process.env.TELEGRAM_BOT_ID,
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  },
  fonts: {
    families: [{ name: 'Roboto', provider: 'google' }],
  },
  nitro: {
    prerender: { routes: ['/'] },
  },
  css: ['~/assets/style.css'],
});
