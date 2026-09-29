import nodemailer from 'nodemailer'

/**
 * SMTP adapter. Without SMTP_* variables it runs in simulation mode and only logs the email.
 * Server-only.
 */

export interface MailInput {
  to: string
  subject: string
  html: string
  text: string
  replyTo?: string
}

export function isMailerConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
}

let transporter: ReturnType<typeof nodemailer.createTransport> | undefined

function getTransporter() {
  transporter ??= nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT ?? 587) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })
  return transporter
}

export async function sendMail(input: MailInput): Promise<{ simulated: boolean }> {
  if (!isMailerConfigured()) {
    console.info('[mailer:simulado]', { to: input.to, subject: input.subject })
    return { simulated: true }
  }

  await getTransporter().sendMail({
    from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
    ...input,
  })
  return { simulated: false }
}
