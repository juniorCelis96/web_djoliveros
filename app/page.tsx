import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { ContactForm } from '@/components/contact/ContactForm'
import { ContactInfo } from '@/components/contact/ContactInfo'
import { EssayCard } from '@/components/essays/EssayCard'
import { FeaturedEssay } from '@/components/essays/FeaturedEssay'
import { AboutTeaser } from '@/components/home/AboutTeaser'
import { FocusAreas } from '@/components/home/FocusAreas'
import { Hero } from '@/components/home/Hero'
import { SubscribeBand } from '@/components/home/SubscribeBand'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getCategoryCounts, getEssays } from '@/lib/essays'

export default async function HomePage() {
  const [essays, counts] = await Promise.all([getEssays(), getCategoryCounts()])
  const [featured, ...latest] = essays

  return (
    <>
      <Hero />

      <FocusAreas counts={counts} />

      {featured && (
        <section className="border-t border-line bg-surface-muted/40 py-20 md:py-28">
          <div className="container-page">
            <SectionHeading
              eyebrow="Publicaciones recientes"
              title="Últimos ensayos"
              description="Análisis sobre los temas que marcan la agenda jurídica, política y social del país."
              action={
                <Link href="/ensayos" className="btn-outline">
                  Ver todos los ensayos <ArrowRight className="size-4" />
                </Link>
              }
            />
            <div className="mt-12">
              <FeaturedEssay essay={featured} />
            </div>
            {latest.length > 0 && (
              <div className="mt-7 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {latest.slice(0, 3).map((essay) => (
                  <EssayCard key={essay.slug} essay={essay} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <AboutTeaser />

      <SubscribeBand />

      <section id="contacto" className="scroll-mt-20 border-t border-line bg-surface-muted/40 py-20 md:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Contacto"
            title="Conversemos"
            description="¿Tienes una consulta jurídica, una propuesta académica o quieres comentar un ensayo? Escríbeme y te responderé pronto."
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <ContactInfo />
            </div>
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
