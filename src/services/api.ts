import { left, right } from '@sweet-monads/either'
import { getApiError } from '../shared/lib/errors'
import type { ApiOptions, ApiResult } from '~/src/shared/kernel'

let apiInstance: ReturnType<typeof $fetch.create>

export const useApi = () => {
  const config = useRuntimeConfig()

  return async <T>(url: Url, options: ApiOptions = {}): ApiResult<T> => {
    if (!apiInstance) {
      apiInstance = $fetch.create({
        baseURL: config.public.apiBase,
        retry: 0,
      })
    }

    try {
      let statusCode: number = 0
      const result = await apiInstance<T>(url, {
        ...options,
        onResponse: (response) => {
          statusCode = response.response.status
        },
      })

      return right({
        data: result,
        statusCode,
      })
    }
    catch (error) {
      return left(getApiError(error))
    }
  }
}
