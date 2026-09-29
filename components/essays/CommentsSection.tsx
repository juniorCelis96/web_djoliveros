'use client'

import { Lock, MessageSquare, Send } from 'lucide-react'
import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { useSubscription } from '@/components/subscription/SubscriptionProvider'
import { formatDateTime, initials } from '@/lib/format'
import { localStore } from '@/lib/local-store'
import type { EssayComment } from '@/lib/types'

const MAX_LENGTH = 1200

export function CommentsSection({ slug, seedComments }: { slug: string; seedComments: EssayComment[] }) {
  const { subscriber, isSubscribed, ready, openDialog, unsubscribe } = useSubscription()
  const [localComments, setLocalComments] = useState<EssayComment[]>([])
  const [body, setBody] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setLocalComments(localStore.getComments(slug))
  }, [slug])

  const comments = useMemo(
    () => [...localComments, ...seedComments].toSorted((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [localComments, seedComments],
  )

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!subscriber) return
    const text = body.trim()
    if (text.length < 3) {
      setError('Escribe un comentario un poco más extenso.')
      return
    }
    setLocalComments(
      localStore.addComment({
        id: crypto.randomUUID(),
        essaySlug: slug,
        authorName: subscriber.name,
        body: text,
        createdAt: new Date().toISOString(),
      }),
    )
    setBody('')
    setError('')
  }

  return (
    <section id="comentarios" aria-labelledby="comments-title" className="scroll-mt-28">
      <div className="flex items-center justify-between gap-4">
        <h2 id="comments-title" className="flex items-center gap-3 text-2xl font-semibold">
          <MessageSquare className="size-6 text-accent" strokeWidth={1.7} />
          Conversación
        </h2>
        <span className="rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold text-ink-muted">
          {comments.length} {comments.length === 1 ? 'comentario' : 'comentarios'}
        </span>
      </div>

      <div className="mt-6">
        {!ready ? (
          <div className="card h-40 animate-pulse" />
        ) : isSubscribed && subscriber ? (
          <form onSubmit={handleSubmit} className="card p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <Avatar name={subscriber.name} highlight />
              <div className="min-w-0 flex-1">
                <label htmlFor="comment-body" className="text-sm font-medium text-ink">
                  Comentando como <span className="text-accent">{subscriber.name}</span>
                </label>
                <textarea
                  id="comment-body"
                  value={body}
                  onChange={(event) => setBody(event.target.value.slice(0, MAX_LENGTH))}
                  rows={4}
                  placeholder="Comparte tu análisis, una pregunta o un punto de vista distinto…"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? 'comment-error' : undefined}
                  className="field mt-2 resize-y"
                />
                {error && (
                  <p id="comment-error" className="field-error">
                    {error}
                  </p>
                )}
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs text-ink-subtle">
                    {body.length}/{MAX_LENGTH} ·{' '}
                    <button type="button" onClick={unsubscribe} className="underline-offset-2 hover:text-ink hover:underline">
                      No soy {subscriber.name.split(' ')[0]}
                    </button>
                  </p>
                  <button type="submit" className="btn-primary" disabled={body.trim().length === 0}>
                    <Send className="size-4" /> Publicar comentario
                  </button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="relative overflow-hidden rounded-xl border border-accent/30 bg-linear-to-br from-accent/10 via-surface to-surface p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-contrast">
                <Lock className="size-5" />
              </span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">Únete a la conversación</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                  Los comentarios están reservados para suscriptores. Suscríbete gratis para opinar y recibir cada nuevo ensayo.
                </p>
              </div>
              <button type="button" onClick={() => openDialog(`comentarios:${slug}`)} className="btn-primary shrink-0">
                Suscribirme para comentar
              </button>
            </div>
          </div>
        )}
      </div>

      <ol className="mt-8 space-y-4">
        {comments.map((comment) => (
          <li key={comment.id} className="card p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <Avatar name={comment.authorName} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <p className="font-semibold text-ink">{comment.authorName}</p>
                  <time dateTime={comment.createdAt} className="text-xs text-ink-subtle">
                    {formatDateTime(comment.createdAt)}
                  </time>
                </div>
                <p className="mt-2 text-[0.95rem] leading-relaxed whitespace-pre-line text-ink-muted">{comment.body}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      {comments.length === 0 && (
        <p className="mt-8 text-center text-sm text-ink-subtle">Aún no hay comentarios. ¡Sé la primera persona en opinar!</p>
      )}
    </section>
  )
}

function Avatar({ name, highlight = false }: { name: string; highlight?: boolean }) {
  return (
    <span
      className={`inline-flex size-11 shrink-0 items-center justify-center rounded-full font-serif text-sm font-semibold ${
        highlight ? 'bg-primary text-primary-contrast' : 'bg-surface-muted text-accent ring-1 ring-line'
      }`}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  )
}
