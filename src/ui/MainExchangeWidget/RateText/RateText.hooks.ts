import { useActiveCurrenciesInfo } from '~/src/application/exchange'

export const useRateText = () => {
  const activeCurrenciesInfo = useActiveCurrenciesInfo()

  const rateText = computed(() => {
    return {
      from: activeCurrenciesInfo.value.crypto.data.code,
      to: activeCurrenciesInfo.value.fiat.data.code,
      rate: activeCurrenciesInfo.value.calculationResult.rate,
    }
  })

  return {
    rateText,
  }
}
