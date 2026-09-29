'use client'

import { Search, X } from 'lucide-react'
import { useDeferredValue, useMemo, useState } from 'react'
import { CATEGORIES, type Category, type Essay } from '@/lib/types'
import { EssayCard } from './EssayCard'

const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

interface EssayExplorerProps {
  essays: Essay[]
  initialCategory?: Category
}

export function EssayExplorer({ essays, initialCategory }: EssayExplorerProps) {
  const [category, setCategory] = useState<Category | 'Todos'>(initialCategory ?? 'Todos')
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  const counts = useMemo(() => {
    const result: Record<string, number> = { Todos: essays.length }
    for (const essay of essays) result[essay.category] = (result[essay.category] ?? 0) + 1
    return result
  }, [essays])

  const results = useMemo(() => {
    const term = normalize(deferredQuery.trim())
    return essays.filter((essay) => {
      if (category !== 'Todos' && essay.category !== category) return false
      if (!term) return true
      return normalize([essay.title, essay.excerpt, essay.tags.join(' ')].join(' ')).includes(term)
    })
  }, [essays, category, deferredQuery])

  const selectCategory = (next: Category | 'Todos') => {
    setCategory(next)
    const url = new URL(window.location.href)
    if (next === 'Todos') url.searchParams.delete('categoria')
    else url.searchParams.set('categoria', next)
    window.history.replaceState(null, '', url)
  }

  return (
    <div>
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div role="tablist" aria-label="Filtrar por categoría" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {(['Todos', ...CATEGORIES] as const).map((item) => {
            const active = category === item
            return (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => selectCategory(item)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                  active
                    ? 'border-primary bg-primary text-primary-contrast shadow-sm'
                    : 'border-line bg-surface text-ink-muted hover:border-accent/50 hover:text-ink'
                }`}
              >
                {item}
                <span
                  className={`rounded-full px-1.5 text-[0.7rem] font-semibold ${active ? 'bg-white/15' : 'bg-surface-muted text-ink-subtle'}`}
                >
                  {counts[item] ?? 0}
                </span>
              </button>
            )
          })}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-ink-subtle" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar ensayos…"
            aria-label="Buscar ensayos"
            className="field pr-9 pl-10 [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded p-1 text-ink-subtle hover:text-ink"
              aria-label="Limpiar búsqueda"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      <p className="mt-6 text-sm text-ink-subtle" aria-live="polite">
        {results.length === 1 ? '1 ensayo' : `${results.length} ensayos`}
        {category !== 'Todos' && ` en ${category}`}
        {deferredQuery.trim() && ` para “${deferredQuery.trim()}”`}
      </p>

      {results.length > 0 ? (
        <div className="mt-6 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((essay) => (
            <EssayCard key={essay.slug} essay={essay} />
          ))}
        </div>
      ) : (
        <div className="card mt-6 flex flex-col items-center px-6 py-16 text-center">
          <span className="inline-flex size-14 items-center justify-center rounded-full bg-accent/10 text-accent">
            <Search className="size-6" />
          </span>
          <h3 className="mt-5 text-xl font-semibold">No encontramos ensayos</h3>
          <p className="mt-2 max-w-sm text-sm text-ink-muted">Prueba con otros términos o explora todas las categorías.</p>
          <button
            type="button"
            className="btn-outline mt-6"
            onClick={() => {
              setQuery('')
              selectCategory('Todos')
            }}
          >
            Ver todos los ensayos
          </button>
        </div>
      )}
    </div>
  )
}
