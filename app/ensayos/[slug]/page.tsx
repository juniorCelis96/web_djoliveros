import { ArrowLeft, MessageSquare } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Monogram } from '@/components/brand/Logo'
import { AuthorCard } from '@/components/essays/AuthorCard'
import { CommentsSection } from '@/components/essays/CommentsSection'
import { EssayCard } from '@/components/essays/EssayCard'
import { EssayCover } from '@/components/essays/EssayCover'
import { EssayMeta } from '@/components/essays/EssayMeta'
import { LikeButton } from '@/components/essays/LikeButton'
import { ShareButtons } from '@/components/essays/ShareButtons'
import { TableOfContents } from '@/components/essays/TableOfContents'
import { getEssayBySlug, getEssays, getRelatedEssays, getSeedComments } from '@/lib/essays'

export async function generateStaticParams() {
  const essays = await getEssays()
  return essays.map((essay) => ({ slug: essay.slug }))
}

export async function generateMetadata({ params }: PageProps<'/ensayos/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const essay = await getEssayBySlug(slug)
  if (!essay) return {}
  return {
    title: essay.title,
    description: essay.excerpt,
    openGraph: {
      type: 'article',
      title: essay.title,
      description: essay.excerpt,
      publishedTime: essay.publishedAt,
      authors: [essay.author],
      tags: essay.tags,
    },
  }
}

export default async function EssayPage({ params }: PageProps<'/ensayos/[slug]'>) {
  const { slug } = await params
  const essay = await getEssayBySlug(slug)
  if (!essay) notFound()

  const [related, seedComments] = await Promise.all([getRelatedEssays(essay), getSeedComments(slug)])
  const path = `/ensayos/${essay.slug}`

  return (
    <article>
      <header className="relative overflow-hidden border-b border-line bg-surface-muted/60">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -left-24 size-[28rem] rounded-full bg-accent/10 blur-3xl"
        />
        <div className="container-page relative pt-10 pb-12 md:pt-14 md:pb-16">
          <Link
            href="/ensayos"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-subtle transition hover:text-accent"
          >
            <ArrowLeft className="size-4" /> Volver a ensayos
          </Link>

          <div className="mt-8 max-w-3xl">
            <Link href={`/ensayos?categoria=${encodeURIComponent(essay.category)}`} className="chip">
              {essay.category}
            </Link>
            <h1 className="mt-5 animate-fade-up text-4xl leading-[1.12] font-semibold md:text-5xl">{essay.title}</h1>
            <p className="mt-5 animate-fade-up text-lg leading-relaxed text-ink-muted [animation-delay:100ms]">
              {essay.excerpt}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <div className="flex items-center gap-3">
                <Monogram className="size-11" />
                <div>
                  <p className="text-sm font-semibold text-ink">{essay.author}</p>
                  <EssayMeta essay={essay} className="mt-1" />
                </div>
              </div>
              <a
                href="#comentarios"
                className="inline-flex items-center gap-2 text-sm font-medium text-ink-subtle transition hover:text-accent"
              >
                <MessageSquare className="size-4" /> Ir a la conversación
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="container-page">
        <EssayCover
          essay={essay}
          iconSize="lg"
          priority
          sizes="(min-width: 1152px) 1152px, 100vw"
          className="-mt-px aspect-[21/9] rounded-b-2xl md:aspect-[3/1]"
        />
      </div>

      <div className="container-page grid gap-12 py-14 lg:grid-cols-[3.5rem_minmax(0,1fr)_17rem] lg:gap-10 xl:gap-14">
        <aside className="hidden lg:block">
          <div className="sticky top-28 flex flex-col items-center gap-3">
            <span className="text-[0.65rem] font-semibold tracking-[0.2em] text-ink-subtle uppercase [writing-mode:vertical-rl]">
              Compartir
            </span>
            <ShareButtons title={essay.title} path={path} orientation="vertical" />
          </div>
        </aside>

        <div className="min-w-0">
          <div className="lg:hidden">
            <TableOfContents sections={essay.sections} />
          </div>

          <div className="prose prose-lg prose-essay mt-10 max-w-none lg:mt-0">
            {essay.sections.map((section, index) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className={index === 0 ? 'mt-0!' : undefined}>{section.heading}</h2>
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p
                    key={paragraphIndex}
                    className={
                      index === 0 && paragraphIndex === 0
                        ? 'first-letter:float-left first-letter:mt-1 first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:leading-[0.8] first-letter:font-semibold first-letter:text-accent'
                        : undefined
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-2">
            {essay.tags.map((tag) => (
              <span key={tag} className="rounded-md border border-line bg-surface px-3 py-1 text-xs font-medium text-ink-muted">
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-5 border-y border-line py-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <p className="text-sm font-medium text-ink">¿Te resultó útil?</p>
              <LikeButton slug={essay.slug} baseCount={essay.likes} />
            </div>
            <ShareButtons title={essay.title} path={path} />
          </div>

          <div className="mt-10">
            <AuthorCard />
          </div>

          <div className="mt-14">
            <CommentsSection slug={essay.slug} seedComments={seedComments} />
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <TableOfContents sections={essay.sections} />
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="border-t border-line bg-surface-muted/50 py-16 md:py-20">
          <div className="container-page">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="eyebrow">Sigue leyendo</p>
                <h2 className="mt-3 text-3xl font-semibold">Ensayos relacionados</h2>
              </div>
              <Link href="/ensayos" className="hidden text-sm font-semibold text-accent hover:underline sm:inline">
                Ver todos
              </Link>
            </div>
            <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <EssayCard key={item.slug} essay={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
