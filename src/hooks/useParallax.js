import { useEffect, useRef, useState } from 'react'

/**
 * Hook de parallax leve — retorna o offset vertical baseado no scroll.
 * @param {number} factor - intensidade do parallax (0.1 a 0.5)
 * @returns {number} offset em pixels
 */
export function useParallax(factor = 0.25) {
  const [offset, setOffset] = useState(0)
  const ticking = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setOffset(window.scrollY * factor)
          ticking.current = false
        })
        ticking.current = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [factor])

  return offset
}

/**
 * Hook de parallax com efeito de mouse (deslocamento sutil com o cursor)
 * @returns {{ x: number, y: number }} deslocamento normalizado -1 a 1
 */
export function useMouseParallax() {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPos({
        x: (e.clientX / window.innerWidth  - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return pos
}
