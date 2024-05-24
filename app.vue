<script setup lang="ts">
import { MainExchangeWidget } from '~/src/ui'
import { useInitWidget } from '~/src/application/exchange'

const initExchangeWidget = useInitWidget()

const { pending, error } = await useAsyncData(async () => {
  await initExchangeWidget()
  return {}
})
</script>

<template>
  <div class="app">
    <div v-if="pending">
      loading
    </div>

    <div v-else-if="error">
      {{ error }}
    </div>

    <MainExchangeWidget v-else />
  </div>
</template>

<style scoped lang="scss">
.app {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: calc(560px + 16px * 2);
  margin: auto;
  padding: 90px 16px;
}
</style>
