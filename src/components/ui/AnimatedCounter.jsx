import { useInView } from 'react-intersection-observer'
import { useCounter } from '@hooks/useCounter'
import { formatNumber } from '@utils/helpers'
import styles from './AnimatedCounter.module.css'

/**
 * Contador animado que dispara quando entra no viewport.
 */
export function AnimatedCounter({ value, suffix = '', prefix = '', duration = 2200 }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 })
  const count = useCounter({ target: value, duration, start: inView })

  return (
    <span ref={ref} className={styles.counter}>
      {prefix}
      <span className={styles.number}>{formatNumber(count)}</span>
      {suffix && <span className={styles.suffix}>{suffix}</span>}
    </span>
  )
}
