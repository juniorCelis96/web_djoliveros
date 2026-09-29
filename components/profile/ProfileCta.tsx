import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function ProfileCta({ href, label, title }: { href: string; label: string; title: string }) {
  return (
    <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl border border-line bg-surface-muted/60 p-8 sm:flex-row sm:items-center">
      <div>
        <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">Continúa</p>
        <p className="mt-2 font-serif text-2xl font-semibold text-ink">{title}</p>
      </div>
      <Link href={href} className="btn-primary shrink-0">
        {label} <ArrowRight className="size-4" />
      </Link>
    </div>
  )
}
