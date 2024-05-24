import { useActiveCurrenciesInfo, useCurrenciesOptions, useChangeToCurrency } from '~/src/application/exchange'

export const useToInput = () => {
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
    amount,
    activeIdModel,
    toCurrenciesOptions,
  }
}
