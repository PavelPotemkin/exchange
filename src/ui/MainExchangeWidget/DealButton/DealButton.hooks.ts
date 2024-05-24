import { useExchangesRatesOutdated } from '~/src/application/exchange'

export const useDealButton = () => {
  const { outdated } = useExchangesRatesOutdated()
  const onClick = () => {
    alert('Start deal button clicked')
  }

  return {
    outdated,
    onClick,
  }
}
