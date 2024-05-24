import { CURRENCY_TYPE, getCryptoCurrencies, getCurrencyById, getFiatCurrencies, type ICurrencies, type ICurrencyId } from './currency'

export const LAST_UPDATE_TIMER_INTERVAL_MS = 60 * 1000

export interface IExchangeState {
  amount: number | null
  currencyFromId: ICurrencyId
  currencyToId: ICurrencyId
}

export interface IExchangeCalculationResult {
  amount?: string
  amountFrom: string
  currencyFromId: ICurrencyId
  currencyToId: ICurrencyId
  fee: {
    amount?: string
    percent: number
    basePercent: number
  }
  rate?: string
}

export const createExchangeState = ({ amount, currencyFromId, currencyToId }: {
  amount: number | null
  currencyFromId: ICurrencyId
  currencyToId: ICurrencyId
}): IExchangeState => ({
  amount,
  currencyFromId,
  currencyToId,
})

export const getInitialExchangeCurrencies = (currencies: ICurrencies) => {
  const cryptoCurrency = getCryptoCurrencies(currencies)[0]
  const fiatCurrency = getFiatCurrencies(currencies)[0]

  if (!cryptoCurrency || !fiatCurrency) {
    throw new Error('Initial currencies not found')
  }

  return {
    currencyFromId: cryptoCurrency.id,
    currencyToId: fiatCurrency.id,
  }
}

export const createLastUpdateTime = () => new Date().toISOString()

export const getRemainingTimerMs = (lastUpdateTime: DateString) => {
  const lastUpdateDate = new Date(lastUpdateTime)
  const currentDate = new Date()

  return LAST_UPDATE_TIMER_INTERVAL_MS - (currentDate.getTime() - lastUpdateDate.getTime())
}

export const getExchangeAmount = (amount: number | string | null | undefined) => {
  if (amount === null || amount === undefined) {
    return null
  }

  if (typeof amount === 'number') {
    return amount
  }

  return Number.parseFloat(amount) || null
}

export const isAmountValid = (amount: number | null, minLimit: string) => {
  if (amount === null) {
    return false
  }

  return amount >= Number.parseFloat(minLimit)
}

export const swapCurrencies = (
  exchangeCalculationResult: IExchangeCalculationResult,
): IExchangeState => {
  return {
    amount: getExchangeAmount(exchangeCalculationResult.amount),
    currencyFromId: exchangeCalculationResult.currencyToId,
    currencyToId: exchangeCalculationResult.currencyFromId,
  }
}

export const getActiveCurrenciesInfo = (
  exchangeCalculationResult: IExchangeCalculationResult,
  currencies: ICurrencies,
) => {
  const currencyFrom = getCurrencyById(exchangeCalculationResult.currencyFromId, currencies)
  const currencyTo = getCurrencyById(exchangeCalculationResult.currencyToId, currencies)

  if (!currencyFrom || !currencyTo) {
    throw new Error('Currency not found')
  }

  const from = {
    data: currencyFrom,
    amount: getExchangeAmount(exchangeCalculationResult.amountFrom),
  }

  const to = {
    data: currencyTo,
    amount: getExchangeAmount(exchangeCalculationResult.amount),
  }

  const calculationResult = {
    ...exchangeCalculationResult,
    rate: getExchangeAmount(exchangeCalculationResult.rate),
  }

  if (currencyFrom.type === CURRENCY_TYPE.CRYPTO) {
    return {
      from,
      to,
      crypto: from,
      fiat: to,
      calculationResult,
    }
  }
  else {
    return {
      from,
      to,
      crypto: to,
      fiat: from,
      calculationResult,
    }
  }
}
