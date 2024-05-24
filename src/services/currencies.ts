import type { CRYPTO_ADDRESS_VALIDATOR, FIAT_TYPE, ICurrencyId } from '../domain/currency'
import { CURRENCY_TYPE } from '../domain/currency'
import { API_URLS } from '../shared/lib/constants'
import { useApi } from './api'
import type { CurrenciesApiService } from '~/src/application/ports'

type IApiCurrency = {
  id: ICurrencyId
  code: string
  name: string
  name_en: string
  icon_file: {
    file_id: UUID
    file_size: number
    url: Url
  }
  mapping_accuracy: number
  min_limit: NumberLike
} & (
  {
    type: CURRENCY_TYPE.FIAT
    fiat_type: FIAT_TYPE
    network?: undefined
    address_validation_rule?: undefined
  } | {
    type: CURRENCY_TYPE.CRYPTO
    network: string
    address_validation_rule: CRYPTO_ADDRESS_VALIDATOR
    fiat_type?: undefined
  }
)

export const useCurrenciesApiService = (): CurrenciesApiService => {
  const api = useApi()

  return {
    async getAll() {
      return (
        await api<Array<IApiCurrency>>(API_URLS.CURRENCIES_LIST)
      ).mapRight(currencies => currencies.map((currency) => {
        return {
          id: currency.id,
          name: currency.name,
          code: currency.code,
          iconFile: {
            fileId: currency.icon_file.file_id,
            fileSize: currency.icon_file.file_size,
            url: currency.icon_file.url,
          },
          accuracy: currency.mapping_accuracy,
          minLimit: currency.min_limit,
          ...(
            currency.type === CURRENCY_TYPE.FIAT
              ? {
                  type: CURRENCY_TYPE.FIAT,
                  fiatType: currency.fiat_type,
                }
              : {
                  type: CURRENCY_TYPE.CRYPTO,
                  network: currency.network,
                  addressValidationRule: currency.address_validation_rule,
                }
          ),
        }
      }))
    },
  }
}
