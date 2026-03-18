import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp, FaTimes } from 'react-icons/fa'
import { buildWALink } from '@utils/helpers'
import { useIsMobile } from '@hooks/useMediaQuery'
import styles from './WhatsAppFloat.module.css'

export function WhatsAppFloat() {
  const [showTooltip,     setShowTooltip]     = useState(false)
  const [showChatBubble,  setShowChatBubble]  = useState(false)
  const [bubbleDismissed, setBubbleDismissed] = useState(false)
  const isMobile = useIsMobile()

  // Tooltip após 3s
  useEffect(() => {
    const t = setTimeout(() => setShowTooltip(true), 3000)
    return () => clearTimeout(t)
  }, [])

  // Chat bubble após 8s
  useEffect(() => {
    if (bubbleDismissed) return
    const t = setTimeout(() => {
      setShowChatBubble(true)
      setShowTooltip(false)
    }, 8000)
    return () => clearTimeout(t)
  }, [bubbleDismissed])

  const dismissBubble = () => {
    setBubbleDismissed(true)
    setShowChatBubble(false)
  }

  const waLink = buildWALink()

  return (
    <div className={styles.wrap} aria-label="Botão flutuante WhatsApp">
      {/* ── Chat bubble ── */}
      <AnimatePresence>
        {showChatBubble && !bubbleDismissed && (
          <motion.div
            className={styles.chatBubble}
            initial={{ opacity: 0, x: 30, scale: 0.85 }}
            animate={{ opacity: 1, x: 0,  scale: 1    }}
            exit={{   opacity: 0, x: 20,  scale: 0.9  }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            role="alertdialog"
            aria-live="polite"
          >
            <button
              className={styles.bubbleClose}
              onClick={dismissBubble}
              aria-label="Fechar mensagem"
            >
              <FaTimes />
            </button>

            <div className={styles.bubbleAvatar} aria-hidden="true">TP</div>

            <div className={styles.bubbleContent}>
              <div className={styles.bubbleName}>Talitha Pedroso</div>
              <div className={styles.bubbleMsg}>
                👋 Olá! Quer agendar sua <strong>avaliação gratuita</strong>?
              </div>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.bubbleCta}
                onClick={dismissBubble}
                aria-label="Sim, quero agendar minha avaliação via WhatsApp"
              >
                Sim, quero! →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Tooltip ── */}
      <AnimatePresence>
        {showTooltip && !showChatBubble && !isMobile && (
          <motion.div
            className={styles.tooltip}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0  }}
            exit={{   opacity: 0, x: 10  }}
            transition={{ duration: 0.3 }}
            role="tooltip"
          >
            Fale conosco
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Botão principal ── */}
      <motion.a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.button}
        aria-label="Abrir WhatsApp para atendimento"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.94 }}
        onHoverStart={() => !showChatBubble && setShowTooltip(true)}
        onHoverEnd={() => setShowTooltip(false)}
      >
        {/* Ripples */}
        <span className={styles.ripple} style={{ animationDelay: '0s'    }} aria-hidden="true" />
        <span className={styles.ripple} style={{ animationDelay: '0.7s'  }} aria-hidden="true" />
        <span className={styles.ripple} style={{ animationDelay: '1.4s'  }} aria-hidden="true" />

        <FaWhatsapp className={styles.icon} aria-hidden="true" />
      </motion.a>
    </div>
  )
}
