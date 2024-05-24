<script setup lang="ts">
import { useDealButton } from './DealButton.hooks'
import { UiButton } from '~/src/shared/ui'

const { onClick, outdated } = useDealButton()
</script>

<template>
  <UiButton
    text="Начать сделку"
    :disabled="outdated"
    @click="onClick"
  />
</template>
