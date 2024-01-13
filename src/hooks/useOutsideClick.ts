import { useEffect, useRef } from 'react'

export const useOutsideClick = <T extends HTMLElement>(
  fn?: () => void,
  capture: boolean = false
) => {
  const ref = useRef<T>()

  useEffect(() => {
    function cb(e: MouseEvent) {
      if (!ref.current) return

      if (ref.current.contains(e.target as Node)) return

      fn?.()
    }
    document.addEventListener('click', cb)

    return () => document.removeEventListener('click', cb, { capture })
  }, [fn, capture])

  return ref
}
