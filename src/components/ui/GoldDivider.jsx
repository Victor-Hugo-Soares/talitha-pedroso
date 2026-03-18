import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import styles from './GoldDivider.module.css'

/**
 * Separador ornamental dourado com animação de reveal.
 */
export function GoldDivider({ centered = true, className = '' }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 })

  return (
    <motion.div
      ref={ref}
      className={`${styles.divider} ${centered ? styles.centered : ''} ${className}`}
      initial={{ opacity: 0, scaleX: 0 }}
      animate={inView ? { opacity: 1, scaleX: 1 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.line} />
      <div className={styles.ornament}>
        <span className={styles.diamond} />
        <span className={styles.dot} />
        <span className={`${styles.diamond} ${styles.small}`} />
        <span className={styles.dot} />
        <span className={styles.diamond} />
      </div>
      <div className={styles.line} />
    </motion.div>
  )
}
