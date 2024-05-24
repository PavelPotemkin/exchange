import { useExchangesRatesOutdated } from '~/src/application/exchange'

export const useOutdatedToast = () => {
  const { outdated, reload } = useExchangesRatesOutdated()

  const openSupport = () => {
    alert('Open Support')
  }

  return {
    outdated,
    reload,
    openSupport,
  }
}
