<script setup lang="ts">
import { useOutdatedToast } from './OutdatedToast.hooks'
import { UiToast, UiButton } from '~/src/shared/ui'

const { outdated, reload, openSupport } = useOutdatedToast()
</script>

<template>
  <UiToast
    v-if="outdated"
    text="Курсы валют в данный момент неактуальны. Мы уже работаем над исправлением."
  >
    <UiButton
      text="Написать"
      size="sm"
      variant="secondary"
      @click="openSupport"
    />

    <UiButton
      text="Обновить"
      size="sm"
      @click="reload"
    />
  </UiToast>
</template>
