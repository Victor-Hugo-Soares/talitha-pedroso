import { useState, useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import { FaTimes, FaWhatsapp, FaCheck } from 'react-icons/fa'
import { buildWALink } from '@utils/helpers'
import styles from './Services.module.css'

function ServiceModal({ service, onClose }) {
  return createPortal(
    <AnimatePresence>
      <motion.div
        className={styles.modalBackdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Detalhes: ${service.name}`}
      >
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0, scale: 0.88, y: 40 }}
          animate={{ opacity: 1, scale: 1,    y: 0  }}
          exit={{   opacity: 0, scale: 0.92,   y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className={styles.modalClose} onClick={onClose} aria-label="Fechar">
            <FaTimes />
          </button>

          <div className={styles.modalIcon}>{service.icon}</div>
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>{service.name}</h3>
            {service.tag && (
              <span className={`${styles.tag} ${styles[`tag_${service.tagColor}`]}`}>
                {service.tag}
              </span>
            )}
          </div>

          <p className={styles.modalDesc}>{service.detail}</p>

          {service.beneficios?.length > 0 && (
            <div className={styles.modalBenefits}>
              <h4 className={styles.modalBenefitsTitle}>Benefícios</h4>
              <ul className={styles.modalBenefitsList}>
                {service.beneficios.map((b, i) => (
                  <li key={i}>
                    <FaCheck className={styles.checkIcon} aria-hidden="true" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <a
            href={buildWALink(`Olá! Tenho interesse em ${service.name}. Gostaria de mais informações.`)}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.modalCta}
          >
            <FaWhatsapp />
            Agendar {service.name}
          </a>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}

export function ServiceCard({ service, index }) {
  const [isOpen, setIsOpen] = useState(false)
  const cardRef = useRef(null)

  // 3D tilt
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-60, 60], [ 8, -8]), { stiffness: 300, damping: 25 })
  const rotateY = useSpring(useTransform(x, [-60, 60], [-8,  8]), { stiffness: 300, damping: 25 })

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    x.set(e.clientX - rect.left - rect.width  / 2)
    y.set(e.clientY - rect.top  - rect.height / 2)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <>
      <motion.article
        ref={cardRef}
        className={styles.card}
        style={{ rotateX, rotateY, transformPerspective: 800 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => setIsOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setIsOpen(true)}
        aria-label={`Ver detalhes de ${service.name}`}
      >
        {/* Aurora gradient hover */}
        <div className={styles.cardAurora} aria-hidden="true" />

        {/* Tag */}
        {service.tag && (
          <span className={`${styles.tag} ${styles[`tag_${service.tagColor || 'gold'}`]}`}>
            {service.tag}
          </span>
        )}

        {/* Ícone com float */}
        <motion.div
          className={styles.cardIcon}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.5 + index * 0.3, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          {service.icon}
        </motion.div>

        <h3 className={styles.cardName}>{service.name}</h3>
        <p className={styles.cardDesc}>{service.desc}</p>

        <span className={styles.cardCta}>
          Saiba mais →
        </span>
      </motion.article>

      {isOpen && <ServiceModal service={service} onClose={() => setIsOpen(false)} />}
    </>
  )
}
