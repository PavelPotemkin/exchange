import type { ICurrencyId } from '../domain/currency'
import { useApi } from './api'
import { useEventBusService } from './bus'
import { API_URLS, BUS_EVENTS } from '~/src/shared/lib/constants'
import { createWithAbort } from '~/src/shared/lib/abort'
import type { EventBusService, ExchangeApiService } from '~/src/application/ports'

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
  const eventBusService: EventBusService = useEventBusService()
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
        })).mapRight((res) => {
          const status = res.statusCode
          if (status === 206) {
            eventBusService.emit(BUS_EVENTS.EXCHANGE_RATES_OUTDATED, undefined)
          }

          return {
            amount: res.data.amount,
            amountFrom: res.data.amount_from,
            currencyFromId: res.data.currency_from_id as ICurrencyId,
            currencyToId: res.data.currency_to_id as ICurrencyId,
            fee: {
              amount: res.data.fee.amount,
              percent: res.data.fee.percent,
              basePercent: res.data.fee.base_percent,
            },
            rate: res.data.rate,
          }
        })
      })
    },
  }
}
