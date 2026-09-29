// Contenido de ejemplo: reemplazar con la información real del perfil antes de publicar.

export const professionalProfile = {
  headline: 'Abogado con enfoque en derecho público, gestión pública y análisis de políticas públicas.',
  summary: [
    'Soy abogado oriundo de La Dorada, Caldas, con interés en el derecho constitucional, el derecho administrativo y la gestión de lo público. Mi trabajo combina el rigor jurídico con una mirada práctica sobre cómo las instituciones pueden servir mejor a la ciudadanía.',
    'A través de mis ensayos busco aportar al debate público con análisis críticos y propositivos sobre los desafíos del Estado colombiano, especialmente desde la perspectiva de los territorios.',
  ],
  focus: [
    {
      title: 'Derecho constitucional y administrativo',
      description: 'Análisis de la estructura del Estado, los derechos fundamentales y la actuación de la administración pública.',
    },
    {
      title: 'Gestión pública territorial',
      description: 'Acompañamiento a procesos de planeación, contratación estatal y fortalecimiento institucional en municipios.',
    },
    {
      title: 'Transparencia y participación',
      description: 'Promoción de mecanismos de control ciudadano, rendición de cuentas y acceso a la información pública.',
    },
    {
      title: 'Análisis de políticas públicas',
      description: 'Evaluación del diseño e implementación de políticas desde una perspectiva jurídica y social.',
    },
  ],
  skills: [
    'Contratación estatal',
    'Derecho administrativo',
    'Derecho constitucional',
    'Acciones constitucionales',
    'Planeación territorial',
    'Redacción jurídica',
    'Control político',
    'Investigación socio-jurídica',
  ],
  values: [
    { title: 'Rigor', description: 'Argumentos sustentados en la norma, la jurisprudencia y la evidencia.' },
    { title: 'Integridad', description: 'Ejercicio ético y transparente de la profesión.' },
    { title: 'Compromiso territorial', description: 'Soluciones pensadas desde y para las regiones.' },
  ],
}

export interface ExperienceItem {
  role: string
  organization: string
  period: string
  location: string
  description: string
  highlights: string[]
}

export const experience: ExperienceItem[] = [
  {
    role: 'Abogado consultor',
    organization: 'Ejercicio independiente',
    period: '2023 — Actualidad',
    location: 'La Dorada, Caldas',
    description:
      'Asesoría jurídica a personas, organizaciones sociales y entidades en asuntos de derecho público y administrativo.',
    highlights: [
      'Elaboración de conceptos jurídicos y acciones constitucionales.',
      'Acompañamiento en procesos de contratación estatal.',
      'Asesoría a veedurías y organizaciones ciudadanas.',
    ],
  },
  {
    role: 'Asesor jurídico',
    organization: 'Entidad pública del orden territorial',
    period: '2021 — 2023',
    location: 'Caldas, Colombia',
    description:
      'Apoyo jurídico a la gestión administrativa, la planeación institucional y la atención de requerimientos de los entes de control.',
    highlights: [
      'Revisión y proyección de actos administrativos.',
      'Apoyo en la estructuración de procesos contractuales.',
      'Respuesta a derechos de petición y requerimientos de control.',
    ],
  },
  {
    role: 'Practicante jurídico',
    organization: 'Sector público',
    period: '2020 — 2021',
    location: 'Colombia',
    description: 'Práctica profesional orientada a la gestión documental jurídica y el apoyo en trámites administrativos.',
    highlights: [
      'Sustanciación de expedientes y proyección de respuestas.',
      'Investigación normativa y jurisprudencial.',
    ],
  },
]

export interface EducationItem {
  degree: string
  institution: string
  period: string
  description: string
}

export const education: EducationItem[] = [
  {
    degree: 'Abogado',
    institution: 'Facultad de Derecho',
    period: 'Pregrado',
    description:
      'Formación integral en ciencias jurídicas con énfasis en derecho público, teoría constitucional y derecho administrativo.',
  },
  {
    degree: 'Estudios de posgrado',
    institution: 'Gestión pública / Derecho administrativo',
    period: 'En curso',
    description: 'Profundización en la gestión de entidades públicas, la contratación estatal y la evaluación de políticas públicas.',
  },
]

export const complementaryTraining = [
  { title: 'Contratación estatal y SECOP II', issuer: 'Formación complementaria' },
  { title: 'Transparencia y acceso a la información pública', issuer: 'Formación complementaria' },
  { title: 'Formulación de proyectos de inversión pública', issuer: 'Formación complementaria' },
  { title: 'Mecanismos de participación ciudadana', issuer: 'Formación complementaria' },
]

export const researchInterests = [
  'Regulación del cabildeo y transparencia legislativa',
  'Descentralización y autonomía territorial',
  'Control político en corporaciones públicas',
  'Confianza institucional y participación ciudadana',
]
