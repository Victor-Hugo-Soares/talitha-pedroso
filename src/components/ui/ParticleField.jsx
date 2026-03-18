import { useEffect, useRef } from 'react'
import styles from './ParticleField.module.css'

/**
 * Campo de partículas douradas via Canvas 2D.
 * Efeito de profundidade reage ao movimento do mouse.
 */
export function ParticleField({ count = 70 }) {
  const canvasRef = useRef(null)
  const animRef   = useRef(null)
  const mouseRef  = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }

    class Particle {
      constructor() { this.reset(true) }

      reset(initial = false) {
        this.x      = Math.random() * canvas.width
        this.y      = initial ? Math.random() * canvas.height : canvas.height + 10
        this.size   = Math.random() * 1.8 + 0.4
        this.speedX = (Math.random() - 0.5) * 0.3
        this.speedY = -(Math.random() * 0.55 + 0.15)
        this.alpha  = 0
        this.maxAlpha = Math.random() * 0.55 + 0.12
        this.life   = 0
        this.maxLife = Math.random() * 220 + 120
        this.twinkle = Math.random() * Math.PI * 2
      }

      update(mx, my) {
        this.life++
        this.twinkle += 0.04

        // Leve atração ao mouse
        const dx = mx - this.x
        const dy = my - this.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 300) {
          this.x += (dx / dist) * 0.04
          this.y += (dy / dist) * 0.04
        }

        this.x += this.speedX
        this.y += this.speedY

        // Fade in / out
        const progress = this.life / this.maxLife
        if (progress < 0.2) {
          this.alpha = (progress / 0.2) * this.maxAlpha
        } else if (progress > 0.8) {
          this.alpha = ((1 - progress) / 0.2) * this.maxAlpha
        } else {
          this.alpha = this.maxAlpha * (0.8 + 0.2 * Math.sin(this.twinkle))
        }

        if (this.life > this.maxLife || this.y < -20) this.reset()
      }

      draw() {
        ctx.save()
        ctx.globalAlpha = this.alpha

        // Glow dourado
        const grd = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 3
        )
        grd.addColorStop(0,   '#F0D080')
        grd.addColorStop(0.4, '#C9923A')
        grd.addColorStop(1,   'rgba(184, 146, 46, 0)')

        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2)
        ctx.fill()

        // Núcleo brilhante
        ctx.globalAlpha = this.alpha * 1.5
        ctx.fillStyle   = '#FFF4C2'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 0.6, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()
      }
    }

    resize()
    const particles = Array.from({ length: count }, () => new Particle())

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.update(mouseRef.current.x, mouseRef.current.y)
        p.draw()
      })
      animRef.current = requestAnimationFrame(animate)
    }

    animate()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [count])

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
}
