import { useCallback, useRef, useState } from 'react'

export function useToggle(initial = false) {
  const [value, setValue] = useState(initial)
  const toggle = useCallback(() => setValue((v) => !v), [])
  const setOn = useCallback(() => setValue(true), [])
  const setOff = useCallback(() => setValue(false), [])
  return { value, toggle, setOn, setOff }
}

export function useTimeout(callback: () => void, delay: number | null) {
  const saved = useRef(callback)
  saved.current = callback
  const id = useRef<ReturnType<typeof setTimeout> | null>(null)

  return useCallback(() => {
    if (id.current) clearTimeout(id.current)
    if (delay === null) return
    id.current = setTimeout(() => saved.current(), delay)
  }, [delay])
}