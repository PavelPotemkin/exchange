import type { EventBusService, ExchangeStorageService } from '~/src/application/ports'
import { useEventBusService } from '~/src/services/bus'
import { useExchangeStorageService } from '~/src/services/storage'
import { BUS_EVENTS } from '~/src/shared/lib/constants'

export const usePage = () => {
  const exchangeStorageService: ExchangeStorageService = useExchangeStorageService()
  const eventBusService: EventBusService = useEventBusService()

  eventBusService.subscribe(BUS_EVENTS.EXCHANGE_RATES_OUTDATED, () => {
    exchangeStorageService.updateExchangeRatesOutdated(true)
  })
}
