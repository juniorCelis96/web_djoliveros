import { site } from '@/lib/site'
import type { ContactMessage, Subscriber } from '@/lib/types'

const escape = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!)

const layout = (title: string, body: string) => `
  <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:32px;background:#f8f6f1;color:#0f1d33">
    <p style="font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#8f6726;margin:0 0 8px">${site.tagline}</p>
    <h1 style="font-size:22px;margin:0 0 20px">${title}</h1>
    <div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#45536a">${body}</div>
    <hr style="border:none;border-top:1px solid #e3dccf;margin:28px 0 16px" />
    <p style="font-family:Arial,sans-serif;font-size:12px;color:#6b778a;margin:0">${site.name} · ${site.role} · ${site.location}</p>
  </div>`

export function welcomeEmail(subscriber: Subscriber) {
  const name = escape(subscriber.name)
  return {
    subject: `Bienvenido(a) a ${site.domain}`,
    text: `Hola ${subscriber.name}, gracias por suscribirte. Recibirás los nuevos ensayos y podrás participar en las conversaciones del sitio.`,
    html: layout(
      `Gracias por suscribirte, ${name}`,
      `<p>Desde ahora recibirás cada nuevo ensayo sobre derecho, política, gestión pública y sociedad, y podrás participar en las conversaciones del sitio.</p>
       <p>— ${site.shortName}</p>`,
    ),
  }
}

export function newSubscriberNotice(subscriber: Subscriber) {
  return {
    subject: `Nuevo suscriptor: ${subscriber.name}`,
    text: `${subscriber.name} <${subscriber.email}> se suscribió al sitio.`,
    html: layout('Nuevo suscriptor', `<p><strong>${escape(subscriber.name)}</strong> &lt;${escape(subscriber.email)}&gt;</p>`),
  }
}

export function contactEmail(message: ContactMessage) {
  return {
    subject: `[Contacto web] ${message.subject}`,
    text: `${message.name} <${message.email}>\n\n${message.message}`,
    html: layout(
      escape(message.subject),
      `<p><strong>${escape(message.name)}</strong> &lt;${escape(message.email)}&gt;</p>
       <p style="white-space:pre-line">${escape(message.message)}</p>`,
    ),
  }
}
