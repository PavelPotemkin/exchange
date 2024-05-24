<script setup lang="ts">
import { MainExchangeWidgetTimer } from './Timer'
import { MainExchangeWidgetDetails } from './Details'
import { MainExchangeWidgetRateText } from './RateText'
import { MainExchangeWidgetSwapButton } from './SwapButton'
import { MainExchangeWidgetDealButton } from './DealButton'
import { MainExchangeWidgetFromInput } from './FromInput'
import { MainExchangeWidgetToInput } from './ToInput'
</script>

<template>
  <div class="main-exchange-widget">
    <MainExchangeWidgetTimer />

    <MainExchangeWidgetFromInput />

    <div class="main-exchange-widget__rate-and-button">
      <MainExchangeWidgetRateText />

      <MainExchangeWidgetSwapButton />
    </div>

    <MainExchangeWidgetToInput />

    <MainExchangeWidgetDetails />

    <MainExchangeWidgetDealButton />
  </div>
</template>

<style scoped lang="scss">
.main-exchange-widget {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: $gap-xl;
  padding: $padding-3xl;
  background-color: $surface-main;
  border-radius: $radius-xl;
  box-shadow:
    0px 4px 20px 0px #2020200D,
    inset 0px 0px 0px 1px $border-border;

  &__rate-and-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
