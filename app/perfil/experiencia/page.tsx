import { Briefcase, Check, MapPin } from 'lucide-react'
import type { Metadata } from 'next'
import { ProfileCta } from '@/components/profile/ProfileCta'
import { ProfileTabs } from '@/components/profile/ProfileTabs'
import { PageHeader } from '@/components/ui/PageHeader'
import { experience } from '@/data/profile'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Experiencia Laboral',
  description: `Trayectoria profesional de ${site.name}.`,
}

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Trayectoria"
        title="Experiencia Laboral"
        description="Recorrido profesional en la asesoría jurídica y la gestión pública, con especial atención a los territorios."
        breadcrumbs={[{ label: 'Inicio', href: '/' }, { label: 'Perfil', href: '/perfil' }, { label: 'Experiencia Laboral' }]}
      >
        <ProfileTabs active="/perfil/experiencia" />
      </PageHeader>

      <div className="container-page py-16 md:py-20">
        <ol className="relative mx-auto max-w-4xl">
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-5 w-px bg-line md:left-1/2" />
          {experience.map((item, index) => (
            <li key={item.role + item.period} className="relative pb-12 pl-16 last:pb-0 md:grid md:grid-cols-2 md:gap-12 md:pl-0">
              <span className="absolute top-1 left-0 inline-flex size-10 items-center justify-center rounded-full border border-accent/40 bg-canvas text-accent shadow-sm md:left-1/2 md:-translate-x-1/2">
                <Briefcase className="size-4" strokeWidth={1.8} />
              </span>

              <div className={`md:pt-2 ${index % 2 === 0 ? 'md:pr-10 md:text-right' : 'md:order-2 md:pl-10'}`}>
                <p className="font-serif text-lg font-semibold text-accent">{item.period}</p>
                <p className={`mt-1 inline-flex items-center gap-1.5 text-sm text-ink-subtle ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <MapPin className="size-3.5" /> {item.location}
                </p>
              </div>

              <div className={`card card-hover mt-4 p-6 md:mt-0 ${index % 2 === 0 ? 'md:ml-10' : 'md:order-1 md:mr-10'}`}>
                <h2 className="text-xl font-semibold">{item.role}</h2>
                <p className="mt-1 text-sm font-medium text-accent">{item.organization}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.description}</p>
                <ul className="mt-4 space-y-2">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2.5 text-sm text-ink-muted">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <ProfileCta href="/perfil/academico" label="Ver perfil académico" title="Descubre mi formación académica" />
      </div>
    </>
  )
}
