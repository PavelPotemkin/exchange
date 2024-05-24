<script setup lang="ts">
import { UiIconError } from '../Icons'

const props = withDefaults(
  defineProps<{
    variant?: 'error'
    text: string
  }>(), {
    variant: 'error',
  },
)

defineSlots<{
  default(): any
}>()

const iconComponent = computed(() => ({
  error: UiIconError,
})[props.variant])
</script>

<template>
  <div class="ui-toast">
    <div class="ui-toast__inner">
      <component
        :is="iconComponent"
        width="24"
        height="24"
        class="ui-toast__icon"
      />

      <p class="ui-toast__text">
        {{ text }}
      </p>
    </div>

    <div class="ui-toast__actions">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.ui-toast {
  padding: $padding-md;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: $gap-md;
  background-color: $surface-main;
  border: 1px solid $border-light;
  border-radius: $radius-md;

  &__icon {
    flex: none;
  }

  &__inner {
    display: flex;
    align-items: center;
    gap: $gap-sm;
  }

  &__text {
    @include small;
    color: $text-primary;
  }

  &__actions {
    display: flex;
    gap: $gap-sm;
  }
}
</style>
