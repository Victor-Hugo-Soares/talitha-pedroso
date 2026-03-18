import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

/**
 * HOC de animação fade-in ao scroll usando framer-motion + IntersectionObserver.
 * direction: 'up' | 'down' | 'left' | 'right' | 'none'
 */
export function RevealWrapper({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  threshold = 0.15,
  className,
  as = 'div',
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold })

  const offsets = {
    up:    { y: 32, x: 0  },
    down:  { y: -24, x: 0 },
    left:  { y: 0,  x: -32 },
    right: { y: 0,  x: 32  },
    none:  { y: 0,  x: 0   },
  }

  const { x, y } = offsets[direction] ?? offsets.up
  const MotionTag = motion[as] ?? motion.div

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, x, y }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionTag>
  )
}
