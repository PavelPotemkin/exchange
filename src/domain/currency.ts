export enum CURRENCY_TYPE {
  FIAT = 'FIAT',
  CRYPTO = 'CRYPTO',
}

export enum FIAT_TYPE {
  INTERNATIONAL = 'INTERNATIONAL',
  CIS = 'CIS',
}

export enum CRYPTO_ADDRESS_VALIDATOR {
  BTC_ADDRESS = 'BTC_ADDRESS',
  ERC_ADDRESS = 'ERC_ADDRESS',
  TRC_ADDRESS = 'TRC_ADDRESS',
}

export type ICurrencyId = Branded<UUID, 'CurrencyId'>

export type ICurrency = {
  id: ICurrencyId
  name: string
  code: string
  iconFile: {
    fileId: string
    fileSize: number
    url: string
  }
  accuracy: number
  minLimit: string
} & (
    {
      type: CURRENCY_TYPE.FIAT
      fiatType: FIAT_TYPE
      network?: undefined
      addressValidationRule?: undefined
    } | {
      type: CURRENCY_TYPE.CRYPTO
      network: string
      addressValidationRule: CRYPTO_ADDRESS_VALIDATOR
      fiatType?: undefined
    }
  )

export type ICurrencies = Array<ICurrency>

export const getFiatCurrencies = (currencies: ICurrencies): ICurrencies => {
  return currencies.filter(currency => currency.type === CURRENCY_TYPE.FIAT)
}

export const getCryptoCurrencies = (currencies: ICurrencies): ICurrencies => {
  return currencies.filter(currency => currency.type === CURRENCY_TYPE.CRYPTO)
}

export const getCurrencyById = (currencyId: ICurrencyId, currencies: ICurrencies): ICurrency | null => {
  return currencies.find(currency => currency.id === currencyId) ?? null
}

export const getSameTypeCurrenciesById = (currencyId: ICurrencyId, currencies: ICurrencies): ICurrencies => {
  const inputCurrency = getCurrencyById(currencyId, currencies)
  if (!inputCurrency) {
    throw new Error('Currency not found')
  }

  if (inputCurrency.type === CURRENCY_TYPE.CRYPTO) {
    return getCryptoCurrencies(currencies)
  }
  else {
    return getFiatCurrencies(currencies)
  }
}
