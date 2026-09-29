'use client'

import { BellRing, MessageSquare, X } from 'lucide-react'
import { useCallback, useEffect, useRef } from 'react'
import { SubscribeForm } from './SubscribeForm'

export function SubscribeDialog({ source, onClose }: { source: string | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (source && !dialog.open) dialog.showModal()
    if (!source && dialog.open) dialog.close()
  }, [source])

  const close = useCallback(() => dialogRef.current?.close(), [])
  const handleSuccess = useCallback(() => setTimeout(close, 2200), [close])

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => event.target === dialogRef.current && close()}
      aria-labelledby="subscribe-title"
      className="m-auto w-[calc(100%-2rem)] max-w-md overflow-hidden rounded-2xl border border-line bg-surface p-0 text-ink shadow-2xl backdrop:bg-navy-950/70 backdrop:backdrop-blur-sm open:animate-fade-up"
    >
      {source && (
        <div className="relative p-6 sm:p-8">
          <button
            type="button"
            onClick={close}
            className="absolute top-4 right-4 inline-flex size-9 items-center justify-center rounded-md text-ink-subtle transition hover:bg-surface-muted hover:text-ink"
            aria-label="Cerrar"
          >
            <X className="size-5" />
          </button>

          <p className="eyebrow">Comunidad de lectores</p>
          <h2 id="subscribe-title" className="mt-3 text-2xl font-semibold">
            Suscríbete y participa
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-ink-muted">
            <li className="flex items-center gap-2.5">
              <BellRing className="size-4 text-accent" /> Recibe cada nuevo ensayo en tu correo.
            </li>
            <li className="flex items-center gap-2.5">
              <MessageSquare className="size-4 text-accent" /> Comenta y debate en cada publicación.
            </li>
          </ul>

          <div className="mt-6">
            <SubscribeForm source={source} onSuccess={handleSuccess} />
          </div>
        </div>
      )}
    </dialog>
  )
}
