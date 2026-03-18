import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { SectionLabel } from '@components/ui/SectionLabel'
import { GoldDivider } from '@components/ui/GoldDivider'
import { GalleryGrid } from './GalleryGrid'
import styles from './Experience.module.css'

const features = [
  { icon: '🛋️', title: 'Ambiente Sofisticado',  desc: 'Decoração premium com detalhes em ônix, madeira e ouro para uma experiência imersiva.' },
  { icon: '🔬', title: 'Tecnologia de Ponta',    desc: 'Equipamentos de última geração importados da Europa e certificados internacionalmente.' },
  { icon: '💆', title: 'Atendimento Exclusivo',  desc: 'Cada cliente recebe atenção personalizada com protocolos desenhados sob medida.' },
  { icon: '🌿', title: 'Produtos Premium',       desc: 'Cosmecêuticos selecionados das melhores marcas nacionais e internacionais.' },
]

export function Experience() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section id="espaco" className={styles.section} aria-label="Nossa clínica e galeria">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header} ref={ref}>
          <SectionLabel centered>Nossa Clínica</SectionLabel>

          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Um espaço pensado para o seu{' '}
            <span className={styles.titleAccent}>bem-estar total</span>
          </motion.h2>

          <GoldDivider centered />

          <motion.p
            className={styles.desc}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            Cada detalhe do nosso espaço foi cuidadosamente planejado para oferecer
            uma experiência de luxo acessível — do primeiro olhar ao resultado final.
          </motion.p>
        </div>

        {/* Features */}
        <motion.div
          className={styles.features}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          role="list"
          aria-label="Diferenciais da clínica"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              className={styles.feature}
              role="listitem"
              variants={{
                hidden:  { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
              }}
            >
              <span className={styles.featureIcon} aria-hidden="true">{f.icon}</span>
              <div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Galeria */}
        <GalleryGrid />
      </div>
    </section>
  )
}
