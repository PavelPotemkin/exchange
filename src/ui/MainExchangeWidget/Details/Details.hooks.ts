import { useActiveCurrenciesInfo, useExchangesRatesOutdated } from '~/src/application/exchange'
import { formatAmount } from '~/src/shared/lib/utils'

export const useDetails = () => {
  const { outdated } = useExchangesRatesOutdated()
  const activeCurrenciesInfo = useActiveCurrenciesInfo()
  const isOpen = ref(false)

  const exchange = computed(() => ({
    from: `${formatAmount(activeCurrenciesInfo.value.from.amount || 0)} ${activeCurrenciesInfo.value.from.data.code}`,
    to: `${formatAmount(activeCurrenciesInfo.value.to.amount || 0)} ${activeCurrenciesInfo.value.to.data.code}`,
  }))

  const rate = computed(() => ({
    from: `1 ${activeCurrenciesInfo.value.from.data.code}`,
    to: `${formatAmount(activeCurrenciesInfo.value.calculationResult.rate || 0)} ${activeCurrenciesInfo.value.to.data.code}`,
  }))

  const comission = computed(() => ({
    percent: activeCurrenciesInfo.value.calculationResult.fee.percent,
    value: `${formatAmount(+(activeCurrenciesInfo.value.calculationResult.fee.amount || 0))} ${activeCurrenciesInfo.value.fiat.data.code}`,
  }))

  return {
    outdated,
    isOpen,
    exchange,
    rate,
    comission,
  }
}
