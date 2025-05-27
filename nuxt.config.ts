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
  modules: ['@nuxt/fonts', '@nuxt/image', '@nuxt/ui', '@nuxt/icon', '@nuxtjs/tailwindcss'],
  fonts: {
    defaults: { weights: [400, 700], styles: ['normal'] },
    families: [{ name: 'Roboto', provider: 'google' }],
    provider: 'google',
    assets: { prefix: '/_fonts/' },
  },
  nitro: {
    prerender: { routes: ['/'] },
  },
});
