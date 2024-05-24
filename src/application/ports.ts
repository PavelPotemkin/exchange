import type { IExchangeCalculationResult, IExchangeState } from '~/src/domain/exchange'
import type { ApiResult, Events } from '~/src/shared/kernel'
import type { ICurrencies } from '~/src/domain/currency'

export interface ExchangeStorageService {
  currencies: ComputedRef<ICurrencies | null>
  updateCurrencies(currencies: ICurrencies): void
  exchangeState: ComputedRef<IExchangeState | null>
  updateExchangeInfo(exchangeState: IExchangeState): void
  exchangeCalculationResult: ComputedRef<IExchangeCalculationResult | null>
  updateExchangeCalculationResult(result: IExchangeCalculationResult): void
  exchangeLastUpdateTime: ComputedRef<DateString | null>
  updateExchangeLastUpdateTime(time: DateString): void
}

export interface CurrenciesApiService {
  getAll(): ApiResult<ICurrencies>
}

export interface ExchangeApiService {
  calculate(payload: IExchangeState): ApiResult<IExchangeCalculationResult>
}

export interface EventBusService {
  subscribe<Key extends keyof Events>(type: Key, handler: (event: Events[Key]) => void): void
  emit<Key extends keyof Events>(type: Key, event: Events[Key]): void
}

export interface NotificationService {
  showNotification(notificationPayload: Notification): void
}
