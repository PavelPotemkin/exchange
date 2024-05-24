<script setup lang="ts">
import { MainExchangeWidgetCard } from '../Card'
import { MainExchangeWidgetOutdatedToast } from '../OutdatedToast'
import { usePage } from './Page.hooks'

usePage()
</script>

<template>
  <div class="main-exchange-widget-page">
    <MainExchangeWidgetCard />

    <MainExchangeWidgetOutdatedToast
      class="main-exchange-widget-page__toast"
    />
  </div>
</template>

<style scoped lang="scss">
.main-exchange-widget-page {
  position: relative;
  display: flex;
  justify-content: center;
  padding: 90px 16px;
  min-height: 100vh;

  &__toast {
    position: absolute;
    left: 24px;
    bottom: 12px;
    right: 24px;
    z-index: 10;
  }
}
</style>
