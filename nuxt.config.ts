export default defineNuxtConfig({
  devtools: { enabled: true },
  telemetry: false,
  css: ['~/src/shared/assets/style/index.scss'],
  runtimeConfig: {
    public: {
      apiBase: '',
    },
  },
  ssr: false,
  app: {
    head: {
      title: 'Exchange C2F/F2C',
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' },
      ],
      meta: [
        { name: 'msapplication-TileColor', content: '#da532c' },
        { name: 'theme-color', content: '#ffffff' },
      ],
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/src/shared/assets/style/_variables.scss" as *;
            @use "~/src/shared/assets/style/_mixins.scss" as *;
          `,
        },
      },
    },
  },
  modules: ['@nuxtjs/google-fonts', '@pinia/nuxt'],
  googleFonts: {
    families: {
      Manrope: {
        wght: [400, 500, 600, 700],
      },
    },
  },
})
