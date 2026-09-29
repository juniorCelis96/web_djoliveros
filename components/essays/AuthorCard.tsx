import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Monogram } from '@/components/brand/Logo'
import { site } from '@/lib/site'

export function AuthorCard() {
  return (
    <aside className="card flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:p-7">
      <Monogram className="size-16 text-2xl" />
      <div className="flex-1">
        <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">Sobre el autor</p>
        <p className="mt-1.5 font-serif text-xl font-semibold text-ink">{site.name}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
          {site.role} de {site.city}. Escribe sobre derecho público, control político, gestión territorial y participación
          ciudadana.
        </p>
      </div>
      <Link href="/perfil" className="btn-outline shrink-0">
        Ver perfil <ArrowRight className="size-4" />
      </Link>
    </aside>
  )
}
