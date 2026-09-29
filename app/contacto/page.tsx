import type { Metadata } from 'next'
import { ContactForm } from '@/components/contact/ContactForm'
import { ContactInfo } from '@/components/contact/ContactInfo'
import { PageHeader } from '@/components/ui/PageHeader'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contacto',
  description: `Contacta a ${site.name}, abogado de ${site.city}. Teléfono y WhatsApp ${site.phone.display}.`,
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contacto"
        title="Hablemos de tu caso o proyecto"
        description="Asesoría jurídica, consultoría en gestión pública o colaboraciones académicas. Escríbeme por el medio que prefieras."
        breadcrumbs={[{ label: 'Inicio', href: '/' }, { label: 'Contacto' }]}
      />
      <section className="container-page py-16 md:py-20">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <ContactInfo />
          </div>
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
