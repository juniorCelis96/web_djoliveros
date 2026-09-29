export const CATEGORIES = ['Derecho', 'Política', 'Gestión Pública', 'Sociedad'] as const

export type Category = (typeof CATEGORIES)[number]

export interface EssaySection {
  id: string
  heading: string
  paragraphs: string[]
}

export interface Essay {
  slug: string
  title: string
  excerpt: string
  category: Category
  tags: string[]
  author: string
  publishedAt: string
  readingMinutes: number
  likes: number
  cover?: string
  sections: EssaySection[]
}

export interface EssayComment {
  id: string
  essaySlug: string
  authorName: string
  body: string
  createdAt: string
}

export interface Subscriber {
  name: string
  email: string
}

export interface ContactMessage {
  name: string
  email: string
  subject: string
  message: string
}
