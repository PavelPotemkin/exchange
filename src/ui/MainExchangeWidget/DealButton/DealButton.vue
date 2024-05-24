<script setup lang="ts">
import { useDealButton } from './DealButton.hooks'
import { UiButton } from '~/src/shared/ui'

const { onClick } = useDealButton()
</script>

<template>
  <UiButton
    text="Начать сделку"
    @click="onClick"
  />
</template>
