import { ArrowRight, Briefcase, Landmark, MapPin, Scale, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { site } from '@/lib/site'

const highlights = [
  { Icon: Scale, label: 'Derecho constitucional y administrativo' },
  { Icon: Landmark, label: 'Control político y transparencia' },
  { Icon: Briefcase, label: 'Gestión pública territorial' },
]

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 text-white">
      <HeroBackdrop />

      <div className="container-page relative grid items-center gap-14 py-20 md:py-28 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="eyebrow animate-fade-up text-gold-300">{site.tagline}</p>
          <h1 className="mt-6 animate-fade-up text-4xl leading-[1.08] font-semibold text-white [animation-delay:80ms] sm:text-5xl lg:text-6xl">
            Reflexiones académicas sobre{' '}
            <span className="text-gold-300 italic">derecho, política</span> y gestión pública.
          </h1>
          <p className="mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-navy-200 [animation-delay:160ms]">
            Soy {site.name}, abogado de {site.city}. Escribo ensayos que analizan los desafíos del Estado colombiano desde una
            perspectiva crítica, rigurosa y propositiva.
          </p>
          <div className="mt-9 flex animate-fade-up flex-wrap gap-3 [animation-delay:240ms]">
            <Link href="/ensayos" className="btn-gold px-6 py-3">
              Explorar ensayos <ArrowRight className="size-4" />
            </Link>
            <Link href="/perfil" className="btn-outline-light px-6 py-3">
              Conocer mi perfil
            </Link>
          </div>
        </div>

        <div className="animate-fade-up [animation-delay:200ms] lg:col-span-5">
          <ProfileCard />
        </div>
      </div>
    </section>
  )
}

function ProfileCard() {
  return (
    <div className="relative mx-auto max-w-md">
      <div aria-hidden="true" className="absolute -inset-3 translate-x-4 translate-y-4 rounded-2xl border border-gold-400/30" />
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-md">
        <div className="relative aspect-[4/3] overflow-hidden bg-linear-to-br from-navy-800 via-navy-900 to-navy-950">
          {site.portrait ? (
            <Image src={site.portrait} alt={site.name} fill priority sizes="28rem" className="object-cover object-top" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(210,169,74,0.22),transparent_60%)]" />
              <span className="relative font-serif text-8xl font-semibold tracking-tight text-gold-300/90">DO</span>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-navy-950/90 to-transparent" />
          <div className="absolute bottom-5 left-6">
            <p className="font-serif text-2xl font-semibold text-white">{site.shortName}</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-navy-200">
              <MapPin className="size-3.5 text-gold-300" /> {site.city}
            </p>
          </div>
        </div>
        <ul className="space-y-3.5 p-6">
          {highlights.map(({ Icon, label }) => (
            <li key={label} className="flex items-center gap-3 text-sm text-navy-100">
              <span className="inline-flex size-8 items-center justify-center rounded-md bg-gold-400/10 text-gold-300">
                <Icon className="size-4" strokeWidth={1.8} />
              </span>
              {label}
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 border-t border-white/10 px-6 py-4 text-xs text-navy-200">
          <ShieldCheck className="size-4 text-gold-300" />
          Disponible para asesoría y consultoría jurídica
          <span className="relative ml-auto flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" />
          </span>
        </div>
      </div>
    </div>
  )
}

function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(46,74,114,0.55),transparent_60%)]" />
      <div className="absolute -bottom-40 -left-40 size-[36rem] rounded-full bg-gold-500/10 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] bg-[size:64px_64px]" />
      <svg
        className="absolute top-1/2 right-[-6rem] hidden h-[130%] -translate-y-1/2 text-gold-300/[0.07] lg:block"
        viewBox="0 0 400 480"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M20 150 L200 40 L380 150 Z" />
        <path d="M40 150 H360 M30 165 H370" />
        {[60, 120, 180, 240, 300].map((x) => (
          <g key={x}>
            <path d={`M${x} 175 V420 M${x + 40} 175 V420`} />
            <path d={`M${x - 6} 175 H${x + 46} M${x - 6} 420 H${x + 46}`} />
          </g>
        ))}
        <path d="M20 430 H380 M10 450 H390 M0 470 H400" />
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-gold-400/50 to-transparent" />
    </div>
  )
}
