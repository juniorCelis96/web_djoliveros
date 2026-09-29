export const site = {
  name: 'David Julián Oliveros Serrano',
  shortName: 'David J. Oliveros',
  domain: 'DavidJOliveros.com',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  role: 'Abogado',
  tagline: 'Ideas que transforman realidad',
  taglineDescription: 'Ensayos sobre derecho, política, gestión pública y sociedad.',
  description:
    'Portafolio profesional y ensayos del abogado David Julián Oliveros Serrano sobre derecho, política, gestión pública y sociedad.',
  location: 'La Dorada, Caldas, Colombia',
  city: 'La Dorada, Caldas',
  email: 'davidjdjoliveros@gmail.com',
  phone: {
    display: '+57 313 621 5168',
    e164: '+573136215168',
  },
  whatsapp: {
    url: 'https://wa.me/573136215168',
    greeting: 'Hola David, visité tu sitio web y me gustaría conversar contigo.',
  },
  // Leave a URL empty to hide that network across the site.
  social: {
    linkedin: '',
    x: '',
    instagram: '',
  },
  // Place the photo in /public/images and set the path, e.g. '/images/perfil.jpg'.
  portrait: '',
} as const

export const whatsappLink = (text: string = site.whatsapp.greeting) =>
  `${site.whatsapp.url}?text=${encodeURIComponent(text)}`

export type NavLink = { label: string; href: string; description?: string }

export const profileLinks: NavLink[] = [
  {
    label: 'Perfil Profesional',
    href: '/perfil',
    description: 'Enfoque, competencias y visión del ejercicio jurídico.',
  },
  {
    label: 'Experiencia Laboral',
    href: '/perfil/experiencia',
    description: 'Trayectoria en el sector público y la asesoría jurídica.',
  },
  {
    label: 'Perfil Académico',
    href: '/perfil/academico',
    description: 'Formación universitaria y estudios complementarios.',
  },
]

export const mainLinks: NavLink[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Ensayos', href: '/ensayos' },
  { label: 'Contacto', href: '/contacto' },
]
