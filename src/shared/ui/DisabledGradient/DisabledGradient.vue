<script setup lang="ts">
defineProps<{
  width: number
  height: number
}>()
</script>

<template>
  <div
    class="ui-disabled-gradient"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
    }"
  />
</template>

<style scoped lang="scss">
.ui-disabled-gradient {
  background: linear-gradient(90deg, #E1E1E1 0%, #EFEFEF 100%);
  border-radius: 999px;
}
</style>
