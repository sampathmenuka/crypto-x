import { useState, useEffect, useRef } from 'react'

/**
 * Debounce a value by `delay` ms.
 */
export function useDebounce<T>(value: T, delay = 400): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debouncedValue
}

/**
 * Detect clicks outside a referenced element.
 */
export function useClickOutside<T extends HTMLElement>(callback: () => void) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [callback])
  return ref
}

/**
 * Simple local-storage state hook.
 */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initial
    } catch {
      return initial
    }
  })
  const setStored = (v: T | ((prev: T) => T)) => {
    const next = v instanceof Function ? v(value) : v
    setValue(next)
    localStorage.setItem(key, JSON.stringify(next))
  }
  return [value, setStored] as const
}

/**
 * Returns previous value of a reactive variable.
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()
  useEffect(() => { ref.current = value }, [value])
  return ref.current
}

/**
 * Flash a boolean for a given duration (useful for price-change animations).
 */
export function useFlash(trigger: unknown, duration = 600): boolean {
  const [flashing, setFlashing] = useState(false)
  const prev = usePrevious(trigger)
  useEffect(() => {
    if (prev !== undefined && prev !== trigger) {
      setFlashing(true)
      const t = setTimeout(() => setFlashing(false), duration)
      return () => clearTimeout(t)
    }
  }, [trigger, prev, duration])
  return flashing
}
