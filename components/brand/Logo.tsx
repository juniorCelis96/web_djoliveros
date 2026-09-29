import Link from 'next/link'
import { site } from '@/lib/site'

export function Monogram({ className = '' }: { className?: string }) {
  return (
    <span
      className={`relative inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-navy-900 font-serif text-base font-semibold tracking-wide text-gold-300 ring-1 ring-gold-400/40 ring-inset ${className}`}
      aria-hidden="true"
    >
      DO
      <span className="absolute inset-x-2 bottom-1.5 h-px bg-gold-400/50" />
    </span>
  )
}

export function Logo({ tone = 'default' }: { tone?: 'default' | 'light' }) {
  const light = tone === 'light'
  return (
    <Link href="/" className="group inline-flex items-center gap-3" aria-label={`${site.shortName} — Inicio`}>
      <Monogram />
      <span className="flex flex-col leading-none">
        <span className={`font-serif text-lg font-semibold tracking-tight ${light ? 'text-white' : 'text-ink'}`}>
          {site.shortName}
        </span>
        <span
          className={`mt-1 text-[0.65rem] font-semibold tracking-[0.28em] uppercase ${light ? 'text-gold-300' : 'text-accent'}`}
        >
          {site.role}
        </span>
      </span>
    </Link>
  )
}
