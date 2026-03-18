import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaWhatsapp } from 'react-icons/fa'
import { BsStars } from 'react-icons/bs'
import { buildWALinkPreFilled } from '@utils/helpers'
import styles from './AIChatBot.module.css'

const STEPS = [
  {
    id:       'service',
    question: 'Qual tratamento te interessa?',
    subtitle: 'Selecione para ver a melhor opção para você',
    options: [
      { label: 'Lipo sem Cortes', icon: '🫧' },
      { label: 'Criolipólise',    icon: '❄️' },
      { label: 'Injetáveis',      icon: '💉' },
      { label: 'Ozônioterapia',   icon: '🫁' },
      { label: 'Limpeza de Pele', icon: '✨' },
      { label: 'Lipedema',        icon: '🩺' },
    ],
  },
  {
    id:       'goal',
    question: 'Qual seu principal objetivo?',
    subtitle: 'Isso nos ajuda a personalizar seu protocolo',
    options: [
      { label: 'Emagrecer / Modelar', icon: '⚖️' },
      { label: 'Cuidar da Pele',      icon: '🌿' },
      { label: 'Tratar Lipedema',     icon: '💪' },
      { label: 'Harmonia Facial',     icon: '✨' },
    ],
  },
  {
    id:       'name',
    question: 'Qual é o seu nome?',
    subtitle: 'Para personalizarmos sua mensagem',
    type:     'input',
  },
]

export function AIChatBot() {
  const [isOpen,  setIsOpen]  = useState(false)
  const [step,    setStep]    = useState(0)
  const [answers, setAnswers] = useState({ service: '', goal: '', name: '' })
  const [nameVal, setNameVal] = useState('')

  const currentStep = STEPS[step]

  const handleOption = (option) => {
    const newAnswers = { ...answers, [currentStep.id]: option.label }
    setAnswers(newAnswers)
    if (step < STEPS.length - 1) setStep(step + 1)
  }

  const handleNameSubmit = (e) => {
    e.preventDefault()
    if (!nameVal.trim()) return
    const newAnswers = { ...answers, name: nameVal.trim() }
    setAnswers(newAnswers)
    setStep(STEPS.length) // done
  }

  const handleReset = () => {
    setStep(0)
    setAnswers({ service: '', goal: '', name: '' })
    setNameVal('')
  }

  const waLink = buildWALinkPreFilled({
    name:    answers.name,
    service: answers.service,
    goal:    answers.goal,
  })

  return (
    <>
      {/* ── Botão flutuante ── */}
      <motion.button
        className={styles.trigger}
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1   }}
        transition={{ delay: 3.5, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        aria-label="Abrir quiz de recomendação de tratamento"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <BsStars className={styles.triggerIcon} aria-hidden="true" />
      </motion.button>

      {/* ── Modal ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              animate={{ opacity: 1, y: 0,  scale: 1    }}
              exit={{   opacity: 0, y: 24,  scale: 0.95 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Quiz de recomendação de tratamento"
            >
              {/* Header */}
              <div className={styles.header}>
                <div className={styles.headerLeft}>
                  <BsStars className={styles.headerIcon} aria-hidden="true" />
                  <div>
                    <div className={styles.headerTitle}>Recomendação Personalizada</div>
                    <div className={styles.headerSub}>
                      {step < STEPS.length
                        ? `Passo ${step + 1} de ${STEPS.length}`
                        : 'Pronto!'}
                    </div>
                  </div>
                </div>
                <button
                  className={styles.closeBtn}
                  onClick={() => setIsOpen(false)}
                  aria-label="Fechar"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Progress bar */}
              {step < STEPS.length && (
                <div className={styles.progress} aria-hidden="true">
                  <motion.div
                    className={styles.progressBar}
                    animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              )}

              {/* ── Corpo ── */}
              <div className={styles.body}>
                <AnimatePresence mode="wait">
                  {/* Etapas de opções */}
                  {step < STEPS.length && (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0  }}
                      exit={{   opacity: 0, x: -30 }}
                      transition={{ duration: 0.35 }}
                    >
                      <h3 className={styles.question}>{currentStep.question}</h3>
                      {currentStep.subtitle && (
                        <p className={styles.questionSub}>{currentStep.subtitle}</p>
                      )}

                      {/* Input de nome */}
                      {currentStep.type === 'input' ? (
                        <form onSubmit={handleNameSubmit} className={styles.nameForm}>
                          <input
                            type="text"
                            value={nameVal}
                            onChange={(e) => setNameVal(e.target.value)}
                            placeholder="Seu primeiro nome..."
                            className={styles.nameInput}
                            autoFocus
                            maxLength={40}
                            aria-label="Seu nome"
                          />
                          <button
                            type="submit"
                            className={styles.nameSubmit}
                            disabled={!nameVal.trim()}
                          >
                            Continuar →
                          </button>
                        </form>
                      ) : (
                        /* Grid de opções */
                        <div className={styles.options}>
                          {currentStep.options.map((opt) => (
                            <button
                              key={opt.label}
                              className={styles.option}
                              onClick={() => handleOption(opt)}
                            >
                              <span className={styles.optionIcon}>{opt.icon}</span>
                              <span className={styles.optionLabel}>{opt.label}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Resultado final */}
                  {step >= STEPS.length && (
                    <motion.div
                      key="result"
                      className={styles.result}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1   }}
                      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                      <div className={styles.resultEmoji}>🎉</div>
                      <h3 className={styles.resultTitle}>
                        Ótimo, {answers.name}!
                      </h3>
                      <p className={styles.resultDesc}>
                        Sua mensagem está pronta com suas preferências:{' '}
                        <strong>{answers.service}</strong> para{' '}
                        <strong>{answers.goal}</strong>.
                        Clique abaixo para enviar direto ao WhatsApp!
                      </p>

                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.resultCta}
                        onClick={() => setIsOpen(false)}
                      >
                        <FaWhatsapp />
                        Enviar mensagem no WhatsApp
                      </a>

                      <button className={styles.resultReset} onClick={handleReset}>
                        Refazer o quiz
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
