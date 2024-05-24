import { useActiveCurrenciesInfo } from '~/src/application/exchange'

export const useDetails = () => {
  const activeCurrenciesInfo = useActiveCurrenciesInfo()
  const isOpen = ref(false)

  const exchange = computed(() => ({
    from: {
      amount: activeCurrenciesInfo.value.from.amount || 0,
      code: activeCurrenciesInfo.value.from.data.code,
    },
    to: {
      amount: activeCurrenciesInfo.value.to.amount || 0,
      code: activeCurrenciesInfo.value.to.data.code,
    },
  }))

  const rate = computed(() => ({
    from: {
      amount: 1,
      code: activeCurrenciesInfo.value.from.data.code,
    },
    to: {
      amount: activeCurrenciesInfo.value.calculationResult.rate,
      code: activeCurrenciesInfo.value.to.data.code,
    },
  }))

  const comission = computed(() => ({
    percent: activeCurrenciesInfo.value.calculationResult.fee.percent,
    amount: activeCurrenciesInfo.value.calculationResult.fee.amount,
    code: activeCurrenciesInfo.value.fiat.data.code,
  }))

  return {
    isOpen,
    exchange,
    rate,
    comission,
  }
}
