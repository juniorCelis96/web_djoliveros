import type { Metadata, Viewport } from 'next'
import { Inter, Source_Serif_4 } from 'next/font/google'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { SubscriptionProvider } from '@/components/subscription/SubscriptionProvider'
import { ThemeScript } from '@/components/theme/ThemeScript'
import { site } from '@/lib/site'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const sourceSerif = Source_Serif_4({ subsets: ['latin'], variable: '--font-source-serif', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.role}`,
    template: `%s · ${site.shortName}`,
  },
  description: site.description,
  authors: [{ name: site.name }],
  keywords: ['abogado', 'derecho', 'política', 'gestión pública', 'ensayos', 'La Dorada', 'Caldas', 'Colombia'],
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    siteName: site.domain,
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
  },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f6f1' },
    { media: '(prefers-color-scheme: dark)', color: '#0a1426' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO" className={`${inter.variable} ${sourceSerif.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-contrast"
        >
          Saltar al contenido
        </a>
        <SubscriptionProvider>
          <SiteHeader />
          <main id="contenido" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <WhatsAppButton />
        </SubscriptionProvider>
      </body>
    </html>
  )
}
