import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import { FaBars, FaTimes, FaWhatsapp, FaInstagram } from 'react-icons/fa'
import { NAV_LINKS, BRAND } from '@utils/constants'
import { buildWALink, scrollToSection } from '@utils/helpers'
import { useIsMobile } from '@hooks/useMediaQuery'
import styles from './Navbar.module.css'

export function Navbar() {
  const [scrolled,     setScrolled]     = useState(false)
  const [drawerOpen,   setDrawerOpen]   = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const isMobile = useIsMobile()

  // Detecta scroll para aplicar glassmorphism
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Rastreia seção ativa via IntersectionObserver
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace('#', ''))
    const observers = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.35 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  // Fecha drawer ao redimensionar para desktop
  useEffect(() => {
    if (!isMobile && drawerOpen) setDrawerOpen(false)
  }, [isMobile, drawerOpen])

  // Bloqueia scroll quando drawer abre
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  const handleNavClick = (href) => {
    scrollToSection(href)
    setDrawerOpen(false)
  }

  return (
    <>
      <motion.header
        className={clsx(styles.header, scrolled && styles.scrolled)}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.8 }}
        role="banner"
      >
        <nav className={styles.nav} aria-label="Navegação principal">
          {/* Logo / Monograma */}
          <button
            className={styles.logo}
            onClick={() => handleNavClick('#hero')}
            aria-label="Ir ao início"
          >
            <span className={styles.logoMono}>TP</span>
            {!isMobile && (
              <span className={styles.logoText}>Talitha Pedroso</span>
            )}
          </button>

          {/* Links — desktop */}
          <ul className={styles.links} role="list">
            {NAV_LINKS.map((link) => {
              const id = link.href.replace('#', '')
              return (
                <li key={link.href}>
                  <button
                    className={clsx(styles.link, activeSection === id && styles.active)}
                    onClick={() => handleNavClick(link.href)}
                    aria-current={activeSection === id ? 'page' : undefined}
                  >
                    {link.label}
                    {activeSection === id && (
                      <motion.span
                        className={styles.activeBar}
                        layoutId="activeBar"
                        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                      />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>

          {/* CTA + Social — desktop */}
          <div className={styles.actions}>
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconBtn}
              aria-label="Instagram de Talitha Pedroso"
            >
              <FaInstagram />
            </a>
            <a
              href={buildWALink()}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaBtn}
              aria-label="Agendar via WhatsApp"
            >
              <FaWhatsapp />
              <span>Agendar</span>
            </a>
          </div>

          {/* Hamburger — mobile */}
          <button
            className={styles.hamburger}
            onClick={() => setDrawerOpen((v) => !v)}
            aria-label={drawerOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={drawerOpen}
          >
            <AnimatePresence mode="wait">
              {drawerOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{   rotate:  90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaTimes />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0,  opacity: 1 }}
                  exit={{   rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaBars />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </motion.header>

      {/* ── Drawer lateral — mobile ── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className={styles.drawer}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navegação"
            >
              {/* Header do drawer */}
              <div className={styles.drawerHeader}>
                <span className={styles.drawerLogo}>TP</span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className={styles.drawerClose}
                  aria-label="Fechar menu"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Links */}
              <nav className={styles.drawerNav}>
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.href}
                    className={styles.drawerLink}
                    onClick={() => handleNavClick(link.href)}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.35 }}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>

              {/* Rodapé do drawer */}
              <div className={styles.drawerFooter}>
                <a
                  href={buildWALink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.drawerCta}
                >
                  <FaWhatsapp />
                  Agendar Avaliação Gratuita
                </a>
                <a
                  href={BRAND.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.drawerInstagram}
                >
                  <FaInstagram />
                  {BRAND.instagramHandle}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
