/**
 * Adaptador simulado para enviar correos (SMTP).
 * - Para pruebas locales se simula el envío.
 * - Cuando tengas credenciales (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS)
 *   implementa la lógica real con nodemailer o un servicio API (SendGrid, Mailgun).
 */
export async function sendEmailSimulated(to: string, subject: string, text: string) {
  console.log('[smtp adapter] simulated send email', { to, subject, text })
  return Promise.resolve({ ok: true })
}

// Ejemplo de plantilla para implementar con nodemailer (comentado)
/*
import nodemailer from 'nodemailer'

export async function sendEmailReal(to: string, subject: string, text: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM || '"David J Oliveros" <no-reply@example.com>',
    to,
    subject,
    text,
    html: `<p>${text}</p>`,
  })
  return info
}
*/

