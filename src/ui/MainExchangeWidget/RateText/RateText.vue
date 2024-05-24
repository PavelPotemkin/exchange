<script setup lang="ts">
import { useRateText } from './RateText.hooks'
import { UiDisabledGradient } from '~/src/shared/ui'

const { rateText } = useRateText()
</script>

<template>
  <UiDisabledGradient
    v-if="false"
    :width="180"
    :height="20"
  />

  <div
    v-else
    class="main-exchange-widget-rate-text"
  >
    <span>{{ `1 ${rateText.from}` }}</span>
    <span>~</span>
    <span>{{ `${rateText.rate} ${rateText.to}` }}</span>
  </div>
</template>

<style scoped lang="scss">
.main-exchange-widget-rate-text {
  display: flex;
  gap: $gap-2xs;
  color: $text-secondary;
  @include label-medium;
}
</style>
