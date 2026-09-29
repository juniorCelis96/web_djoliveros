import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'

interface Crumb {
  label: string
  href?: string
}

interface PageHeaderProps {
  eyebrow: string
  title: string
  description?: string
  breadcrumbs?: Crumb[]
  children?: ReactNode
}

export function PageHeader({ eyebrow, title, description, breadcrumbs, children }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-surface-muted/60">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 size-96 rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--line)_1px,transparent_1px),linear-gradient(to_bottom,var(--line)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)] bg-[size:48px_48px] opacity-50"
      />
      <div className={`container-page relative pt-14 md:pt-20 ${children ? '' : 'pb-14 md:pb-20'}`}>
        {breadcrumbs && (
          <nav aria-label="Ruta de navegación" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-subtle">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  {index > 0 && <ChevronRight className="size-3.5" />}
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition hover:text-accent">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-ink-muted" aria-current="page">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <p className="eyebrow animate-fade-up">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl animate-fade-up text-4xl font-semibold md:text-5xl [animation-delay:80ms]">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl animate-fade-up text-lg leading-relaxed text-ink-muted [animation-delay:160ms]">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}
