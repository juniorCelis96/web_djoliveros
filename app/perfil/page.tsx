import { BookOpen, Compass, FileText, Landmark, type LucideIcon } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ProfileCta } from '@/components/profile/ProfileCta'
import { ProfileTabs } from '@/components/profile/ProfileTabs'
import { PageHeader } from '@/components/ui/PageHeader'
import { professionalProfile } from '@/data/profile'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Perfil Profesional',
  description: `Perfil profesional de ${site.name}, abogado de ${site.city}.`,
}

const focusIcons: LucideIcon[] = [Landmark, Compass, FileText, BookOpen]

export default function ProfessionalProfilePage() {
  return (
    <>
      <PageHeader
        eyebrow="Sobre mí"
        title="Perfil Profesional"
        description={professionalProfile.headline}
        breadcrumbs={[{ label: 'Inicio', href: '/' }, { label: 'Perfil' }, { label: 'Perfil Profesional' }]}
      >
        <ProfileTabs active="/perfil" />
      </PageHeader>

      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold md:text-3xl">Presentación</h2>
            <div className="mt-5 space-y-5 text-lg leading-relaxed text-ink-muted">
              {professionalProfile.summary.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>

            <h2 className="mt-14 text-2xl font-semibold md:text-3xl">Enfoque profesional</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {professionalProfile.focus.map((item, index) => {
                const Icon = focusIcons[index % focusIcons.length]
                return (
                  <div key={item.title} className="card card-hover p-6">
                    <span className="inline-flex size-11 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Icon className="size-5" strokeWidth={1.7} />
                    </span>
                    <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.description}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="card p-6">
              <h2 className="font-sans text-xs font-semibold tracking-[0.2em] text-accent uppercase">Competencias</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {professionalProfile.skills.map((skill) => (
                  <li key={skill} className="rounded-md border border-line bg-surface-muted/60 px-3 py-1.5 text-sm text-ink-muted">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card overflow-hidden">
              <h2 className="border-b border-line px-6 py-4 font-sans text-xs font-semibold tracking-[0.2em] text-accent uppercase">
                Principios
              </h2>
              <ul className="divide-y divide-line">
                {professionalProfile.values.map((value) => (
                  <li key={value.title} className="px-6 py-4">
                    <p className="font-serif text-lg font-semibold text-ink">{value.title}</p>
                    <p className="mt-1 text-sm text-ink-muted">{value.description}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-navy-950 p-6 text-navy-100">
              <p className="font-serif text-lg leading-snug text-white">¿Necesitas asesoría en derecho público?</p>
              <p className="mt-2 text-sm text-navy-300">
                {site.phone.display} · {site.city}
              </p>
              <Link href="/contacto" className="btn-gold mt-5 w-full">
                Contactar
              </Link>
            </div>
          </aside>
        </div>

        <ProfileCta href="/perfil/experiencia" label="Ver experiencia laboral" title="Conoce mi trayectoria profesional" />
      </div>
    </>
  )
}
