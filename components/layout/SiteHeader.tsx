'use client'

import { BadgeCheck, Briefcase, ChevronDown, GraduationCap, Menu, UserRound, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Logo } from '@/components/brand/Logo'
import { WhatsAppIcon } from '@/components/icons/BrandIcons'
import { useSubscription } from '@/components/subscription/SubscriptionProvider'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { profileLinks, site, whatsappLink } from '@/lib/site'

const profileIcons = [UserRound, Briefcase, GraduationCap]

const isActive = (pathname: string, href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

export function SiteHeader() {
  const pathname = usePathname()
  const { isSubscribed, ready, openDialog } = useSubscription()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setProfileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!profileOpen) return
    const onPointer = (event: PointerEvent) => {
      if (!profileRef.current?.contains(event.target as Node)) setProfileOpen(false)
    }
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setProfileOpen(false)
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [profileOpen])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const profileActive = pathname.startsWith('/perfil')

  const navLinkClass = (active: boolean) =>
    `relative px-3 py-2 text-sm font-medium transition-colors after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:origin-left after:rounded-full after:bg-accent after:transition-transform ${
      active ? 'text-ink after:scale-x-100' : 'text-ink-muted hover:text-ink after:scale-x-0 hover:after:scale-x-100'
    }`

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'border-line bg-canvas/90 shadow-[0_4px_24px_-12px_rgba(15,29,51,0.18)] backdrop-blur-md'
          : 'border-transparent bg-canvas/70 backdrop-blur-sm'
      }`}
    >
      <div className="container-page flex h-18 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          <Link href="/" className={navLinkClass(isActive(pathname, '/'))}>
            Inicio
          </Link>

          <div
            ref={profileRef}
            className="relative"
            onMouseEnter={() => setProfileOpen(true)}
            onMouseLeave={() => setProfileOpen(false)}
          >
            <button
              type="button"
              className={`${navLinkClass(profileActive)} inline-flex items-center gap-1`}
              aria-expanded={profileOpen}
              aria-controls="profile-menu"
              onClick={() => setProfileOpen((open) => !open)}
            >
              Perfil
              <ChevronDown className={`size-4 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
            </button>

            <div
              id="profile-menu"
              className={`absolute top-full left-1/2 w-[22rem] -translate-x-1/2 pt-3 transition-all duration-200 ${
                profileOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
              }`}
            >
              <ul className="card overflow-hidden p-2 shadow-[0_24px_48px_-16px_rgba(15,29,51,0.3)]">
                {profileLinks.map((link, index) => {
                  const Icon = profileIcons[index]
                  const active = pathname === link.href
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`group flex gap-3.5 rounded-lg p-3 transition-colors ${active ? 'bg-surface-muted' : 'hover:bg-surface-muted'}`}
                        aria-current={active ? 'page' : undefined}
                      >
                        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-primary-contrast dark:group-hover:text-navy-950">
                          <Icon className="size-5" strokeWidth={1.7} />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-ink">{link.label}</span>
                          <span className="mt-0.5 block text-xs leading-relaxed text-ink-subtle">{link.description}</span>
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          <Link href="/ensayos" className={navLinkClass(isActive(pathname, '/ensayos'))}>
            Ensayos
          </Link>
          <Link href="/contacto" className={navLinkClass(isActive(pathname, '/contacto'))}>
            Contacto
          </Link>
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <div className="hidden w-36 justify-end sm:flex">
            {ready && isSubscribed ? (
              <span className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-accent">
                <BadgeCheck className="size-4" /> Suscrito
              </span>
            ) : (
              <button
                type="button"
                onClick={() => openDialog('header')}
                className="btn-primary px-4 py-2"
                disabled={!ready}
              >
                Suscribirme
              </button>
            )}
          </div>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-md text-ink transition hover:bg-surface-muted lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`overflow-y-auto border-t border-line bg-canvas transition-[max-height,opacity] duration-300 lg:hidden ${
          mobileOpen ? 'max-h-[calc(100dvh-4.5rem)] opacity-100' : 'pointer-events-none max-h-0 border-transparent opacity-0'
        }`}
      >
        <nav aria-label="Menú móvil" className="container-page flex flex-col gap-1 py-5">
          {[{ label: 'Inicio', href: '/' }].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-3 text-base font-medium ${isActive(pathname, link.href) ? 'bg-surface-muted text-ink' : 'text-ink-muted'}`}
            >
              {link.label}
            </Link>
          ))}

          <p className="mt-3 px-3 text-xs font-semibold tracking-[0.2em] text-accent uppercase">Perfil</p>
          {profileLinks.map((link, index) => {
            const Icon = profileIcons[index]
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium ${pathname === link.href ? 'bg-surface-muted text-ink' : 'text-ink-muted'}`}
              >
                <Icon className="size-5 text-accent" strokeWidth={1.7} />
                {link.label}
              </Link>
            )
          })}

          <div className="my-3 h-px bg-line" />
          {[
            { label: 'Ensayos', href: '/ensayos' },
            { label: 'Contacto', href: '/contacto' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-3 text-base font-medium ${isActive(pathname, link.href) ? 'bg-surface-muted text-ink' : 'text-ink-muted'}`}
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {ready && !isSubscribed && (
              <button type="button" onClick={() => openDialog('menu-movil')} className="btn-primary">
                Suscribirme
              </button>
            )}
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-outline">
              <WhatsAppIcon className="size-4" /> {site.phone.display}
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
