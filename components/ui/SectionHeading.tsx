import type { ReactNode } from 'react'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  action?: ReactNode
  align?: 'left' | 'center'
}

export function SectionHeading({ eyebrow, title, description, action, align = 'left' }: SectionHeadingProps) {
  const centered = align === 'center'
  return (
    <div className={`flex flex-col gap-6 md:flex-row md:items-end ${centered ? 'md:justify-center' : 'md:justify-between'}`}>
      <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-4 text-3xl font-semibold md:text-4xl">{title}</h2>
        {description && <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
