import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useIsMobile } from '@hooks/useMediaQuery'
import styles from './CustomCursor.module.css'

/**
 * Cursor customizado dourado — apenas em desktop.
 * Ponto pequeno interno + anel externo com spring lag.
 */
export function CustomCursor() {
  const isMobile = useIsMobile()
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)

  const x = useSpring(rawX, { stiffness: 500, damping: 28, mass: 0.4 })
  const y = useSpring(rawY, { stiffness: 500, damping: 28, mass: 0.4 })

  const ringX = useSpring(rawX, { stiffness: 160, damping: 22, mass: 0.6 })
  const ringY = useSpring(rawY, { stiffness: 160, damping: 22, mass: 0.6 })

  useEffect(() => {
    if (isMobile) return

    const move = (e) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const enter = () => setIsHovering(true)
    const leave = () => setIsHovering(false)

    window.addEventListener('mousemove', move, { passive: true })

    const interactives = document.querySelectorAll(
      'a, button, [role="button"], input, label, select, textarea, [tabindex]'
    )
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })

    return () => {
      window.removeEventListener('mousemove', move)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mouseleave', leave)
      })
    }
  }, [isMobile, isVisible, rawX, rawY])

  if (isMobile) return null

  return (
    <>
      {/* Dot interno */}
      <motion.div
        className={styles.dot}
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: isHovering ? 0 : 1, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      />
      {/* Anel externo */}
      <motion.div
        className={styles.ring}
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale:   isHovering ? 1.8 : 1,
          opacity: isVisible  ? 1   : 0,
          borderColor: isHovering
            ? 'rgba(201, 146, 58, 0.7)'
            : 'rgba(201, 146, 58, 0.4)',
        }}
        transition={{ duration: 0.25 }}
      />
    </>
  )
}
