import { useExchangesRatesOutdated, useRefresh, useStartTimer } from '~/src/application/exchange'
import type { EventBusService } from '~/src/application/ports'
import { useEventBusService } from '~/src/services/bus'
import { BUS_EVENTS } from '~/src/shared/lib/constants'

export const useTimer = () => {
  const { outdated } = useExchangesRatesOutdated()
  const eventBusService: EventBusService = useEventBusService()
  const { startTimer, stopTimer, timerFormatted } = useStartTimer()
  const refresh = useRefresh()

  eventBusService.subscribe(BUS_EVENTS.EXCHANGE_INFO_UPDATED, () => {
    stopTimer()
    startTimer()
  })

  eventBusService.subscribe(BUS_EVENTS.LAST_UPDATE_TIMER_EXPIRED, () => {
    refresh()
  })

  eventBusService.subscribe(BUS_EVENTS.EXCHANGE_RATES_OUTDATED, () => {
    stopTimer()
  })

  onMounted(startTimer)
  onUnmounted(stopTimer)

  return {
    timerFormatted,
    outdated,
  }
}
