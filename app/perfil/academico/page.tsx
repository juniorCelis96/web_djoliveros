import { Award, BookOpen, GraduationCap, Search } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ProfileCta } from '@/components/profile/ProfileCta'
import { ProfileTabs } from '@/components/profile/ProfileTabs'
import { PageHeader } from '@/components/ui/PageHeader'
import { complementaryTraining, education, researchInterests } from '@/data/profile'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Perfil Académico',
  description: `Formación académica de ${site.name}.`,
}

export default function AcademicPage() {
  return (
    <>
      <PageHeader
        eyebrow="Formación"
        title="Perfil Académico"
        description="Formación jurídica orientada al derecho público, complementada con estudios en gestión y políticas públicas."
        breadcrumbs={[{ label: 'Inicio', href: '/' }, { label: 'Perfil', href: '/perfil' }, { label: 'Perfil Académico' }]}
      >
        <ProfileTabs active="/perfil/academico" />
      </PageHeader>

      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold md:text-3xl">Educación formal</h2>
            <div className="mt-6 space-y-5">
              {education.map((item) => (
                <article key={item.degree} className="card card-hover flex flex-col gap-5 p-6 sm:flex-row sm:p-7">
                  <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-contrast">
                    <GraduationCap className="size-7" strokeWidth={1.5} />
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-xl font-semibold">{item.degree}</h3>
                      <span className="chip">{item.period}</span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-accent">{item.institution}</p>
                    <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <h2 className="mt-14 text-2xl font-semibold md:text-3xl">Formación complementaria</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {complementaryTraining.map((item) => (
                <li key={item.title} className="card flex items-start gap-4 p-5">
                  <Award className="mt-0.5 size-5 shrink-0 text-accent" strokeWidth={1.7} />
                  <div>
                    <p className="font-medium text-ink">{item.title}</p>
                    <p className="mt-0.5 text-xs text-ink-subtle">{item.issuer}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-6">
            <div className="card p-6">
              <h2 className="flex items-center gap-2 font-sans text-xs font-semibold tracking-[0.2em] text-accent uppercase">
                <Search className="size-4" /> Líneas de investigación
              </h2>
              <ul className="mt-5 space-y-4">
                {researchInterests.map((interest, index) => (
                  <li key={interest} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                    <span className="font-serif font-semibold text-accent">{String(index + 1).padStart(2, '0')}</span>
                    {interest}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-6">
              <BookOpen className="size-6 text-accent" strokeWidth={1.6} />
              <p className="mt-3 font-serif text-lg leading-snug font-semibold text-ink">
                La investigación se traduce en ensayos abiertos a la discusión pública.
              </p>
              <Link href="/ensayos" className="mt-4 inline-block text-sm font-semibold text-accent hover:underline">
                Leer los ensayos →
              </Link>
            </div>
          </aside>
        </div>

        <ProfileCta href="/contacto" label="Contactar" title="¿Te interesa colaborar en un proyecto académico?" />
      </div>
    </>
  )
}
