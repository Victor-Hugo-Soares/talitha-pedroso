import { BRAND } from './constants'

/**
 * Formata número de telefone brasileiro
 * "5511910257931" → "(11) 91025-7931"
 */
export function formatPhone(raw) {
  const digits = raw.replace(/\D/g, '')
  if (digits.length === 13) {
    // +55 (DD) 9XXXX-XXXX
    return `(${digits.slice(2, 4)}) ${digits.slice(4, 9)}-${digits.slice(9)}`
  }
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  }
  return raw
}

/**
 * Gera link do WhatsApp com mensagem codificada
 */
export function buildWALink(message = BRAND.whatsappMessage) {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${BRAND.phone}?text=${encoded}`
}

/**
 * Gera link do WhatsApp com nome e tratamento pré-preenchidos
 */
export function buildWALinkPreFilled({ name, service, goal }) {
  const msg = `Olá! Me chamo ${name}, tenho interesse em ${service}${goal ? ` para ${goal}` : ''}. Gostaria de agendar uma avaliação gratuita!`
  return buildWALink(msg)
}

/**
 * Formata número com separador de milhar
 * 1000 → "1.000"  |  50000 → "50.000"
 */
export function formatNumber(n) {
  return new Intl.NumberFormat('pt-BR').format(n)
}

/**
 * Retorna delay de animação escalonado
 * index → "0.1s", "0.2s", ...
 */
export function staggerDelay(index, base = 0.1) {
  return `${(index * base).toFixed(2)}s`
}

/**
 * Scroll suave para um elemento pelo id
 */
export function scrollToSection(id) {
  const el = document.getElementById(id.replace('#', ''))
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/**
 * Clamp entre min e max
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

/**
 * Easing easeOutExpo para animações
 */
export function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}
