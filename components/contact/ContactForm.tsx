'use client'

import { CircleCheck, LoaderCircle, Send } from 'lucide-react'
import { useActionState, useId } from 'react'
import { contactAction, type FormState } from '@/app/actions'
import type { ContactMessage } from '@/lib/types'

const initialState: FormState<ContactMessage> = { status: 'idle', message: '' }

export function ContactForm() {
  const [state, formAction, pending] = useActionState(contactAction, initialState)
  const id = useId()

  if (state.status === 'success') {
    return (
      <div className="card flex flex-col items-center px-6 py-16 text-center" role="status">
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <CircleCheck className="size-7" />
        </span>
        <h3 className="mt-5 text-2xl font-semibold">Mensaje enviado</h3>
        <p className="mt-2 max-w-sm text-ink-muted">{state.message}</p>
      </div>
    )
  }

  const field = (name: keyof ContactMessage) => ({
    id: `${id}-${name}`,
    name,
    defaultValue: state.values?.[name],
    'aria-invalid': Boolean(state.errors?.[name]),
    'aria-describedby': state.errors?.[name] ? `${id}-${name}-error` : undefined,
    className: 'field',
  })

  const error = (name: keyof ContactMessage) =>
    state.errors?.[name] ? (
      <p id={`${id}-${name}-error`} className="field-error">
        {state.errors[name]}
      </p>
    ) : null

  return (
    <form action={formAction} noValidate className="card space-y-5 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="field-label">
            Nombre completo
          </label>
          <input {...field('name')} autoComplete="name" placeholder="Tu nombre" />
          {error('name')}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="field-label">
            Correo electrónico
          </label>
          <input {...field('email')} type="email" autoComplete="email" placeholder="tucorreo@ejemplo.com" />
          {error('email')}
        </div>
      </div>
      <div>
        <label htmlFor={`${id}-subject`} className="field-label">
          Asunto
        </label>
        <input {...field('subject')} placeholder="¿En qué te puedo ayudar?" />
        {error('subject')}
      </div>
      <div>
        <label htmlFor={`${id}-message`} className="field-label">
          Mensaje
        </label>
        <textarea {...field('message')} rows={6} placeholder="Cuéntame brevemente tu consulta o propuesta…" className="field resize-y" />
        {error('message')}
      </div>
      <div>
        <label className="flex items-start gap-2.5 text-xs leading-relaxed text-ink-subtle">
          <input type="checkbox" name="consent" className="mt-0.5 size-4 shrink-0 rounded accent-navy-900 dark:accent-gold-400" />
          <span>Autorizo el tratamiento de mis datos personales conforme a la Ley 1581 de 2012 para responder a mi mensaje.</span>
        </label>
        {state.errors?.consent && <p className="field-error">{state.errors.consent}</p>}
      </div>

      {state.status === 'error' && !state.errors && (
        <p className="field-error" role="alert">
          {state.message}
        </p>
      )}

      <button type="submit" disabled={pending} className="btn-primary w-full py-3 sm:w-auto">
        {pending ? <LoaderCircle className="size-4 animate-spin" /> : <Send className="size-4" />}
        {pending ? 'Enviando…' : 'Enviar mensaje'}
      </button>
    </form>
  )
}
