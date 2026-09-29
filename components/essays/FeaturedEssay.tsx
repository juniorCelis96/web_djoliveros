import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { Essay } from '@/lib/types'
import { EssayCover } from './EssayCover'
import { EssayMeta } from './EssayMeta'

export function FeaturedEssay({ essay }: { essay: Essay }) {
  return (
    <article className="card card-hover group relative grid overflow-hidden lg:grid-cols-2">
      <div className="relative overflow-hidden">
        <EssayCover
          essay={essay}
          iconSize="lg"
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="aspect-[16/10] h-full transition-transform duration-500 group-hover:scale-[1.03] lg:aspect-auto lg:min-h-[22rem]"
        />
        <span className="absolute top-5 left-5 rounded-full bg-navy-950/80 px-3 py-1 text-[0.68rem] font-semibold tracking-[0.18em] text-gold-300 uppercase backdrop-blur">
          Ensayo destacado
        </span>
      </div>
      <div className="flex flex-col justify-center p-7 md:p-10">
        <span className="chip self-start">{essay.category}</span>
        <h3 className="mt-4 text-2xl leading-tight font-semibold md:text-3xl">
          <Link href={`/ensayos/${essay.slug}`} className="after:absolute after:inset-0 group-hover:text-accent">
            {essay.title}
          </Link>
        </h3>
        <p className="mt-4 line-clamp-4 leading-relaxed text-ink-muted">{essay.excerpt}</p>
        <EssayMeta essay={essay} className="mt-6" />
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
          Leer el ensayo completo
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  )
}
