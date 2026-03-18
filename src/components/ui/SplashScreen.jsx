import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './SplashScreen.module.css'

/**
 * Tela de carregamento inicial com monograma "TP" dourado.
 * Exibida por ~1.6s e depois faz fade out.
 */
export function SplashScreen({ duration = 1600 }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration)
    return () => clearTimeout(timer)
  }, [duration])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.splash}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          {/* Partículas de fundo */}
          <div className={styles.particles}>
            {Array.from({ length: 18 }).map((_, i) => (
              <span key={i} className={styles.particle} style={{ '--i': i }} />
            ))}
          </div>

          {/* Monograma */}
          <motion.div
            className={styles.content}
            initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div className={styles.monogram}>TP</div>
            <motion.div
              className={styles.tagline}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Clínica de Estética
            </motion.div>

            {/* Linha dourada animada */}
            <motion.div
              className={styles.line}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
