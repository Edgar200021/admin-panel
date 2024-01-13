export const formatDate = (
  date: Date,
  options?: Intl.DateTimeFormatOptions,
  locales: string | string[] = 'ru-RU'
) => {
  return Intl.DateTimeFormat(locales, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    ...options,
  }).format(date)
}
