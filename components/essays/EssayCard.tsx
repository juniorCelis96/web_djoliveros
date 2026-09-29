import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { Essay } from '@/lib/types'
import { EssayCover } from './EssayCover'
import { EssayMeta } from './EssayMeta'

export function EssayCard({ essay }: { essay: Essay }) {
  return (
    <article className="card card-hover group relative flex h-full flex-col overflow-hidden">
      <div className="relative">
        <EssayCover essay={essay} className="aspect-[16/10] transition-transform duration-500 group-hover:scale-[1.03]" />
        <span className="absolute top-4 left-4 rounded-full bg-gold-400 px-2.5 py-1 text-[0.68rem] font-bold tracking-wide text-navy-950 uppercase shadow-sm">
          {essay.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <EssayMeta essay={essay} />
        <h3 className="mt-3 text-xl leading-snug font-semibold">
          <Link href={`/ensayos/${essay.slug}`} className="after:absolute after:inset-0 group-hover:text-accent">
            {essay.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-muted">{essay.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-accent">
          Ver más
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  )
}
