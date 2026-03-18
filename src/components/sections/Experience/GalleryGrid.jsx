import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import styles from './Experience.module.css'

const galleryImages = [
  { src: '/images/hero-recepcao.jpg',  alt: 'Recepção elegante da Talitha Pedroso Clínica de Estética' },
  { src: '/images/balcao-onix.jpg',    alt: 'Balcão de ônix — detalhes de luxo' },
  { src: '/images/area-zen.jpg',       alt: 'Área zen e relaxamento' },
  { src: '/images/sala-tratamento.jpg',alt: 'Sala de tratamentos com tecnologia de ponta' },
  { src: '/images/fachada.jpg',        alt: 'Fachada da clínica em Franco da Rocha' },
  { src: '/images/talitha-perfil.jpg', alt: 'Talitha Pedroso — fundadora e biomédica esteta' },
]

function Lightbox({ images, current, onClose, onPrev, onNext }) {
  return createPortal(
    <motion.div
      className={styles.lightboxBackdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Galeria de imagens"
    >
      {/* Imagem atual */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className={styles.lightboxImg}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1    }}
          exit={{   opacity: 0, scale: 0.95  }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={images[current].src}
            alt={images[current].alt}
            loading="eager"
          />
          <p className={styles.lightboxCaption}>{images[current].alt}</p>
        </motion.div>
      </AnimatePresence>

      {/* Controles */}
      <button className={`${styles.lightboxBtn} ${styles.lightboxClose}`} onClick={onClose} aria-label="Fechar">
        <FaTimes />
      </button>
      <button className={`${styles.lightboxBtn} ${styles.lightboxPrev}`} onClick={(e) => { e.stopPropagation(); onPrev() }} aria-label="Anterior">
        <FaChevronLeft />
      </button>
      <button className={`${styles.lightboxBtn} ${styles.lightboxNext}`} onClick={(e) => { e.stopPropagation(); onNext() }} aria-label="Próxima">
        <FaChevronRight />
      </button>

      {/* Dots */}
      <div className={styles.lightboxDots}>
        {images.map((_, i) => (
          <button
            key={i}
            className={`${styles.lightboxDot} ${i === current ? styles.lightboxDotActive : ''}`}
            onClick={(e) => { e.stopPropagation() }}
            aria-label={`Imagem ${i + 1}`}
          />
        ))}
      </div>
    </motion.div>,
    document.body
  )
}

export function GalleryGrid() {
  const [selected, setSelected] = useState(null)
  const [loading,  setLoading]  = useState({})

  const handlePrev = () => setSelected((s) => (s > 0 ? s - 1 : galleryImages.length - 1))
  const handleNext = () => setSelected((s) => (s < galleryImages.length - 1 ? s + 1 : 0))

  return (
    <>
      <div className={styles.gallery} role="list" aria-label="Galeria de fotos da clínica">
        {galleryImages.map((img, i) => (
          <motion.button
            key={i}
            className={styles.galleryItem}
            role="listitem"
            aria-label={`Ver: ${img.alt}`}
            onClick={() => setSelected(i)}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Skeleton loader */}
            {loading[i] === undefined && (
              <div className={styles.skeleton} aria-hidden="true" />
            )}

            <motion.img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className={styles.galleryImg}
              onLoad={() => setLoading((l) => ({ ...l, [i]: true }))}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 8, ease: 'linear' }}
              style={{ opacity: loading[i] ? 1 : 0, transition: 'opacity 0.4s' }}
            />

            <div className={styles.galleryOverlay}>
              <span className={styles.galleryZoom}>🔍</span>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <Lightbox
            images={galleryImages}
            current={selected}
            onClose={() => setSelected(null)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </>
  )
}
