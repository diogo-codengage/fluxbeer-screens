import { useRef, useEffect, useCallback } from 'react'

export function useThrottle(fun, timeout) {
  const timer = useRef(null)

  const cancel = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current)

      timer.current = null
    }
  }, [timer])

  useEffect(() => {
    cancel()
  }, [cancel])

  return (...args) => {
    cancel()

    timer.current = setTimeout(() => {
      timer.current = null

      fun.apply(this, args)
    }, timeout)
  }
}
