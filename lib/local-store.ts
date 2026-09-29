import type { EssayComment, Subscriber } from '@/lib/types'

/**
 * Browser persistence used while the site runs in simulation mode.
 * Swap these calls for Server Actions backed by lib/adapters/supabase.ts when the database is connected.
 */

const KEYS = {
  subscriber: 'djo:subscriber',
  comments: (slug: string) => `djo:comments:${slug}`,
  like: (slug: string) => `djo:like:${slug}`,
}

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage can be unavailable (private mode, quota); the UI keeps working in memory.
  }
}

export const localStore = {
  getSubscriber: () => read<Subscriber | null>(KEYS.subscriber, null),
  setSubscriber: (subscriber: Subscriber | null) =>
    subscriber ? write(KEYS.subscriber, subscriber) : window.localStorage.removeItem(KEYS.subscriber),

  getComments: (slug: string) => read<EssayComment[]>(KEYS.comments(slug), []),
  addComment: (comment: EssayComment) => {
    const next = [comment, ...read<EssayComment[]>(KEYS.comments(comment.essaySlug), [])]
    write(KEYS.comments(comment.essaySlug), next)
    return next
  },

  getLiked: (slug: string) => read<boolean>(KEYS.like(slug), false),
  setLiked: (slug: string, liked: boolean) => write(KEYS.like(slug), liked),
}
