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
