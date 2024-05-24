<script setup lang="ts">
import { useTimer } from './Timer.hooks'

const { timerFormatted, outdated } = useTimer()
</script>

<template>
  <div class="main-exchage-widget-timer">
    <div
      v-if="outdated"
      class="main-exchage-widget-timer__disabled-text"
    >
      Обновление курса недоступно
    </div>

    <template v-else>
      <span class="main-exchage-widget-timer__text">
        Курс обновится через
      </span>

      <span class="main-exchage-widget-timer__value">
        {{ timerFormatted }}
      </span>
    </template>
  </div>
</template>

<style scoped lang="scss">
.main-exchage-widget-timer {
  display: flex;
  align-items: center;
  gap: $gap-2xs;

  &__text,
  &__disabled-text {
    color: $text-secondary;
    @include label;
  }

  &__value {
    color: $text-primary;
    @include label-medium;
  }
}
</style>
