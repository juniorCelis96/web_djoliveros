import { WhatsAppIcon } from '@/components/icons/BrandIcons'
import { whatsappLink } from '@/lib/site'

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbeme por WhatsApp"
      className="group fixed right-5 bottom-5 z-30 inline-flex items-center gap-3 rounded-full bg-[#25D366] p-3.5 text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.6)] transition hover:scale-105 hover:bg-[#1ebe5b] sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-6" />
      <span className="pointer-events-none absolute right-full mr-3 hidden rounded-md bg-navy-950 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-white opacity-0 shadow-lg transition group-hover:opacity-100 md:block">
        ¿Hablamos por WhatsApp?
      </span>
    </a>
  )
}
