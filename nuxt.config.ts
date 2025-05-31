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
  runtimeConfig: {
    TELEGRAM_BOT_ID: process.env.TELEGRAM_BOT_ID,
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  },

  fonts: {
    families: [{ name: 'Montserrat', provider: 'google' }],
  },
  nitro: {
    prerender: { routes: ['/'] },
  },
  css: ['~/assets/style.css'],
});
