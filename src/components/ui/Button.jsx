import { motion } from 'framer-motion'
import clsx from 'clsx'
import { FaWhatsapp } from 'react-icons/fa'
import styles from './Button.module.css'

/**
 * Componente Button reutilizável com variantes e animações.
 * variant: 'primary' | 'secondary' | 'ghost' | 'whatsapp'
 * size:    'sm' | 'md' | 'lg'
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className,
  fullWidth = false,
  icon,
  disabled = false,
  type = 'button',
  'aria-label': ariaLabel,
  ...props
}) {
  const Tag = href ? motion.a : motion.button

  const linkProps = href
    ? {
        href,
        target: href.startsWith('http') ? '_blank' : undefined,
        rel:    href.startsWith('http') ? 'noopener noreferrer' : undefined,
      }
    : { onClick, type, disabled }

  return (
    <Tag
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        className
      )}
      whileHover={disabled ? {} : { scale: 1.025, y: -1 }}
      whileTap={disabled  ? {} : { scale: 0.975 }}
      transition={{ type: 'spring', stiffness: 380, damping: 18 }}
      aria-label={ariaLabel}
      {...linkProps}
      {...props}
    >
      {variant === 'whatsapp' && (
        <FaWhatsapp className={styles.waIcon} aria-hidden="true" />
      )}
      {icon && variant !== 'whatsapp' && (
        <span className={styles.iconWrap} aria-hidden="true">{icon}</span>
      )}
      <span>{children}</span>
    </Tag>
  )
}
