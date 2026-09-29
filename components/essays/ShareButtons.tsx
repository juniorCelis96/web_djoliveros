'use client'

import { Check, Link2, Mail, Share2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FacebookIcon, LinkedInIcon, WhatsAppIcon, XIcon } from '@/components/icons/BrandIcons'

interface ShareButtonsProps {
  title: string
  path: string
  orientation?: 'horizontal' | 'vertical'
}

export function ShareButtons({ title, path, orientation = 'horizontal' }: ShareButtonsProps) {
  const [url, setUrl] = useState(path)
  const [copied, setCopied] = useState(false)
  const [canNativeShare, setCanNativeShare] = useState(false)

  useEffect(() => {
    setUrl(new URL(path, window.location.origin).toString())
    setCanNativeShare(typeof navigator.share === 'function')
  }, [path])

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const networks = [
    { label: 'Compartir en WhatsApp', href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, Icon: WhatsAppIcon },
    { label: 'Compartir en LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, Icon: LinkedInIcon },
    { label: 'Compartir en X', href: `https://x.com/intent/post?text=${encodedTitle}&url=${encodedUrl}`, Icon: XIcon },
    { label: 'Compartir en Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, Icon: FacebookIcon },
    { label: 'Enviar por correo', href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`, Icon: Mail },
  ]

  async function copyLink() {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const buttonClass =
    'inline-flex size-10 items-center justify-center rounded-full border border-line bg-surface text-ink-muted transition hover:-translate-y-0.5 hover:border-accent hover:text-accent'

  return (
    <div className={`flex gap-2 ${orientation === 'vertical' ? 'flex-col' : 'flex-wrap items-center'}`}>
      {networks.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className={buttonClass}
        >
          <Icon className="size-4" />
        </a>
      ))}
      <button type="button" onClick={copyLink} aria-label="Copiar enlace" title="Copiar enlace" className={buttonClass}>
        {copied ? <Check className="size-4 text-accent" /> : <Link2 className="size-4" />}
      </button>
      {canNativeShare && orientation === 'horizontal' && (
        <button
          type="button"
          onClick={() => navigator.share({ title, url }).catch(() => {})}
          aria-label="Más opciones para compartir"
          title="Más opciones"
          className={buttonClass}
        >
          <Share2 className="size-4" />
        </button>
      )}
      <span className="sr-only" aria-live="polite">
        {copied ? 'Enlace copiado' : ''}
      </span>
    </div>
  )
}
