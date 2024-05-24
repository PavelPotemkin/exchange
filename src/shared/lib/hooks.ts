export const useFocus = () => {
  const focused = ref(false)
  const target = ref<HTMLElement | null>(null)

  watchEffect(() => {
    if (target.value) {
      const onFocus = () => (focused.value = true)
      const onBlur = () => (focused.value = false)
      target.value.addEventListener('focus', onFocus)
      target.value.addEventListener('blur', onBlur)
      return () => {
        target.value?.removeEventListener('focus', onFocus)
        target.value?.removeEventListener('blur', onBlur)
      }
    }
  })

  return { focused, target }
}

export const useClickOutside = (callback: () => void, targets: Ref<HTMLElement | null>[]) => {
  const handler = (event: MouseEvent) => {
    if (targets.some(target => target.value?.contains(event.target as Node))) {
      return
    }
    callback()
  }

  onMounted(() => {
    document.addEventListener('click', handler)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
}
