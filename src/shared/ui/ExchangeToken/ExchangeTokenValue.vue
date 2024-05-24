<script setup lang="ts">
import { useFocus } from '~/src/shared/lib/hooks'
import { UiDisabledGradient } from '~/src/shared/ui'

const props = defineProps<{
  label: string
  placeholder: string
  disabled: boolean
  readonly?: boolean
}>()

const model = defineModel<number | null>({
  required: true,
  default: null,
})

const { focused, target } = useFocus()

const isLabelFullCoveder = computed(() => model.value === null && !focused.value)
</script>

<template>
  <label
    class="ui-exchange-token-value"
    :class="{
      'ui-exchange-token-value_full-cover': isLabelFullCoveder && !disabled,
      'ui-exchange-token-value_disabled': disabled,
    }"
  >
    <span class="ui-exchange-token-value__label">
      {{ label }}
    </span>

    <UiDisabledGradient
      v-if="disabled"
      :width="131"
      :height="28"
    />

    <input
      v-else
      ref="target"
      v-model="model"
      type="number"
      :placeholder="props.placeholder"
      :disabled="disabled || readonly"
      class="ui-exchange-token-value__input"
    >

    <div
      v-if="focused"
      class="ui-exchange-token-value__underline"
    />
  </label>
</template>

<style lang="scss">
.ui-exchange-token-value {
  position: relative;
  height: 80px;
  padding: $padding-none $padding-xl;
  background-color: $surface-secondary;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: $gap-2xs;
  border-top-left-radius: $radius-lg;
  border-bottom-left-radius: $radius-lg;
  overflow: hidden;
  cursor: text;

  &:not(.ui-exchange-token-value_disabled):hover {
    background-color: $surface-secondary-hover;
  }

  &_full-cover {
    & .ui-exchange-token-value__label {
    @include title;
    }

    & .ui-exchange-token-value__input {
      height: 0;
    }
  }

  &__underline {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: $border-accent;
  }

  &__label {
    color: $text-secondary;
    @include small;
  }

  &__input {
    color: $text-primary;
    caret-color: $text-link;
    @include title;
    background-color: transparent;
    outline: none;

    &::placeholder {
      color: $text-tertiary;
    }
  }
}
</style>
