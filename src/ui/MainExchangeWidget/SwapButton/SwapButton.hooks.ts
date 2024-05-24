import { useExchangesRatesOutdated, useSwapCurrencies } from '~/src/application/exchange'

export const useSwapButton = () => {
  const onClick = useSwapCurrencies()
  const { outdated } = useExchangesRatesOutdated()

  return {
    outdated,
    onClick,
  }
}
