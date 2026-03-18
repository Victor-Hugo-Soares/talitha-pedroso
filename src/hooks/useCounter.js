import { useState, useEffect, useRef } from 'react'

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

/**
 * Hook para animação de contagem numérica com easing suave.
 * @param {object} params
 * @param {number}  params.target   - valor final
 * @param {number}  params.duration - duração em ms (padrão 2000)
 * @param {boolean} params.start    - dispara a animação quando true
 * @returns {number} valor atual animado
 */
export function useCounter({ target, duration = 2000, start = false }) {
  const [count, setCount] = useState(0)
  const frameRef    = useRef(null)
  const startTimeRef = useRef(null)

  useEffect(() => {
    if (!start) return

    startTimeRef.current = null

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp

      const elapsed  = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      const eased    = easeOutExpo(progress)

      setCount(Math.floor(eased * target))

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [start, target, duration])

  return count
}
