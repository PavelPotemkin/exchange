<script setup lang="ts">
import type { ExchangeTokenOption } from './ExchangeToken.types'
import { useClickOutside } from '~/src/shared/lib/hooks'
import { UiDisabledGradient } from '~/src/shared/ui'

const props = defineProps<{
  options: Array<ExchangeTokenOption>
  disabled: boolean
}>()

const model = defineModel<string>({
  required: true,
})

const target = ref<HTMLElement | null>(null)
const isOpen = ref(false)
useClickOutside(
  () => {
    isOpen.value = false
  },
  [target],
)

const activeOption = computed(() => {
  return props.options.find(option => option.id === model.value)!
})

const select = (item: ExchangeTokenOption) => {
  model.value = item.id
  isOpen.value = false
}
</script>

<template>
  <div ref="target">
    <button
      class="exchange-token-select"
      :class="{
        'exchange-token-select_opened': isOpen,
      }"
      :disabled="disabled"
      type="button"
      @click="isOpen = !isOpen"
    >
      <div class="exchange-token-select__rate">
        <template v-if="disabled">
          <UiDisabledGradient
            :width="36"
            :height="36"
          />

          <div class="exchange-token-select__text">
            <UiDisabledGradient
              :width="85"
              :height="16"
            />

            <UiDisabledGradient
              :width="85"
              :height="28"
            />
          </div>
        </template>

        <template v-else>
          <img
            :src="activeOption.imageSrc"
            alt=""
            class="exchange-token-select__icon"
          >

          <div class="exchange-token-select__text">
            <span class="exchange-token-select__label">
              {{ activeOption.name }}
            </span>

            <div class="exchange-token-select__text-inner">
              <span class="exchange-token-select__value">
                {{ activeOption.value }}
              </span>

              <div
                v-if="activeOption.chip"
                class="exchange-token-select__chip"
              >
                {{ activeOption.chip }}
              </div>
            </div>
          </div>
        </template>
      </div>

      <svg
        class="exchange-token-select__arrow"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 10L12 14L16 10"
          stroke="#1F1F1F"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <div
        v-if="isOpen && !disabled"
        class="exchange-token-select__underline"
      />
    </button>

    <div
      v-if="isOpen && !disabled"
      class="exchange-token-dropdown"
    >
      <ul class="exchange-token-dropdown__list">
        <li>
          <button
            v-for="item in options"
            :key="item.id"
            class="exchange-token-dropdown__item"
            :class="{
              'exchange-token-dropdown__item_active': model === item.id,
            }"
            type="button"
            @click="select(item)"
          >
            <img
              class="exchange-token-dropdown__item-icon"
              :src="item.imageSrc"
              :alt="item.name"
            >

            <div class="exchange-token-dropdown__item-text">
              <span class="exchange-token-dropdown__item-label">{{ item.name }}</span>

              <div class="exchange-token-dropdown__item-text-inner">
                <span class="exchange-token-dropdown__item-value">{{ item.value }}</span>

                <div
                  v-if="item.chip"
                  class="exchange-token-dropdown__item-chip"
                >
                  {{ item.chip }}
                </div>
              </div>
            </div>

            <div class="exchange-token-dropdown__item-active-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9.00375"
                  fill="#5551FD"
                />
                <path
                  d="M8.4425 12.3391L10.6104 14.507L10.5964 14.493L15.4874 9.60199"
                  stroke="#F5F5F5"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.exchange-token-select {
  position: relative;
  height: 80px;
  width: 100%;
  display: flex;
  gap: $gap-sm;
  align-items: center;
  padding: $padding-none $padding-xl;
  background-color: $surface-secondary;
  border-top-right-radius: $radius-lg;
  border-bottom-right-radius: $radius-lg;
  overflow: hidden;

  @include hover {
    background-color: $surface-secondary-hover;
  }

  &__underline {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: $border-accent;
  }

  &__rate {
    width: 100%;
    display: flex;
    align-items: center;
    gap: $gap-xs;
  }

  &__icon {
    width: 36px;
    height: 36px;
    object-fit: contain;
  }

  &__arrow {
    width: 24px;
    height: 24px;
    flex: none;
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: $gap-2xs;
    text-align: left;
  }

  &__text-inner {
    display: flex;
    align-items: center;
    gap: $gap-xs;
  }

  &__label {
    color: $text-secondary;
    @include small;
  }

  &__value {
    color: $text-primary;
    @include title;
  }

  &_opened {
    & .exchange-token-select__arrow {
      transform: rotate(180deg);
    }
  }

  &__chip {
    padding: $padding-3xs $padding-xs;
    border-radius: $radius-xl;
    background-color: $surface-secondary-addon;
    color: $text-secondary;
    @include small;
  }
}

.exchange-token-dropdown {
  position: absolute;
  top: calc(100% + 9px);
  right: 0;
  left: 9px;
  height: 143px;
  padding: $padding-sm 0;
  border-radius: $radius-md;
  border: 1px solid $border-light;
  background-color: $surface-main;
  box-shadow: 0px 4px 24px 0px #20202014;
  z-index: 10;

  &__list {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overscroll-behavior: none;
    height: 100%;
  }

  &__item {
    height: 64px;
    width: 100%;
    display: flex;
    align-items: center;
    gap: $gap-sm;
    padding: $padding-none $padding-xl;
    gap: $gap-sm;

    &-icon {
      width: 36px;
      height: 36px;
      object-fit: contain;
    }

    &-text {
      display: flex;
      flex-direction: column;
      gap: $gap-2xs;
      text-align: left;
    }

    &-text-inner {
      display: flex;
      align-items: center;
      gap: $gap-xs;
    }

    &-chip {
      padding: $padding-3xs $padding-xs;
      border-radius: $radius-xl;
      background-color: $surface-secondary-addon;
      color: $text-secondary;
      @include small;
    }

    &-label {
      @include small;
      color: $text-secondary;
    }

    &-value {
      @include body;
      color: $text-primary;
    }

    &-active-icon {
      margin-left: auto;
    }

    &:not(.exchange-token-dropdown__item_active) .exchange-token-dropdown__item-active-icon {
      display: none;
    }
  }
}
</style>
