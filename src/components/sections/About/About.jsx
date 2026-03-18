import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaQuoteLeft } from 'react-icons/fa'
import { SectionLabel } from '@components/ui/SectionLabel'
import { GoldDivider } from '@components/ui/GoldDivider'
import { Button } from '@components/ui/Button'
import { credentials, founderInfo } from '@data/credentials'
import { buildWALink } from '@utils/helpers'
import styles from './About.module.css'

export function About() {
  const { ref: photoRef, inView: photoInView } = useInView({ triggerOnce: true, threshold: 0.3 })
  const { ref: textRef,  inView: textInView  } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section id="sobre" className={styles.section} aria-label="Sobre Talitha Pedroso">
      <div className={styles.container}>
        {/* ── Coluna da foto ── */}
        <div className={styles.photoCol} ref={photoRef}>
          <div className={styles.photoWrap}>
            {/* Moldura decorativa */}
            <div className={styles.photoFrame} />

            {/* Imagem com curtain reveal */}
            <div className={styles.photoInner}>
              <motion.div
                className={styles.photoCurtain}
                initial={{ scaleX: 1 }}
                animate={photoInView ? { scaleX: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: 'right' }}
              />
              <img
                src="/images/talitha-perfil.jpg"
                alt="Talitha Pedroso — Biomédica Esteta e fundadora da clínica"
                className={styles.photo}
                loading="lazy"
                width="480"
                height="600"
              />
            </div>

            {/* Badge flutuante */}
            <motion.div
              className={styles.badge}
              initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
              animate={photoInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              aria-label="10 anos de experiência"
            >
              <span className={styles.badgeNum}>10+</span>
              <span className={styles.badgeTxt}>anos de<br />experiência</span>
            </motion.div>

            {/* Badge Harvard */}
            <motion.div
              className={`${styles.badge} ${styles.badgeHarvard}`}
              initial={{ opacity: 0, scale: 0.6, rotate: 10 }}
              animate={photoInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ delay: 1.1, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <span className={styles.badgeEmoji}>🎓</span>
              <span className={styles.badgeTxt}>Harvard<br />Portugal</span>
            </motion.div>
          </div>
        </div>

        {/* ── Coluna de texto ── */}
        <div className={styles.textCol} ref={textRef}>
          <SectionLabel>Sobre a Fundadora</SectionLabel>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={textInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className={styles.name}>{founderInfo.name}</h2>
            <p className={styles.role}>{founderInfo.role}</p>
          </motion.div>

          <GoldDivider centered={false} />

          {/* Quote */}
          <motion.blockquote
            className={styles.quote}
            initial={{ opacity: 0, x: -20 }}
            animate={textInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            <FaQuoteLeft className={styles.quoteIcon} aria-hidden="true" />
            <p>{founderInfo.quote}</p>
          </motion.blockquote>

          {/* Bio */}
          <motion.p
            className={styles.bio}
            initial={{ opacity: 0, y: 16 }}
            animate={textInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          >
            {founderInfo.bio}
          </motion.p>

          {/* Credenciais */}
          <motion.div
            className={styles.credentials}
            initial="hidden"
            animate={textInView ? 'visible' : 'hidden'}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } },
            }}
            role="list"
            aria-label="Credenciais de Talitha Pedroso"
          >
            {credentials.map((c) => (
              <motion.div
                key={c.id}
                className={styles.credential}
                role="listitem"
                variants={{
                  hidden:  { opacity: 0, x: -16 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
                }}
              >
                <span className={styles.credIcon} aria-hidden="true">{c.icon}</span>
                <div>
                  <div className={styles.credTitle}>{c.title}</div>
                  <div className={styles.credDesc}>{c.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={textInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <Button
              variant="primary"
              size="lg"
              href={buildWALink('Olá Talitha! Gostaria de conhecer melhor a clínica e agendar uma avaliação.')}
              aria-label="Conhecer a clínica via WhatsApp"
            >
              Conhecer a Clínica
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
