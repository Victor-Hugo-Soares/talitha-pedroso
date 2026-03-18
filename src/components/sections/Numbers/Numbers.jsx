import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { AnimatedCounter } from '@components/ui/AnimatedCounter'
import { SectionLabel } from '@components/ui/SectionLabel'
import { GoldDivider } from '@components/ui/GoldDivider'
import { numbers } from '@data/numbers'
import styles from './Numbers.module.css'

export function Numbers() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section
      id="numeros"
      className={styles.section}
      aria-label="Nossos números"
      ref={ref}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <SectionLabel centered>Resultados em Números</SectionLabel>

          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Confiança construída com <span className={styles.titleAccent}>resultados reais</span>
          </motion.h2>

          <GoldDivider centered />
        </div>

        <div
          className={styles.grid}
          role="list"
          aria-label="Estatísticas da clínica"
        >
          {numbers.map((num, i) => (
            <motion.div
              key={num.id}
              className={styles.card}
              role="listitem"
              initial={{ opacity: 0, y: 32, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.icon} aria-hidden="true">{num.icon}</span>

              <div
                className={styles.value}
                aria-label={`${num.value}${num.suffix} ${num.label}`}
              >
                <AnimatedCounter
                  value={num.value}
                  suffix={num.suffix}
                  duration={2200}
                />
              </div>

              <div className={styles.label}>{num.label}</div>

              {num.sublabel && (
                <div className={styles.sublabel}>{num.sublabel}</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
