<script setup lang="ts">
import { useToInput } from './ToInput.hooks'
import { UiExchangeToken } from '~/src/shared/ui'

const disabled = ref(false)

const {
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
    :disabled="disabled"
    label="Вы получаете"
    placeholder="10 000"
    readonly
  />
</template>
