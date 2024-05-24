import { CURRENCY_TYPE, getCurrencyById, getSameTypeCurrenciesById, type ICurrency, type ICurrencyId } from '../domain/currency'
import { createExchangeState, createLastUpdateTime, getActiveCurrenciesInfo, getExchangeAmount, getInitialExchangeCurrencies, getRemainingTimerMs, isAmountValid, swapCurrencies, type IExchangeCalculationResult } from '../domain/exchange'
import { BUS_EVENTS } from '../shared/lib/constants'
import { useEventBusService } from '../services/bus'
import { useCurrenciesApiService } from '../services/currencies'
import { useExchangeApiService } from '../services/exchange'
import { useExchangeStorageService } from '../services/storage'
import type { CurrenciesApiService, EventBusService, ExchangeApiService, ExchangeStorageService } from './ports'

export const useInitWidget = () => {
  const exchangeStorageService: ExchangeStorageService = useExchangeStorageService()
  const currenciesApiService: CurrenciesApiService = useCurrenciesApiService()
  const exchangeApiService: ExchangeApiService = useExchangeApiService()

  return async () => {
    const result = await currenciesApiService.getAll()
    if (result.isLeft()) {
      return
    }
    exchangeStorageService.updateCurrencies(result.value)

    const { currencyFromId, currencyToId } = getInitialExchangeCurrencies(exchangeStorageService.currencies.value!)
    const exchangeState = createExchangeState({
      amount: null,
      currencyFromId,
      currencyToId,
    })
    exchangeStorageService.updateExchangeInfo(exchangeState)

    const calculateResult = await exchangeApiService.calculate(exchangeState)
    if (calculateResult.isLeft()) {
      return
    }
    exchangeStorageService.updateExchangeCalculationResult(calculateResult.value)
  }
}

export const useSwapCurrencies = () => {
  const exchangeStorageService: ExchangeStorageService = useExchangeStorageService()
  const exchangeApiService: ExchangeApiService = useExchangeApiService()
  const eventBusService: EventBusService = useEventBusService()

  return async () => {
    const exchangeState = swapCurrencies(exchangeStorageService.exchangeCalculationResult.value!)
    exchangeStorageService.updateExchangeInfo(exchangeState)

    const calculateResult = await exchangeApiService.calculate(exchangeState)
    if (calculateResult.isLeft()) {
      return
    }

    exchangeStorageService.updateExchangeCalculationResult(calculateResult.value)
    eventBusService.emit(BUS_EVENTS.EXCHANGE_INFO_UPDATED, undefined)
  }
}

export const useStartTimer = () => {
  const exchangeStorageService: ExchangeStorageService = useExchangeStorageService()
  const eventBusService: EventBusService = useEventBusService()
  let timer: NodeJS.Timeout | null = null
  const remainingTimeMs = ref(0)

  const onTimerTick = () => {
    if (exchangeStorageService.exchangeLastUpdateTime.value) {
      remainingTimeMs.value = getRemainingTimerMs(exchangeStorageService.exchangeLastUpdateTime.value)
    }

    if (remainingTimeMs.value <= 0) {
      stopTimer()
      eventBusService.emit(BUS_EVENTS.LAST_UPDATE_TIMER_EXPIRED, undefined)
    }
  }

  const startTimer = () => {
    if (exchangeStorageService.exchangeRatesOutdated.value) {
      return
    }

    exchangeStorageService.updateExchangeLastUpdateTime(createLastUpdateTime())
    timer = setInterval(() => {
      onTimerTick()
    }, 1000)
  }

  const stopTimer = () => {
    if (timer) {
      clearInterval(timer)
    }

    exchangeStorageService.updateExchangeLastUpdateTime(createLastUpdateTime())
  }

  const timerFormatted = computed(() => {
    if (!remainingTimeMs.value) {
      return '00:00'
    }

    const remainingTimeMinutes = Math.max(0, Math.floor(remainingTimeMs.value / 1000 / 60))
    const remainingTimeSeconds = Math.max(Math.ceil((remainingTimeMs.value / 1000) % 60))

    return `${remainingTimeMinutes.toString().padStart(2, '0')}:${remainingTimeSeconds.toString().padStart(2, '0')}`
  })

  return { startTimer, stopTimer, timerFormatted }
}

export const useUpdateAmount = () => {
  const exchangeStorageService: ExchangeStorageService = useExchangeStorageService()
  const exchangeApiService: ExchangeApiService = useExchangeApiService()
  const eventBusService: EventBusService = useEventBusService()

  return async (amountCandidate: string | number | null) => {
    const amount = getExchangeAmount(amountCandidate)
    const currency = getCurrencyById(exchangeStorageService.exchangeState.value!.currencyFromId, exchangeStorageService.currencies.value!)
    if (!currency) {
      return
    }

    const isValid = isAmountValid(amount, currency.minLimit)
    if (!isValid) {
      eventBusService.emit(BUS_EVENTS.AMOUNT_VALIDATION, {
        minLimit: currency.minLimit,
        currency: currency.code,
      })

      const exchangeState = createExchangeState({
        amount,
        currencyFromId: exchangeStorageService.exchangeState.value!.currencyFromId,
        currencyToId: exchangeStorageService.exchangeState.value!.currencyToId,
      })
      exchangeStorageService.updateExchangeInfo(exchangeState)

      const calculateResult: IExchangeCalculationResult = {
        ...exchangeStorageService.exchangeCalculationResult.value!,
        amount: '0',
        amountFrom: '0',
        fee: {
          ...exchangeStorageService.exchangeCalculationResult.value!.fee,
          amount: '0',
        },
      }
      exchangeStorageService.updateExchangeCalculationResult(calculateResult)
      return
    }
    eventBusService.emit(BUS_EVENTS.AMOUNT_VALIDATION, undefined)

    const exchangeState = createExchangeState({
      amount,
      currencyFromId: exchangeStorageService.exchangeState.value!.currencyFromId,
      currencyToId: exchangeStorageService.exchangeState.value!.currencyToId,
    })

    exchangeStorageService.updateExchangeInfo(exchangeState)

    const calculateResult = await exchangeApiService.calculate(exchangeState)
    if (calculateResult.isLeft()) {
      return
    }

    exchangeStorageService.updateExchangeCalculationResult(calculateResult.value)
    eventBusService.emit(BUS_EVENTS.EXCHANGE_INFO_UPDATED, undefined)
  }
}

export const useChangeFromCurrency = () => {
  const exchangeStorageService: ExchangeStorageService = useExchangeStorageService()
  const exchangeApiService: ExchangeApiService = useExchangeApiService()
  const eventBusService: EventBusService = useEventBusService()

  return async (currencyId: ICurrencyId) => {
    const exchangeState = createExchangeState({
      amount: exchangeStorageService.exchangeState.value!.amount,
      currencyFromId: currencyId,
      currencyToId: exchangeStorageService.exchangeState.value!.currencyToId,
    })

    exchangeStorageService.updateExchangeInfo(exchangeState)

    const calculateResult = await exchangeApiService.calculate(exchangeState)
    if (calculateResult.isLeft()) {
      return
    }

    exchangeStorageService.updateExchangeCalculationResult(calculateResult.value)
    eventBusService.emit(BUS_EVENTS.EXCHANGE_INFO_UPDATED, undefined)
  }
}

export const useChangeToCurrency = () => {
  const exchangeStorageService: ExchangeStorageService = useExchangeStorageService()
  const exchangeApiService: ExchangeApiService = useExchangeApiService()
  const eventBusService: EventBusService = useEventBusService()

  return async (currencyId: ICurrencyId) => {
    const exchangeState = createExchangeState({
      amount: exchangeStorageService.exchangeState.value!.amount,
      currencyFromId: exchangeStorageService.exchangeState.value!.currencyFromId,
      currencyToId: currencyId,
    })

    exchangeStorageService.updateExchangeInfo(exchangeState)

    const calculateResult = await exchangeApiService.calculate(exchangeState)
    if (calculateResult.isLeft()) {
      return
    }

    exchangeStorageService.updateExchangeCalculationResult(calculateResult.value)
    eventBusService.emit(BUS_EVENTS.EXCHANGE_INFO_UPDATED, undefined)
  }
}

export const useActiveCurrenciesInfo = () => {
  const { exchangeCalculationResult, currencies } = useExchangeStorageService()

  return computed(() => getActiveCurrenciesInfo(exchangeCalculationResult.value!, currencies.value!))
}

export const useCurrenciesOptions = () => {
  const { exchangeCalculationResult, currencies } = useExchangeStorageService()

  const fromCurrencyToExchangeTokenOption = (currency: ICurrency) => ({
    id: currency.id,
    name: currency.name,
    value: currency.code,
    imageSrc: currency.iconFile.url,
    chip: currency.type === CURRENCY_TYPE.CRYPTO ? currency.network : undefined,
  })

  return computed(() => ({
    from: getSameTypeCurrenciesById(exchangeCalculationResult.value!.currencyFromId, currencies.value!).map(fromCurrencyToExchangeTokenOption),
    to: getSameTypeCurrenciesById(exchangeCalculationResult.value!.currencyToId, currencies.value!).map(fromCurrencyToExchangeTokenOption),
  }))
}

export const useRefresh = () => {
  const exchangeStorageService: ExchangeStorageService = useExchangeStorageService()
  const exchangeApiService: ExchangeApiService = useExchangeApiService()
  const eventBusService: EventBusService = useEventBusService()

  return async () => {
    const calculateResult = await exchangeApiService.calculate(exchangeStorageService.exchangeState.value!)
    if (calculateResult.isLeft()) {
      return
    }

    exchangeStorageService.updateExchangeCalculationResult(calculateResult.value)
    eventBusService.emit(BUS_EVENTS.EXCHANGE_INFO_UPDATED, undefined)
  }
}

export const useExchangesRatesOutdated = () => {
  const exchangeStorageService: ExchangeStorageService = useExchangeStorageService()
  const refresh = useRefresh()

  const reload = () => {
    exchangeStorageService.updateExchangeRatesOutdated(false)
    refresh()
  }

  const outdated = computed(() => exchangeStorageService.exchangeRatesOutdated.value)

  return {
    outdated,
    reload,
  }
}
