import mitt from 'mitt'
import type { EventBusService } from '../application/ports'
import type { Events } from '@/src/shared/kernel'

const emitter = mitt<Events>()

export const useEventBusService = (): EventBusService => {
  return {
    subscribe<Key extends keyof Events>(type: Key, handler: (event: Events[Key]) => void): void {
      onMounted(() => {
        emitter.on(type, handler)
      })
      onUnmounted(() => {
        emitter.off(type, handler)
      })
    },
    emit<Key extends keyof Events>(type: Key, event: Events[Key]): void {
      emitter.emit(type, event)
    },
  }
}
