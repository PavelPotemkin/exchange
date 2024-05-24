<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary'
    size?: 'sm' | 'default'
    text?: string
  }>(), {
    variant: 'primary',
    size: 'default',
    text: '',
  },
)

defineSlots<{
  default(): any
}>()
</script>

<template>
  <button
    class="ui-button"
    :class="`ui-button_variant_${props.variant} ui-button_size_${props.size}`"
  >
    <slot>
      {{ text }}
    </slot>
  </button>
</template>

<style lang="scss">
.ui-button {
  &_variant {
    &_primary {
      color: $text-invert;

      &:disabled {
        background-color: $surface-disabled;
      }

      &:not(:disabled) {
        background-color: $surface-primary;
      }
    }

    &_secondary {
      background-color: $surface-secondary;
      color: $text-primary;
    }
  }

  &_size {
    &_sm {
      padding: $padding-none $padding-md;
      border-radius: $radius-sm;
      @include small;
      height: 32px;
    }

    &_default {
      padding: $padding-none $padding-xl;
      border-radius: $radius-md;
      @include body;
      height: 56px;
    }
  }
}
</style>
