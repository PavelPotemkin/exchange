<script setup lang="ts">
import { useSwapButton } from './SwapButton.hooks'

const { onClick } = useSwapButton()
</script>

<template>
  <button
    class="main-exchange-widget-swap-button"
    type="button"
    @click="onClick"
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.0059 13.4192L13.4192 15.8333L15.8334 13.4192"
        stroke="#676767"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.4167 4.16666L13.4167 15.8333"
        stroke="#676767"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.99426 6.58082L6.58093 4.16666L4.16676 6.58082"
        stroke="#676767"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.58333 15.8333L6.58333 4.16666"
        stroke="#676767"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
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
