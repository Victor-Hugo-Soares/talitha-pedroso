import { motion } from 'framer-motion'
import { FaStar, FaQuoteLeft } from 'react-icons/fa'
import styles from './Testimonials.module.css'

export function TestimonialCard({ testimonial, index = 0 }) {
  return (
    <div className={styles.card} aria-label={`Depoimento de ${testimonial.name}`}>
      {/* Quote icon */}
      <FaQuoteLeft className={styles.quoteIcon} aria-hidden="true" />

      {/* Estrelas */}
      <div className={styles.stars} aria-label={`${testimonial.stars} estrelas`} role="img">
        {Array.from({ length: testimonial.stars }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0, rotate: -30 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 + i * 0.08, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <FaStar aria-hidden="true" />
          </motion.span>
        ))}
      </div>

      {/* Depoimento */}
      <blockquote className={styles.text}>
        <p>"{testimonial.text}"</p>
      </blockquote>

      {/* Tag de tratamento */}
      {testimonial.treatment && (
        <span className={styles.treatment}>{testimonial.treatment}</span>
      )}

      {/* Perfil */}
      <div className={styles.profile}>
        <div
          className={styles.avatar}
          aria-hidden="true"
          aria-label={`Avatar de ${testimonial.name}`}
        >
          {testimonial.initial}
        </div>
        <div>
          <div className={styles.name}>{testimonial.name}</div>
          {testimonial.city && (
            <div className={styles.city}>📍 {testimonial.city}</div>
          )}
        </div>
      </div>
    </div>
  )
}
