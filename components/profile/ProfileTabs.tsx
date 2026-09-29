import { Briefcase, GraduationCap, UserRound } from 'lucide-react'
import Link from 'next/link'
import { profileLinks } from '@/lib/site'

const icons = [UserRound, Briefcase, GraduationCap]

export function ProfileTabs({ active }: { active: string }) {
  return (
    <nav aria-label="Secciones del perfil" className="mt-10 -mb-px flex gap-1 overflow-x-auto">
      {profileLinks.map((link, index) => {
        const Icon = icons[index]
        const current = link.href === active
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={current ? 'page' : undefined}
            className={`inline-flex shrink-0 items-center gap-2 rounded-t-lg border-x border-t px-4 py-3 text-sm font-medium transition ${
              current
                ? 'border-line bg-canvas text-ink'
                : 'border-transparent text-ink-subtle hover:text-ink'
            }`}
          >
            <Icon className={`size-4 ${current ? 'text-accent' : ''}`} strokeWidth={1.8} />
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
