import { ArrowRight, Briefcase, GraduationCap, Quote, UserRound } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { professionalProfile } from '@/data/profile'
import { profileLinks, site } from '@/lib/site'

const icons = [UserRound, Briefcase, GraduationCap]

export function AboutTeaser() {
  return (
    <section className="border-y border-line bg-surface-muted/50">
      <div className="container-page grid items-center gap-14 py-20 md:py-28 lg:grid-cols-2 lg:gap-20">
        <div className="relative mx-auto w-full max-w-md lg:mx-0">
          <div aria-hidden="true" className="absolute -top-4 -left-4 h-full w-full rounded-2xl border border-accent/40" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-linear-to-br from-navy-800 to-navy-950 shadow-xl">
            {site.portrait ? (
              <Image src={site.portrait} alt={site.name} fill sizes="(min-width: 1024px) 28rem, 100vw" className="object-cover" />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(210,169,74,0.2),transparent_60%)]" />
                <span className="relative font-serif text-9xl font-semibold text-gold-300/80">DO</span>
                <span className="relative text-xs font-semibold tracking-[0.3em] text-navy-300 uppercase">{site.role}</span>
              </div>
            )}
          </div>
          <figure className="card absolute -right-4 -bottom-8 max-w-[17rem] p-5 shadow-xl sm:-right-10">
            <Quote className="size-6 text-accent" />
            <blockquote className="mt-2 font-serif text-base leading-snug text-ink italic">
              El derecho debe ser una herramienta para transformar realidades, no solo para describirlas.
            </blockquote>
          </figure>
        </div>

        <div>
          <p className="eyebrow">Sobre mí</p>
          <h2 className="mt-4 text-3xl font-semibold md:text-4xl">{professionalProfile.headline}</h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-muted">
            {professionalProfile.summary.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          <ul className="mt-8 divide-y divide-line border-y border-line">
            {profileLinks.map((link, index) => {
              const Icon = icons[index]
              return (
                <li key={link.href}>
                  <Link href={link.href} className="group flex items-center gap-4 py-4">
                    <span className="inline-flex size-10 items-center justify-center rounded-md bg-accent/10 text-accent">
                      <Icon className="size-5" strokeWidth={1.7} />
                    </span>
                    <span className="flex-1">
                      <span className="block font-semibold text-ink transition-colors group-hover:text-accent">{link.label}</span>
                      <span className="block text-sm text-ink-subtle">{link.description}</span>
                    </span>
                    <ArrowRight className="size-4 text-ink-subtle transition group-hover:translate-x-1 group-hover:text-accent" />
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
