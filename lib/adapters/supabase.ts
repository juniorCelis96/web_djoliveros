import type { Essay, EssayComment, Subscriber } from '@/lib/types'

/**
 * Supabase adapter over the PostgREST API (no SDK required).
 * Server-only: uses the service role key, never import from Client Components.
 * Expected tables are defined in supabase/schema.sql.
 */

const url = process.env.SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export function isSupabaseConfigured() {
  return Boolean(url && serviceKey)
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  if (!url || !serviceKey) throw new Error('Supabase no está configurado')

  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      'Content-Type': 'application/json',
      ...init.headers,
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`Supabase ${response.status}: ${await response.text()}`)
  }

  return response.status === 204 ? (undefined as T) : ((await response.json()) as T)
}

interface EssayRow {
  slug: string
  title: string
  excerpt: string
  category: Essay['category']
  tags: string[]
  author: string
  published_at: string
  reading_minutes: number
  likes: number
  cover: string | null
  sections: Essay['sections']
}

const toEssay = (row: EssayRow): Essay => ({
  slug: row.slug,
  title: row.title,
  excerpt: row.excerpt,
  category: row.category,
  tags: row.tags ?? [],
  author: row.author,
  publishedAt: row.published_at,
  readingMinutes: row.reading_minutes,
  likes: row.likes ?? 0,
  cover: row.cover ?? undefined,
  sections: row.sections ?? [],
})

export async function listEssays(): Promise<Essay[]> {
  const rows = await request<EssayRow[]>('essays?select=*&published=eq.true&order=published_at.desc')
  return rows.map(toEssay)
}

export async function getEssay(slug: string): Promise<Essay | undefined> {
  const rows = await request<EssayRow[]>(`essays?select=*&slug=eq.${encodeURIComponent(slug)}&limit=1`)
  return rows[0] ? toEssay(rows[0]) : undefined
}

export async function insertSubscriber(subscriber: Subscriber & { source: string }) {
  await request('subscribers?on_conflict=email', {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify({ name: subscriber.name, email: subscriber.email, source: subscriber.source }),
  })
}

interface CommentRow {
  id: string
  essay_slug: string
  author_name: string
  body: string
  created_at: string
}

export async function listComments(essaySlug: string): Promise<EssayComment[]> {
  const rows = await request<CommentRow[]>(
    `comments?select=*&essay_slug=eq.${encodeURIComponent(essaySlug)}&order=created_at.desc`,
  )
  return rows.map((row) => ({
    id: row.id,
    essaySlug: row.essay_slug,
    authorName: row.author_name,
    body: row.body,
    createdAt: row.created_at,
  }))
}

export async function insertComment(comment: Omit<EssayComment, 'id' | 'createdAt'> & { authorEmail: string }) {
  await request('comments', {
    method: 'POST',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify({
      essay_slug: comment.essaySlug,
      author_name: comment.authorName,
      author_email: comment.authorEmail,
      body: comment.body,
    }),
  })
}
