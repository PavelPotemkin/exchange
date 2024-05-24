<script setup lang="ts">
import { useSwapButton } from './SwapButton.hooks'
import { UiIconArrowChangeVert } from '~/src/shared/ui'

const { onClick, outdated } = useSwapButton()
</script>

<template>
  <button
    class="main-exchange-widget-swap-button"
    type="button"
    :disabled="outdated"
    @click="onClick"
  >
    <UiIconArrowChangeVert
      width="20"
      height="20"
    />
  </button>
</template>

<style scoped lang="scss">
.main-exchange-widget-swap-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: $gap-xs;
  background-color: $surface-secondary;
}
</style>
