import { FaWhatsapp, FaInstagram, FaFacebook, FaMapMarkerAlt, FaClock, FaStar } from 'react-icons/fa'
import { BRAND } from '@utils/constants'
import { buildWALink } from '@utils/helpers'
import { GoldDivider } from '@components/ui/GoldDivider'
import styles from './Footer.module.css'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer} role="contentinfo">
      {/* Linha decorativa superior */}
      <div className={styles.topLine} />

      <div className={styles.inner}>
        {/* Grid principal */}
        <div className={styles.grid}>
          {/* Col 1 — Marca */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoMono}>TP</span>
              <div>
                <div className={styles.logoName}>{BRAND.shortName}</div>
                <div className={styles.logoSub}>Clínica de Estética</div>
              </div>
            </div>
            <p className={styles.tagline}>
              Transformando autoestima com tecnologia de ponta e cuidado personalizado em Franco da Rocha – SP.
            </p>
            <div className={styles.rating}>
              <div className={styles.stars}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <span>{BRAND.googleRating} · {BRAND.googleReviews}+ avaliações</span>
            </div>
          </div>

          {/* Col 2 — Contato */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Contato</h3>
            <ul className={styles.colList}>
              <li>
                <FaMapMarkerAlt className={styles.colIcon} />
                <span>{BRAND.address}</span>
              </li>
              <li>
                <FaClock className={styles.colIcon} />
                <span>{BRAND.hours}</span>
              </li>
              <li>
                <FaWhatsapp className={styles.colIcon} />
                <a
                  href={buildWALink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.colLink}
                >
                  {BRAND.phoneFormatted}
                </a>
              </li>
              <li>
                <FaInstagram className={styles.colIcon} />
                <a
                  href={BRAND.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.colLink}
                >
                  {BRAND.instagramHandle}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 — Tratamentos */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Tratamentos</h3>
            <ul className={styles.colList}>
              {['Lipo sem Cortes', 'Criolipólise', 'Injetáveis Estéticos', 'Ozônioterapia', 'Limpeza Profunda', 'Lipedema'].map((t) => (
                <li key={t}>
                  <span className={styles.bullet}>◆</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — CTA */}
          <div className={styles.col}>
            <h3 className={styles.colTitle}>Agendar Agora</h3>
            <p className={styles.ctaText}>
              Sua avaliação gratuita está a um clique de distância.
            </p>
            <a
              href={buildWALink()}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaBtn}
              aria-label="Agendar avaliação gratuita via WhatsApp"
            >
              <FaWhatsapp />
              Avaliação Gratuita
            </a>
            <div className={styles.social}>
              <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href={BRAND.facebook} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href={buildWALink()} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="WhatsApp">
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>

        <GoldDivider centered />

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <span>© {year} {BRAND.name} · Todos os direitos reservados</span>
          <span className={styles.bottomRight}>
            Franco da Rocha – SP · CEP {BRAND.cep}
          </span>
        </div>
      </div>
    </footer>
  )
}
