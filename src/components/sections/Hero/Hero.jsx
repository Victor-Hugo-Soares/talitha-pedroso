import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FaWhatsapp, FaChevronDown, FaStar } from 'react-icons/fa'
import { ParticleField } from '@components/ui/ParticleField'
import { Button } from '@components/ui/Button'
import { BRAND } from '@utils/constants'
import { buildWALink, scrollToSection } from '@utils/helpers'
import styles from './Hero.module.css'

const titleWords = ['Beleza', 'que', 'transforma,', 'cuidado', 'que', 'permanece.']

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
}

const wordVariants = {
  hidden:  { opacity: 0, y: 40, rotateX: -20 },
  visible: { opacity: 1, y: 0,  rotateX: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
}

const subtitleVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut', delay: 0.8 } },
}

const badgesVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 1.0 } },
}

const badgeVariants = {
  hidden:  { opacity: 0, scale: 0.8, y: 10 },
  visible: { opacity: 1, scale: 1,   y: 0,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } },
}

const ctasVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0,
    transition: { duration: 0.7, ease: 'easeOut', delay: 1.3 } },
}

export function Hero() {
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const bgY   = useTransform(scrollY, [0, 600], [0, 100])
  const textY = useTransform(scrollY, [0, 600], [0, 60])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <section
      id="hero"
      className={styles.hero}
      ref={heroRef}
      aria-label="Bem-vindo à Talitha Pedroso Clínica de Estética"
    >
      {/* ── Fundo com parallax ── */}
      <motion.div className={styles.bg} style={{ y: bgY }}>
        <div className={styles.bgGradient} />
        <div className={styles.bgPattern} />
      </motion.div>

      {/* ── Partículas douradas ── */}
      <ParticleField count={65} />

      {/* ── Conteúdo ── */}
      <motion.div className={styles.content} style={{ y: textY, opacity }}>
        {/* Label topo */}
        <motion.div
          className={styles.topLabel}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.topLabelDot} />
          <span>Franco da Rocha – SP</span>
          <div className={styles.topLabelDot} />
        </motion.div>

        {/* Título animado — palavra por palavra */}
        <motion.h1
          className={styles.title}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          aria-label={titleWords.join(' ')}
        >
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              className={styles.word}
              variants={wordVariants}
              style={{ display: 'inline-block', marginRight: '0.3em' }}
            >
              {/* Palavras de destaque em ouro */}
              {['transforma,', 'permanece.'].includes(word)
                ? <span className={styles.wordGold}>{word}</span>
                : word
              }
            </motion.span>
          ))}
        </motion.h1>

        {/* Linha dourada shimmer */}
        <motion.div
          className={styles.shimmerLine}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Subtítulo */}
        <motion.p
          className={styles.subtitle}
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
        >
          Clínica de estética premium em Franco da Rocha com protocolos
          personalizados, tecnologia de ponta e{' '}
          <strong>resultados que você pode ver</strong>.
        </motion.p>

        {/* Badges de prova social */}
        <motion.div
          className={styles.badges}
          variants={badgesVariants}
          initial="hidden"
          animate="visible"
          aria-label="Destaques da clínica"
        >
          {[
            { icon: <FaStar />, text: `${BRAND.googleRating} Google · ${BRAND.googleReviews}+ avaliações` },
            { icon: '🏆',       text: `${BRAND.yearsExp} anos de experiência` },
            { icon: '👥',       text: `${BRAND.followers} seguidores` },
          ].map((b, i) => (
            <motion.div key={i} className={styles.badge} variants={badgeVariants}>
              <span className={styles.badgeIcon}>{b.icon}</span>
              <span>{b.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          className={styles.ctas}
          variants={ctasVariants}
          initial="hidden"
          animate="visible"
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
            onClick={() => scrollToSection('#tratamentos')}
            aria-label="Ver nossos tratamentos"
          >
            Ver Tratamentos
          </Button>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.button
        className={styles.scrollIndicator}
        onClick={() => scrollToSection('#sobre')}
        aria-label="Rolar para baixo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.6 }}
      >
        <span className={styles.scrollText}>Role para explorar</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FaChevronDown />
        </motion.div>
      </motion.button>

      {/* Onda de separação */}
      <div className={styles.wave} aria-hidden="true">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 80H1440V30C1200 70 960 20 720 40C480 60 240 10 0 50V80Z" fill="#F5F2EE" />
        </svg>
      </div>
    </section>
  )
}
