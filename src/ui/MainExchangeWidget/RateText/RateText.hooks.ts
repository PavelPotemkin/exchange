import { useActiveCurrenciesInfo, useExchangesRatesOutdated } from '~/src/application/exchange'

export const useRateText = () => {
  const { outdated } = useExchangesRatesOutdated()
  const activeCurrenciesInfo = useActiveCurrenciesInfo()

  const rateText = computed(() => {
    return {
      from: activeCurrenciesInfo.value.crypto.data.code,
      to: activeCurrenciesInfo.value.fiat.data.code,
      rate: activeCurrenciesInfo.value.calculationResult.rate,
    }
  })

  return {
    outdated,
    rateText,
  }
}
