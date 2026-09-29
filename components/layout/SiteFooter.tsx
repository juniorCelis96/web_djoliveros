import { Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import { Logo } from '@/components/brand/Logo'
import { InstagramIcon, LinkedInIcon, WhatsAppIcon, XIcon } from '@/components/icons/BrandIcons'
import { mainLinks, profileLinks, site, whatsappLink } from '@/lib/site'

const socials = [
  { label: 'LinkedIn', href: site.social.linkedin, Icon: LinkedInIcon },
  { label: 'X (Twitter)', href: site.social.x, Icon: XIcon },
  { label: 'Instagram', href: site.social.instagram, Icon: InstagramIcon },
].filter((social) => social.href)

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-navy-200">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold-400/60 to-transparent"
      />

      <div className="container-page">
        <div className="border-b border-white/10 py-12 text-center md:py-14">
          <p className="mx-auto max-w-3xl font-serif text-xl leading-relaxed text-ivory-100 md:text-2xl">
            <span className="text-gold-300 italic">&quot;Ideas que transforman realidad&quot;</span> - Ensayos sobre
            derecho, política, gestión pública y sociedad.
          </p>
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo tone="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-navy-300">
              Portafolio profesional y espacio de reflexión académica de {site.name}, abogado de {site.city}.
            </p>
            <div className="mt-6 flex gap-2">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="inline-flex size-10 items-center justify-center rounded-md border border-white/10 text-navy-200 transition hover:border-gold-300 hover:text-gold-300"
              >
                <WhatsAppIcon className="size-4" />
              </a>
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex size-10 items-center justify-center rounded-md border border-white/10 text-navy-200 transition hover:border-gold-300 hover:text-gold-300"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Navegación" className="lg:col-span-2">
            {mainLinks.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Perfil" className="lg:col-span-2">
            {profileLinks.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Contacto" className="lg:col-span-3">
            <li>
              <a href={`tel:${site.phone.e164}`} className="group flex items-center gap-3 text-sm transition hover:text-gold-300">
                <Phone className="size-4 text-gold-400" /> {site.phone.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="group flex items-center gap-3 text-sm break-all transition hover:text-gold-300">
                <Mail className="size-4 shrink-0 text-gold-400" /> {site.email}
              </a>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <MapPin className="size-4 text-gold-400" /> {site.location}
            </li>
          </FooterColumn>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-navy-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Todos los derechos reservados.
          </p>
          <p>{site.domain}</p>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, className = '', children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <h2 className="font-sans text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">{title}</h2>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm transition hover:text-gold-300">
        {children}
      </Link>
    </li>
  )
}
