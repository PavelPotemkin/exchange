import { useUpdateAmount, useChangeFromCurrency, useActiveCurrenciesInfo, useCurrenciesOptions, useExchangesRatesOutdated } from '~/src/application/exchange'
import type { EventBusService } from '~/src/application/ports'
import { getExchangeAmount } from '~/src/domain/exchange'
import { useEventBusService } from '~/src/services/bus'
import { useExchangeStorageService } from '~/src/services/storage'
import { BUS_EVENTS } from '~/src/shared/lib/constants'
import { formatAmount } from '~/src/shared/lib/utils'

export const useFromInput = () => {
  const eventBusService: EventBusService = useEventBusService()
  const { exchangeState } = useExchangeStorageService()
  const activeCurrenciesInfo = useActiveCurrenciesInfo()
  const currenciesOptions = useCurrenciesOptions()
  const { outdated } = useExchangesRatesOutdated()
  const exchangeUpdateAmount = useUpdateAmount()
  const changeFromCurrency = useChangeFromCurrency()

  const activeIdModel = computed({
    get() {
      return activeCurrenciesInfo.value.from.data.id
    },
    set(value) {
      changeFromCurrency(value)
    },
  })

  const amountModel = computed({
    get() {
      return getExchangeAmount(exchangeState.value?.amount)
    },
    set(value) {
      exchangeUpdateAmount(value)
    },
  })

  const fromCurrenciesOptions = computed(() => currenciesOptions.value.from)

  const errorMinLimitText = ref('')
  eventBusService.subscribe(BUS_EVENTS.AMOUNT_VALIDATION, (payload) => {
    errorMinLimitText.value = payload ? `${formatAmount(+payload.minLimit)} ${payload.currency}` : ''
  })
  eventBusService.subscribe(BUS_EVENTS.EXCHANGE_INFO_UPDATED, () => {
    errorMinLimitText.value = ''
  })

  return {
    outdated,
    activeIdModel,
    amountModel,
    fromCurrenciesOptions,
    errorMinLimitText,
  }
}
