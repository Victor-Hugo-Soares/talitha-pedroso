import { Navbar }         from '@components/layout/Navbar'
import { Footer }         from '@components/layout/Footer'
import { Hero }           from '@components/sections/Hero/Hero'
import { About }          from '@components/sections/About/About'
import { Services }       from '@components/sections/Services/Services'
import { Experience }     from '@components/sections/Experience/Experience'
import { Testimonials }   from '@components/sections/Testimonials/Testimonials'
import { Numbers }        from '@components/sections/Numbers/Numbers'
import { CtaFinal }       from '@components/sections/CtaFinal/CtaFinal'
import { WhatsAppFloat }  from '@components/sections/WhatsAppFloat/WhatsAppFloat'
import { SplashScreen }   from '@components/ui/SplashScreen'
import { CustomCursor }   from '@components/ui/CustomCursor'
import { ScrollProgress } from '@components/ui/ScrollProgress'
import { AIChatBot }      from '@components/ui/AIChatBot/AIChatBot'

export default function App() {
  return (
    <>
      {/* ── Elementos globais ── */}
      <SplashScreen duration={1800} />
      <CustomCursor />
      <ScrollProgress />

      {/* ── Layout ── */}
      <Navbar />

      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <Services />
        <Experience />
        <Testimonials />
        <Numbers />
        <CtaFinal />
      </main>

      <Footer />

      {/* ── Elementos flutuantes ── */}
      <WhatsAppFloat />
      <AIChatBot />
    </>
  )
}
