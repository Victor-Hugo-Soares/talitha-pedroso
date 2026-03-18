import { useEffect, useRef, useState } from 'react'

/**
 * Hook customizado com IntersectionObserver para animações ao scroll.
 * @param {object} options
 * @param {number}  options.threshold   - % do elemento visível para disparar (0–1)
 * @param {boolean} options.triggerOnce - dispara apenas uma vez
 * @param {string}  options.rootMargin  - margem do viewport
 * @returns {[React.RefObject, boolean]} [ref, isVisible]
 */
export function useScrollReveal({
  threshold = 0.15,
  triggerOnce = true,
  rootMargin = '0px 0px -80px 0px',
} = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) observer.unobserve(element)
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, triggerOnce, rootMargin])

  return [ref, isVisible]
}
