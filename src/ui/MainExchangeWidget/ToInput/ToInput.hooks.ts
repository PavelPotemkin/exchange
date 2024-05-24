import { useActiveCurrenciesInfo, useCurrenciesOptions, useChangeToCurrency, useExchangesRatesOutdated } from '~/src/application/exchange'

export const useToInput = () => {
  const { outdated } = useExchangesRatesOutdated()
  const activeCurrenciesInfo = useActiveCurrenciesInfo()
  const currenciesOptions = useCurrenciesOptions()
  const changeToCurrency = useChangeToCurrency()

  const amount = computed(() => activeCurrenciesInfo.value.to.amount)

  const activeIdModel = computed({
    get() {
      return activeCurrenciesInfo.value.to.data.id
    },
    set(value) {
      changeToCurrency(value)
    },
  })

  const toCurrenciesOptions = computed(() => currenciesOptions.value.to)

  return {
    outdated,
    amount,
    activeIdModel,
    toCurrenciesOptions,
  }
}
