import { ArrowLeft, Scale } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <span className="inline-flex size-16 items-center justify-center rounded-full bg-accent/10 text-accent">
        <Scale className="size-7" strokeWidth={1.5} />
      </span>
      <p className="mt-6 font-serif text-7xl font-semibold text-accent">404</p>
      <h1 className="mt-4 text-3xl font-semibold">Página no encontrada</h1>
      <p className="mt-3 max-w-md text-ink-muted">
        La página que buscas no existe o fue trasladada. Te invitamos a volver al inicio o explorar los ensayos.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          <ArrowLeft className="size-4" /> Volver al inicio
        </Link>
        <Link href="/ensayos" className="btn-outline">
          Ver ensayos
        </Link>
      </div>
    </section>
  )
}
