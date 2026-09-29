import { Building2, Landmark, Scale, Users, type LucideIcon } from 'lucide-react'
import Image from 'next/image'
import type { Category, Essay } from '@/lib/types'

const artwork: Record<Category, { Icon: LucideIcon; from: string; to: string; glow: string }> = {
  Derecho: { Icon: Scale, from: '#0a1426', to: '#223a5c', glow: 'rgba(210,169,74,0.35)' },
  Política: { Icon: Landmark, from: '#1c1512', to: '#5a3d26', glow: 'rgba(223,192,109,0.35)' },
  'Gestión Pública': { Icon: Building2, from: '#0b1f24', to: '#1f4a4f', glow: 'rgba(210,169,74,0.3)' },
  Sociedad: { Icon: Users, from: '#141a33', to: '#3b3f6e', glow: 'rgba(223,192,109,0.3)' },
}

interface EssayCoverProps {
  essay: Pick<Essay, 'title' | 'category' | 'cover'>
  className?: string
  priority?: boolean
  sizes?: string
  iconSize?: 'md' | 'lg'
}

export function EssayCover({ essay, className = '', priority, sizes = '(min-width: 1024px) 33vw, 100vw', iconSize = 'md' }: EssayCoverProps) {
  if (essay.cover) {
    return (
      <div className={`relative overflow-hidden bg-navy-900 ${className}`}>
        <Image src={essay.cover} alt="" fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    )
  }

  const { Icon, from, to, glow } = artwork[essay.category]

  return (
    <div
      className={`relative isolate overflow-hidden ${className}`}
      style={{ backgroundImage: `linear-gradient(135deg, ${from} 0%, ${to} 100%)` }}
      aria-hidden="true"
    >
      <div
        className="absolute -right-10 -bottom-16 size-72 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${glow}, transparent 70%)` }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:28px_28px]" />
      <svg className="absolute inset-0 size-full" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice">
        <path d="M-20 200 L180 40 L420 180" fill="none" stroke="#d2a94a" strokeOpacity="0.35" strokeWidth="1" />
        <path d="M-20 230 L200 70 L420 210" fill="none" stroke="#d2a94a" strokeOpacity="0.18" strokeWidth="1" />
        <circle cx="330" cy="60" r="44" fill="none" stroke="#dfc06d" strokeOpacity="0.25" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`inline-flex items-center justify-center rounded-full border border-gold-300/30 bg-white/5 text-gold-300 backdrop-blur-sm ${
            iconSize === 'lg' ? 'size-24' : 'size-16'
          }`}
        >
          <Icon className={iconSize === 'lg' ? 'size-11' : 'size-7'} strokeWidth={1.3} />
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/30 to-transparent" />
    </div>
  )
}
