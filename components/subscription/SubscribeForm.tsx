'use client'

import { ArrowRight, CircleCheck, LoaderCircle } from 'lucide-react'
import { useActionState, useEffect, useId } from 'react'
import { subscribeAction, type FormState } from '@/app/actions'
import type { Subscriber } from '@/lib/types'
import { useSubscription } from './SubscriptionProvider'

const initialState: FormState<Subscriber> = { status: 'idle', message: '' }

interface SubscribeFormProps {
  source: string
  tone?: 'default' | 'dark'
  layout?: 'stacked' | 'inline'
  onSuccess?: () => void
}

export function SubscribeForm({ source, tone = 'default', layout = 'stacked', onSuccess }: SubscribeFormProps) {
  const { subscriber, subscribe, ready } = useSubscription()
  const [state, formAction, pending] = useActionState(subscribeAction, initialState)
  const id = useId()
  const dark = tone === 'dark'

  useEffect(() => {
    if (state.status === 'success' && state.data) {
      subscribe(state.data)
      onSuccess?.()
    }
  }, [state, subscribe, onSuccess])

  if (ready && subscriber) {
    return (
      <div
        className={`flex items-start gap-3 rounded-lg border p-4 ${dark ? 'border-gold-400/30 bg-white/5 text-navy-100' : 'border-accent/30 bg-accent/5 text-ink-muted'}`}
        role="status"
      >
        <CircleCheck className={`mt-0.5 size-5 shrink-0 ${dark ? 'text-gold-300' : 'text-accent'}`} />
        <p className="text-sm">
          {state.status === 'success' ? state.message : `Ya estás suscrito(a) como ${subscriber.email}.`} Puedes comentar
          en todos los ensayos.
        </p>
      </div>
    )
  }

  const labelClass = dark ? 'mb-1.5 block text-sm font-medium text-navy-100' : 'field-label'
  const fieldClass = dark
    ? 'block w-full rounded-md border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-navy-300 transition focus:border-gold-300 focus:ring-2 focus:ring-gold-300/25 focus:outline-none aria-[invalid=true]:border-red-400'
    : 'field'
  const errorClass = dark ? 'mt-1.5 text-xs font-medium text-red-300' : 'field-error'

  return (
    <form action={formAction} noValidate className="space-y-4">
      <input type="hidden" name="source" value={source} />
      <div className={layout === 'inline' ? 'grid gap-4 sm:grid-cols-2' : 'space-y-4'}>
        <div>
          <label htmlFor={`${id}-name`} className={labelClass}>
            Nombre
          </label>
          <input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            placeholder="Tu nombre"
            defaultValue={state.values?.name}
            aria-invalid={Boolean(state.errors?.name)}
            aria-describedby={state.errors?.name ? `${id}-name-error` : undefined}
            className={fieldClass}
          />
          {state.errors?.name && (
            <p id={`${id}-name-error`} className={errorClass}>
              {state.errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className={labelClass}>
            Correo electrónico
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="tucorreo@ejemplo.com"
            defaultValue={state.values?.email}
            aria-invalid={Boolean(state.errors?.email)}
            aria-describedby={state.errors?.email ? `${id}-email-error` : undefined}
            className={fieldClass}
          />
          {state.errors?.email && (
            <p id={`${id}-email-error`} className={errorClass}>
              {state.errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className={`flex items-start gap-2.5 text-xs leading-relaxed ${dark ? 'text-navy-200' : 'text-ink-subtle'}`}>
          <input
            type="checkbox"
            name="consent"
            className={`mt-0.5 size-4 shrink-0 rounded ${dark ? 'accent-gold-400' : 'accent-navy-900 dark:accent-gold-400'}`}
          />
          <span>
            Autorizo el tratamiento de mis datos personales conforme a la Ley 1581 de 2012 para recibir los ensayos y
            comunicaciones del sitio.
          </span>
        </label>
        {state.errors?.consent && <p className={errorClass}>{state.errors.consent}</p>}
      </div>

      {state.status === 'error' && !state.errors && (
        <p className={errorClass} role="alert">
          {state.message}
        </p>
      )}

      <button type="submit" disabled={pending} className={`w-full ${dark ? 'btn-gold' : 'btn-primary'}`}>
        {pending ? <LoaderCircle className="size-4 animate-spin" /> : null}
        {pending ? 'Suscribiendo…' : 'Suscribirme gratis'}
        {!pending && <ArrowRight className="size-4" />}
      </button>
    </form>
  )
}
