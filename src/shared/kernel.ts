import type { Either } from '@sweet-monads/either'
import type { BUS_EVENTS } from './lib/constants'
import type { NetworkServerError, NetworkBadRequestError, NetworkError } from './lib/errors'

export type ApiOptions = ({
  method: 'GET' | 'DELETE'
  body?: Record<string, any>
} | {
  method: 'POST' | 'PUT'
  body?: Record<string, any> | FormData
} | {
  method?: undefined
  body?: undefined
}) & {
  signal?: AbortSignal
}

export type ApiResult<T> = Promise<Either<
  NetworkError |
  NetworkServerError |
  NetworkBadRequestError,
  {
    data: T
    statusCode: number
  }
>>

export type ApiResultUnwrapped<T> = Promise<Either<
  NetworkError |
  NetworkServerError |
  NetworkBadRequestError,
  T
>>

export type Events = {
  [BUS_EVENTS.LAST_UPDATE_TIMER_EXPIRED]: undefined
  [BUS_EVENTS.EXCHANGE_INFO_UPDATED]: undefined
  [BUS_EVENTS.AMOUNT_VALIDATION]: {
    minLimit: string
    currency: string
  } | undefined
  [BUS_EVENTS.EXCHANGE_RATES_OUTDATED]: undefined
}
