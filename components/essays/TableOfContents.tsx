'use client'

import { useEffect, useState } from 'react'
import type { EssaySection } from '@/lib/types'

export function TableOfContents({ sections }: { sections: Pick<EssaySection, 'id' | 'heading'>[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-96px 0px -65% 0px' },
    )
    for (const section of sections) {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    }
    return () => observer.disconnect()
  }, [sections])

  return (
    <nav aria-label="En este ensayo" className="card p-6">
      <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">En este ensayo</p>
      <ol className="mt-4 space-y-1 border-l border-line">
        {sections.map((section, index) => {
          const active = section.id === activeId
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`-ml-px flex gap-2.5 border-l-2 py-1.5 pl-4 text-sm leading-snug transition ${
                  active ? 'border-accent font-medium text-ink' : 'border-transparent text-ink-subtle hover:text-ink'
                }`}
              >
                <span className="font-serif text-accent tabular-nums">{String(index + 1).padStart(2, '0')}</span>
                {section.heading}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
