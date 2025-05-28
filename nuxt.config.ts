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
  fonts: {
    families: [{ name: 'Roboto', provider: 'google' }],
  },
  nitro: {
    prerender: { routes: ['/'] },
  },
  css: ['~/assets/style.css'],
});
