<script setup lang="ts">
import { useToInput } from './ToInput.hooks'
import { UiExchangeToken } from '~/src/shared/ui'

const {
  outdated,
  amount,
  activeIdModel,
  toCurrenciesOptions,
} = useToInput()
</script>

<template>
  <UiExchangeToken
    v-model:active-id="activeIdModel"
    :amount="amount"
    :options="toCurrenciesOptions"
    :disabled="outdated"
    label="Вы получаете"
    placeholder="~0"
    readonly
  />
</template>
