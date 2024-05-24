import type { IExchangeCalculationResult, IExchangeState } from '../domain/exchange'
import type { ExchangeStorageService } from '~/src/application/ports'
import type { ICurrencies } from '~/src/domain/currency'

const useStore = defineStore('storage', () => {
  const currencies = ref<ICurrencies | null>(null)
  const exchangeState = ref<IExchangeState | null>(null)
  const exchangeCalculationResult = ref<IExchangeCalculationResult | null>(null)
  const exchangeLastUpdateTime = ref<DateString | null>(null)
  const exchangeRatesOutdated = ref<boolean>(false)

  return {
    currencies,
    exchangeState,
    exchangeCalculationResult,
    exchangeLastUpdateTime,
    exchangeRatesOutdated,
  }
})

export const useExchangeStorageService = (): ExchangeStorageService => {
  const state = storeToRefs(useStore())

  return {
    currencies: computed(() => state.currencies.value),
    updateCurrencies(currencies) {
      state.currencies.value = currencies
    },
    exchangeState: computed(() => state.exchangeState.value),
    updateExchangeInfo(exchangeState) {
      state.exchangeState.value = exchangeState
    },
    exchangeCalculationResult: computed(() => state.exchangeCalculationResult.value),
    updateExchangeCalculationResult(result) {
      state.exchangeCalculationResult.value = result
    },
    exchangeLastUpdateTime: computed(() => state.exchangeLastUpdateTime.value),
    updateExchangeLastUpdateTime(time) {
      state.exchangeLastUpdateTime.value = time
    },
    exchangeRatesOutdated: computed(() => state.exchangeRatesOutdated.value),
    updateExchangeRatesOutdated(outdated) {
      state.exchangeRatesOutdated.value = outdated
    },
  }
}
