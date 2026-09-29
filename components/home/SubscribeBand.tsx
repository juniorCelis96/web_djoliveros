import { BellRing, MessageSquare, ShieldCheck } from 'lucide-react'
import { SubscribeForm } from '@/components/subscription/SubscribeForm'

const benefits = [
  { Icon: BellRing, text: 'Recibe cada nuevo ensayo directamente en tu correo.' },
  { Icon: MessageSquare, text: 'Participa en la conversación y comenta las publicaciones.' },
  { Icon: ShieldCheck, text: 'Sin spam. Puedes darte de baja cuando quieras.' },
]

export function SubscribeBand() {
  return (
    <section className="container-page py-20 md:py-28">
      <div className="relative isolate overflow-hidden rounded-3xl bg-navy-950 px-6 py-12 text-white shadow-2xl sm:px-10 md:px-14 md:py-16">
        <div aria-hidden="true" className="absolute -top-32 -right-24 -z-10 size-[26rem] rounded-full bg-gold-500/15 blur-3xl" />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [mask-image:linear-gradient(to_left,black,transparent)] bg-[size:48px_48px]"
        />
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-gold-300">Comunidad de lectores</p>
            <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
              Suscríbete y forma parte de la conversación
            </h2>
            <ul className="mt-8 space-y-4">
              {benefits.map(({ Icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-navy-100">
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-gold-400/15 text-gold-300">
                    <Icon className="size-4" />
                  </span>
                  <span className="pt-1 text-sm leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur sm:p-8">
            <SubscribeForm source="home" tone="dark" />
          </div>
        </div>
      </div>
    </section>
  )
}
