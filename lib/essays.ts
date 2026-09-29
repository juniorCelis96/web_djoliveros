import essaysJson from '@/data/essays.json'
import commentsJson from '@/data/comments.json'
import * as supabase from '@/lib/adapters/supabase'
import type { Category, Essay, EssayComment } from '@/lib/types'

const localEssays = (essaysJson as Essay[]).toSorted((a, b) => b.publishedAt.localeCompare(a.publishedAt))

export async function getEssays(): Promise<Essay[]> {
  if (supabase.isSupabaseConfigured()) return supabase.listEssays()
  return localEssays
}

export async function getEssayBySlug(slug: string): Promise<Essay | undefined> {
  if (supabase.isSupabaseConfigured()) return supabase.getEssay(slug)
  return localEssays.find((essay) => essay.slug === slug)
}

export async function getRelatedEssays(essay: Essay, limit = 3): Promise<Essay[]> {
  const others = (await getEssays()).filter((item) => item.slug !== essay.slug)
  const sameCategory = others.filter((item) => item.category === essay.category)
  const rest = others.filter((item) => item.category !== essay.category)
  return [...sameCategory, ...rest].slice(0, limit)
}

export async function getCategoryCounts(): Promise<Record<Category, number>> {
  const counts = { Derecho: 0, Política: 0, 'Gestión Pública': 0, Sociedad: 0 } satisfies Record<Category, number>
  for (const essay of await getEssays()) counts[essay.category] += 1
  return counts
}

export async function getSeedComments(slug: string): Promise<EssayComment[]> {
  if (supabase.isSupabaseConfigured()) return supabase.listComments(slug)
  return (commentsJson as EssayComment[])
    .filter((comment) => comment.essaySlug === slug)
    .toSorted((a, b) => b.createdAt.localeCompare(a.createdAt))
}
