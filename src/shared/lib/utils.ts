export const formatAmount = (amount: number) => {
  return amount.toLocaleString('ru-RU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
}
