import { useEffect, useCallback, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaStar, FaGoogle } from 'react-icons/fa'
import { SectionLabel } from '@components/ui/SectionLabel'
import { GoldDivider } from '@components/ui/GoldDivider'
import { TestimonialCard } from './TestimonialCard'
import { testimonials } from '@data/testimonials'
import { BRAND } from '@utils/constants'
import styles from './Testimonials.module.css'

export function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false,
  })

  // Autoplay
  useEffect(() => {
    if (!emblaApi) return
    const interval = setInterval(() => emblaApi.scrollNext(), 4500)
    return () => clearInterval(interval)
  }, [emblaApi])

  // Sync dots
  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    return () => emblaApi.off('select', onSelect)
  }, [emblaApi])

  const scrollTo = useCallback(
    (i) => emblaApi?.scrollTo(i),
    [emblaApi]
  )

  return (
    <section
      id="depoimentos"
      className={styles.section}
      aria-label="Depoimentos de clientes"
    >
      {/* Background decorativo */}
      <div className={styles.bgWave} aria-hidden="true" />

      <div className={styles.container}>
        {/* Header */}
        <div ref={ref} className={styles.header}>
          <SectionLabel light centered>Depoimentos</SectionLabel>

          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            O que nossas clientes dizem
          </motion.h2>

          <GoldDivider centered />

          {/* Rating Google */}
          <motion.div
            className={styles.rating}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            aria-label={`Nota ${BRAND.googleRating} no Google com ${BRAND.googleReviews} avaliações`}
          >
            <FaGoogle className={styles.ratingGoogle} aria-hidden="true" />
            <div className={styles.ratingStars} aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => <FaStar key={i} />)}
            </div>
            <span className={styles.ratingScore}>{BRAND.googleRating}</span>
            <span className={styles.ratingCount}>· {BRAND.googleReviews}+ avaliações</span>
          </motion.div>
        </div>

        {/* Carrossel Embla */}
        <motion.div
          className={styles.emblaViewport}
          ref={emblaRef}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          aria-live="polite"
        >
          <div className={styles.emblaContainer}>
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className={styles.emblaSlide}
                aria-roledescription="slide"
                aria-label={`Depoimento ${i + 1} de ${testimonials.length}`}
              >
                <TestimonialCard testimonial={t} index={i} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Dots */}
        <div
          className={styles.dots}
          role="tablist"
          aria-label="Navegação do carrossel"
        >
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === selectedIndex ? styles.dotActive : ''}`}
              onClick={() => scrollTo(i)}
              role="tab"
              aria-selected={i === selectedIndex}
              aria-label={`Ir para depoimento ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
