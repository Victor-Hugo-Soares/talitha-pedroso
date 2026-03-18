import { SectionLabel } from '@components/ui/SectionLabel'
import { GoldDivider } from '@components/ui/GoldDivider'
import { Button } from '@components/ui/Button'
import { ServiceCard } from './ServiceCard'
import { services } from '@data/services'
import { buildWALink } from '@utils/helpers'
import styles from './Services.module.css'

export function Services() {
  return (
    <section id="tratamentos" className={styles.section} aria-label="Nossos tratamentos">
      {/* Decoração de fundo */}
      <div className={styles.bgAccent} aria-hidden="true" />

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <SectionLabel centered>Nossos Tratamentos</SectionLabel>
          <h2 className={styles.title}>
            Protocolos exclusivos para <span className={styles.titleAccent}>sua transformação</span>
          </h2>
          <GoldDivider centered />
          <p className={styles.desc}>
            Cada tratamento é desenhado individualmente com base no seu biótipo, objetivos e histórico de saúde.
            Tecnologia de ponta aliada ao cuidado humanizado.
          </p>
        </div>

        {/* Grid de cards */}
        <div className={styles.grid} role="list" aria-label="Lista de tratamentos">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* CTA final */}
        <div className={styles.cta}>
          <p className={styles.ctaText}>
            Não sabe qual tratamento é ideal para você?
          </p>
          <Button
            variant="primary"
            size="lg"
            href={buildWALink('Olá! Gostaria de uma avaliação gratuita para saber qual tratamento é ideal para mim.')}
            aria-label="Solicitar avaliação gratuita via WhatsApp"
          >
            Avaliação Gratuita
          </Button>
        </div>
      </div>
    </section>
  )
}
