<script setup lang="ts">
import { useFromInput } from './FromInput.hooks'
import { UiExchangeToken } from '~/src/shared/ui'

const {
  outdated,
  activeIdModel,
  amountModel,
  fromCurrenciesOptions,
  errorMinLimitText,
} = useFromInput()
</script>

<template>
  <UiExchangeToken
    v-model:active-id="activeIdModel"
    v-model:amount="amountModel"
    :options="fromCurrenciesOptions"
    :disabled="outdated"
    label="Вы отправляете"
    placeholder="10 000"
  >
    <template
      v-if="errorMinLimitText"
      #error
    >
      Минимальная сумма: <span class="main-exchange-widget-to-input-error-sum">{{ errorMinLimitText }}</span>
    </template>
  </UiExchangeToken>
</template>

<style scoped lang="scss">
.main-exchange-widget-to-input-error-sum {
  text-decoration: underline;
}
</style>
