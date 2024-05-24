import { useSwapCurrencies } from '~/src/application/exchange'

export const useSwapButton = () => {
  const onClick = useSwapCurrencies()

  return {
    onClick,
  }
}
