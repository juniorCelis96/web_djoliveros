import { ArrowUpRight, Building2, Landmark, Scale, Users, type LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { Category } from '@/lib/types'

const areas: { category: Category; Icon: LucideIcon; description: string }[] = [
  {
    category: 'Derecho',
    Icon: Scale,
    description: 'Constitución, derechos fundamentales y el funcionamiento del ordenamiento jurídico colombiano.',
  },
  {
    category: 'Política',
    Icon: Landmark,
    description: 'Control político, instituciones representativas y calidad de la democracia.',
  },
  {
    category: 'Gestión Pública',
    Icon: Building2,
    description: 'Administración pública, descentralización y capacidades institucionales en los territorios.',
  },
  {
    category: 'Sociedad',
    Icon: Users,
    description: 'Participación ciudadana, confianza institucional y transformación social.',
  },
]

export function FocusAreas({ counts }: { counts: Record<Category, number> }) {
  return (
    <section className="container-page py-20 md:py-28">
      <SectionHeading
        eyebrow="Áreas de análisis"
        title="Cuatro ejes para pensar lo público"
        description="Cada ensayo se inscribe en uno de estos campos, que dialogan entre sí para comprender los retos del Estado y la sociedad."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {areas.map(({ category, Icon, description }, index) => (
          <Link
            key={category}
            href={`/ensayos?categoria=${encodeURIComponent(category)}`}
            className="card card-hover group relative flex flex-col p-7"
          >
            <div className="flex items-start justify-between">
              <span className="inline-flex size-12 items-center justify-center rounded-lg bg-primary text-primary-contrast transition-transform duration-300 group-hover:scale-105">
                <Icon className="size-6" strokeWidth={1.6} />
              </span>
              <span className="font-serif text-3xl font-semibold text-line transition-colors group-hover:text-accent/40">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            <h3 className="mt-6 text-xl font-semibold">{category}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{description}</p>
            <span className="mt-6 inline-flex items-center justify-between border-t border-line pt-4 text-sm font-medium text-ink-subtle">
              {counts[category]} {counts[category] === 1 ? 'ensayo' : 'ensayos'}
              <ArrowUpRight className="size-4 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
