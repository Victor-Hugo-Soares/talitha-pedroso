import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaWhatsapp, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa'
import { SectionLabel } from '@components/ui/SectionLabel'
import { GoldDivider } from '@components/ui/GoldDivider'
import { Button } from '@components/ui/Button'
import { BRAND } from '@utils/constants'
import { buildWALink } from '@utils/helpers'
import styles from './CtaFinal.module.css'

export function CtaFinal() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section
      id="contato"
      className={styles.section}
      aria-label="Agendar atendimento"
    >
      {/* Partículas decorativas */}
      <div className={styles.particles} aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className={styles.particle} style={{ '--i': i }} />
        ))}
      </div>

      <div className={styles.container} ref={ref}>
        {/* Header */}
        <div className={styles.header}>
          <SectionLabel light centered>Agende Agora</SectionLabel>

          <motion.div
            className={styles.scriptTitle}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            aria-hidden="true"
          >
            Sua transformação
          </motion.div>

          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            começa com <span className={styles.titleAccent}>uma avaliação gratuita</span>
          </motion.h2>

          <GoldDivider centered />

          <motion.p
            className={styles.desc}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            Entre em contato agora e descubra o protocolo ideal para o seu biótipo.
            Atendimento personalizado · Resultados reais · Equipe especializada.
          </motion.p>
        </div>

        {/* CTAs */}
        <motion.div
          className={styles.ctas}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <Button
            variant="whatsapp"
            size="lg"
            href={buildWALink()}
            aria-label="Agendar avaliação gratuita via WhatsApp"
          >
            Agendar Avaliação Gratuita
          </Button>
          <Button
            variant="ghost"
            size="lg"
            href={BRAND.instagram}
            aria-label="Seguir no Instagram"
          >
            <FaInstagram />
            Instagram
          </Button>
        </motion.div>

        {/* Info cards */}
        <motion.div
          className={styles.infoGrid}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
          }}
        >
          {[
            {
              icon: <FaWhatsapp />,
              title: 'WhatsApp',
              value: BRAND.phoneFormatted,
              href:  buildWALink(),
              color: '#25D366',
            },
            {
              icon: <FaMapMarkerAlt />,
              title: 'Endereço',
              value: BRAND.address,
              href:  `https://maps.google.com/?q=${encodeURIComponent(BRAND.address)}`,
              color: 'var(--color-gold)',
            },
            {
              icon: <span style={{ fontSize: '1.1rem' }}>🕐</span>,
              title: 'Horário',
              value: BRAND.hours,
              href:  null,
              color: 'var(--color-gold)',
            },
          ].map((info, i) => (
            <motion.div
              key={i}
              className={styles.infoCard}
              variants={{
                hidden:  { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
              }}
            >
              <span className={styles.infoIcon} style={{ color: info.color }} aria-hidden="true">
                {info.icon}
              </span>
              <div className={styles.infoTitle}>{info.title}</div>
              {info.href ? (
                <a href={info.href} target="_blank" rel="noopener noreferrer" className={styles.infoValue}>
                  {info.value}
                </a>
              ) : (
                <div className={styles.infoValue}>{info.value}</div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
