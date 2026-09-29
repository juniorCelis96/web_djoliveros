'use server'

import { sendMail } from '@/lib/adapters/mailer'
import { appendSubscriber } from '@/lib/adapters/sheets'
import * as supabase from '@/lib/adapters/supabase'
import { contactEmail, newSubscriberNotice, welcomeEmail } from '@/lib/emails'
import { site } from '@/lib/site'
import type { ContactMessage, Subscriber } from '@/lib/types'

type FieldErrors<T> = Partial<Record<keyof T | 'consent', string>>

export interface FormState<T> {
  status: 'idle' | 'success' | 'error'
  message: string
  errors?: FieldErrors<T>
  values?: Partial<T>
  data?: T
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const read = (formData: FormData, key: string) => String(formData.get(key) ?? '').trim()

export async function subscribeAction(_prev: FormState<Subscriber>, formData: FormData): Promise<FormState<Subscriber>> {
  const values: Subscriber = { name: read(formData, 'name'), email: read(formData, 'email').toLowerCase() }
  const source = read(formData, 'source') || 'web'
  const errors: FieldErrors<Subscriber> = {}

  if (values.name.length < 2) errors.name = 'Escribe tu nombre.'
  if (!EMAIL_PATTERN.test(values.email)) errors.email = 'Escribe un correo válido.'
  if (formData.get('consent') !== 'on') errors.consent = 'Debes autorizar el tratamiento de tus datos.'

  if (Object.keys(errors).length > 0) {
    return { status: 'error', message: 'Revisa los campos marcados.', errors, values }
  }

  try {
    await Promise.all([
      supabase.isSupabaseConfigured() ? supabase.insertSubscriber({ ...values, source }) : undefined,
      appendSubscriber({ ...values, source }),
    ])
    const welcome = welcomeEmail(values)
    const notice = newSubscriberNotice(values)
    await Promise.all([
      sendMail({ to: values.email, ...welcome }),
      sendMail({ to: process.env.CONTACT_TO_EMAIL ?? site.email, ...notice }),
    ])
  } catch (error) {
    console.error('[subscribeAction]', error)
    return { status: 'error', message: 'No pudimos completar la suscripción. Intenta de nuevo.', values }
  }

  return { status: 'success', message: `¡Bienvenido(a), ${values.name.split(' ')[0]}! Ya haces parte de la comunidad.`, data: values }
}

export async function contactAction(
  _prev: FormState<ContactMessage>,
  formData: FormData,
): Promise<FormState<ContactMessage>> {
  const values: ContactMessage = {
    name: read(formData, 'name'),
    email: read(formData, 'email').toLowerCase(),
    subject: read(formData, 'subject'),
    message: read(formData, 'message'),
  }
  const errors: FieldErrors<ContactMessage> = {}

  if (values.name.length < 2) errors.name = 'Escribe tu nombre completo.'
  if (!EMAIL_PATTERN.test(values.email)) errors.email = 'Escribe un correo válido.'
  if (values.subject.length < 3) errors.subject = 'Indica el asunto de tu mensaje.'
  if (values.message.length < 20) errors.message = 'El mensaje debe tener al menos 20 caracteres.'
  if (formData.get('consent') !== 'on') errors.consent = 'Debes autorizar el tratamiento de tus datos.'

  if (Object.keys(errors).length > 0) {
    return { status: 'error', message: 'Revisa los campos marcados.', errors, values }
  }

  try {
    await sendMail({ to: process.env.CONTACT_TO_EMAIL ?? site.email, replyTo: values.email, ...contactEmail(values) })
  } catch (error) {
    console.error('[contactAction]', error)
    return { status: 'error', message: 'No pudimos enviar tu mensaje. Intenta de nuevo o escríbeme por WhatsApp.', values }
  }

  return { status: 'success', message: 'Gracias por escribir. Te responderé lo antes posible.' }
}
