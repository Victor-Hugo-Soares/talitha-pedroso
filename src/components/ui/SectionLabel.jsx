import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import styles from './SectionLabel.module.css'

/**
 * Label de seção com linha dourada e texto caps.
 * Ex: "SOBRE A FUNDADORA" | "NOSSOS TRATAMENTOS"
 */
export function SectionLabel({ children, light = false, centered = false }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 })

  return (
    <motion.div
      ref={ref}
      className={`${styles.wrap} ${centered ? styles.centered : ''}`}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <span className={`${styles.line} ${light ? styles.light : ''}`} />
      <span className={`${styles.label} ${light ? styles.light : ''}`}>
        {children}
      </span>
      <span className={`${styles.line} ${light ? styles.light : ''}`} />
    </motion.div>
  )
}
