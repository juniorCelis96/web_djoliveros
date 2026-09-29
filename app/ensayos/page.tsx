import type { Metadata } from 'next'
import { EssayExplorer } from '@/components/essays/EssayExplorer'
import { PageHeader } from '@/components/ui/PageHeader'
import { getEssays } from '@/lib/essays'
import { CATEGORIES, type Category } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Ensayos',
  description: 'Reflexiones académicas sobre derecho, política, gestión pública y sociedad.',
}

export default async function EssaysPage({ searchParams }: PageProps<'/ensayos'>) {
  const { categoria } = await searchParams
  const essays = await getEssays()
  const initialCategory = CATEGORIES.find((category) => category === categoria) as Category | undefined

  return (
    <>
      <PageHeader
        eyebrow="Publicaciones"
        title="Ensayos"
        description="Reflexiones académicas sobre derecho, política, gestión pública y sociedad, con una perspectiva crítica y propositiva."
        breadcrumbs={[{ label: 'Inicio', href: '/' }, { label: 'Ensayos' }]}
      />
      <section className="container-page py-14 md:py-20">
        <EssayExplorer essays={essays} initialCategory={initialCategory} />
      </section>
    </>
  )
}
