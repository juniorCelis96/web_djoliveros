'use client'

import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { localStore } from '@/lib/local-store'

export function LikeButton({ slug, baseCount }: { slug: string; baseCount: number }) {
  const [liked, setLiked] = useState(false)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setLiked(localStore.getLiked(slug))
  }, [slug])

  function toggle() {
    const next = !liked
    setLiked(next)
    setAnimate(next)
    localStore.setLiked(slug, next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={liked}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
        liked
          ? 'border-rose-300 bg-rose-50 text-rose-600 dark:border-rose-400/40 dark:bg-rose-500/10 dark:text-rose-300'
          : 'border-line bg-surface text-ink-muted hover:border-rose-300 hover:text-rose-600'
      }`}
    >
      <Heart
        className={`size-4 transition-transform ${liked ? 'fill-current' : ''} ${animate ? 'scale-125' : ''}`}
        onTransitionEnd={() => setAnimate(false)}
      />
      <span className="tabular-nums">{baseCount + (liked ? 1 : 0)}</span>
      <span className="sr-only">{liked ? 'Quitar de favoritos' : 'Marcar como favorito'}</span>
      <span aria-hidden="true">{liked ? 'Favorito' : 'Me gusta'}</span>
    </button>
  )
}
