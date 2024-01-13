import { useEffect, useState } from 'react'

export const useDebounce = (initialValue: number | string, timerMs = 1000) => {
  const [value, setValue] = useState<typeof initialValue>()

  useEffect(() => {
    const timerId = setTimeout(() => setValue(initialValue), timerMs)

    return () => clearTimeout(timerId)
  }, [timerMs, initialValue])

  return value
}
