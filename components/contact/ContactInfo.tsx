import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { WhatsAppIcon } from '@/components/icons/BrandIcons'
import { site, whatsappLink } from '@/lib/site'

const channels = [
  { Icon: Phone, label: 'Teléfono', value: site.phone.display, href: `tel:${site.phone.e164}` },
  { Icon: Mail, label: 'Correo electrónico', value: site.email, href: `mailto:${site.email}` },
  { Icon: MapPin, label: 'Ubicación', value: site.location },
  { Icon: Clock, label: 'Horario de atención', value: 'Lunes a viernes, 8:00 a. m. – 6:00 p. m.' },
]

export function ContactInfo() {
  return (
    <div className="space-y-5">
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-4 rounded-xl bg-[#25D366] p-5 text-white shadow-[0_16px_32px_-16px_rgba(37,211,102,0.8)] transition hover:-translate-y-0.5 hover:bg-[#1ebe5b]"
      >
        <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-white/15">
          <WhatsAppIcon className="size-6" />
        </span>
        <span className="flex-1">
          <span className="block text-xs font-semibold tracking-wide uppercase opacity-90">Respuesta rápida</span>
          <span className="block text-lg font-semibold">Escríbeme por WhatsApp</span>
        </span>
      </a>

      <ul className="card divide-y divide-line">
        {channels.map(({ Icon, label, value, href }) => (
          <li key={label} className="flex items-center gap-4 p-5">
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Icon className="size-5" strokeWidth={1.7} />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-semibold tracking-wide text-ink-subtle uppercase">{label}</span>
              {href ? (
                <a href={href} className="block font-medium break-words text-ink transition hover:text-accent">
                  {value}
                </a>
              ) : (
                <span className="block font-medium text-ink">{value}</span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
