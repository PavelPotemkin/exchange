<script setup lang="ts" generic="T extends string">
import type { ExchangeTokenOption } from './ExchangeToken.types'
import ExchangeTokenValue from './ExchangeTokenValue.vue'
import ExchangeTokenDropdown from './ExchangeTokenDropdown.vue'

defineProps<{
  options: Array<ExchangeTokenOption>
  label: string
  placeholder: string
  disabled: boolean
  readonly?: boolean
}>()

const amount = defineModel<number | null>('amount', {
  required: true,
})

const activeId = defineModel<T>('activeId', {
  required: true,
})

defineSlots<{
  error(): any
}>()
</script>

<template>
  <div class="exchange-token">
    <ExchangeTokenValue
      v-model="amount"
      :label="label"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      class="exchange-token__value"
    />

    <div class="exchange-token__divider" />

    <ExchangeTokenDropdown
      v-model="activeId"
      :options="options"
      :disabled="disabled"
      class="exchange-token__dropdown"
    />

    <div
      v-if="$slots.error"
      class="exchange-token__error"
    >
      <slot name="error" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.exchange-token {
  display: flex;
  height: 80px;
  position: relative;

  &__value {
    width: 255px;
  }

  &__divider {
    width: 1px;
    height: 100%;
    background-color: $border-border;
  }

  &__dropdown {
    width: 240px;
  }

  &__error {
    position: absolute;
    z-index: 10;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    background-color: $surface-warning;
    padding: $padding-md $padding-xl;
    border-radius: $radius-md;
    @include small;
  }
}
</style>
