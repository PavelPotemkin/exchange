import type { ICurrencyId } from '../domain/currency'
import { useApi } from './api'
import { API_URLS } from '~/src/shared/lib/constants'
import { createWithAbort } from '~/src/shared/lib/abort'
import type { ExchangeApiService } from '~/src/application/ports'

interface IApiExchangeCalculationResult {
  amount?: string
  amount_from: string
  currency_from_id: string
  currency_to_id: string
  fee: {
    amount?: string
    percent: number
    base_percent: number
  }
  rate?: string
}

export const useExchangeApiService = (): ExchangeApiService => {
  const api = useApi()

  const abortableCalculatorCall = createWithAbort()

  return {
    async calculate(payload) {
      return await abortableCalculatorCall(async (signal) => {
        return (await api<IApiExchangeCalculationResult>(API_URLS.EXCHANGE_CALCULATE, {
          method: 'POST',
          body: {
            amount: payload.amount,
            currency_from_id: payload.currencyFromId,
            currency_to_id: payload.currencyToId,
          },
          signal,
        })).mapRight(res => ({
          amount: res.amount,
          amountFrom: res.amount_from,
          currencyFromId: res.currency_from_id as ICurrencyId,
          currencyToId: res.currency_to_id as ICurrencyId,
          fee: {
            amount: res.fee.amount,
            percent: res.fee.percent,
            basePercent: res.fee.base_percent,
          },
          rate: res.rate,
        }))
      })
    },
  }
}
