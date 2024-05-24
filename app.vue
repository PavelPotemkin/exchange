<script setup lang="ts">
import { MainExchangeWidgetPage } from '~/src/ui'
import { useInitWidget } from '~/src/application/exchange'

const initExchangeWidget = useInitWidget()

const { pending, error } = await useAsyncData(async () => {
  await initExchangeWidget()
  return {}
})

const config = useRuntimeConfig()

useHead({
  title: 'Exchange C2F/F2C',
  link: [
    { rel: 'apple-touch-icon', sizes: '180x180', href: `${config.app.baseURL}apple-touch-icon.png` },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: `${config.app.baseURL}favicon-32x32.png` },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: `${config.app.baseURL}favicon-16x16.png` },
    { rel: 'manifest', href: `${config.app.baseURL}site.webmanifest` },
    { rel: 'mask-icon', href: `${config.app.baseURL}safari-pinned-tab.svg`, color: '#5bbad5' },
    { rel: 'icon', type: 'image/x-icon', href: `${config.app.baseURL}favicon.ico` },
  ],
  meta: [
    { name: 'msapplication-TileColor', content: '#da532c' },
    { name: 'theme-color', content: '#ffffff' },
  ],
})
</script>

<template>
  <div v-if="pending">
    loading
  </div>

  <div v-else-if="error">
    {{ error }}
  </div>

  <MainExchangeWidgetPage v-else />
</template>
