<script setup lang="ts">
import { useDetails } from './Details.hooks'
import { UiDisabledGradient } from '~/src/shared/ui'

const { isOpen, exchange, rate, comission } = useDetails()

const disabled = false
</script>

<template>
  <div
    class="main-exchage-widget-details"
    :class="{
      'main-exchage-widget-details_open': isOpen,
    }"
  >
    <div class="main-exchage-widget-details__header">
      <div class="main-exchage-widget-details__header-left">
        <span class="main-exchage-widget-details__header-left-label">
          Обмен
        </span>

        <UiDisabledGradient
          v-if="disabled"
          :height="16"
          :width="180"
        />

        <span
          v-else
          class="main-exchage-widget-details__header-left-rate"
        >
          <span>
            {{ `${exchange.from.amount} ${exchange.from.code}` }}
          </span>

          <span>
            →
          </span>

          <span>
            {{ `${exchange.to.amount} ${exchange.to.code}` }}
          </span>
        </span>
      </div>

      <button
        class="main-exchage-widget-details__toggle-btn"
        type="button"
        :disabled="disabled"
        @click="isOpen = !isOpen"
      >
        <span>
          Детализация
        </span>

        <svg
          class="main-exchage-widget-details__toggle-btn-icon"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.33337 6.66667L8.00004 9.33334L10.6667 6.66667"
            stroke="#5551FF"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <div
      v-if="isOpen && !disabled"
      class="main-exchage-widget-details__list"
    >
      <div class="main-exchage-widget-details__list-item">
        <span class="main-exchage-widget-details__list-item-label">
          Курс обмена
        </span>

        <span class="main-exchage-widget-details__list-item-value">
          <span>
            {{ `${rate.from.amount} ${rate.from.code}` }}
          </span>

          <span>
            ~
          </span>

          <span>
            {{ `${rate.to.amount} ${rate.to.code}` }}
          </span>
        </span>
      </div>

      <div class="main-exchage-widget-details__list-item">
        <span class="main-exchage-widget-details__list-item-label">
          {{ `Комиссия платформы, ${comission.percent}%` }}
        </span>

        <span class="main-exchage-widget-details__list-item-value">
          {{ `${comission.amount} ${comission.code}` }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-exchage-widget-details {
  display: flex;
  flex-direction: column;
  gap: $gap-xl;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: $gap-xl;

    &-left {
      display: flex;
      align-items: center;
      gap: $gap-xs;

      &-label {
        color: $text-secondary;
        @include small;
      }

      &-rate {
        color: $text-primary;
        display: flex;
        gap: $gap-2xs;
        @include small-medium;
      }
    }
  }

  &__toggle-btn {
    display: flex;
    gap: $gap-3xs;
    color: $text-info;
    @include small-medium;
  }

  &_open {
    .main-exchage-widget-details__toggle-btn-icon {
      transform: rotate(180deg);
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: $gap-md;

    &-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: $gap-3xl;

      &-label {
        color: $text-secondary;
        @include small;
      }

      &-value {
        display: flex;
        gap: $gap-2xs;
        color: $text-primary;
        @include small-medium;
        text-align: right;
      }
    }
  }
}
</style>
