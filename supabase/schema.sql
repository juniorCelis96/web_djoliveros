-- Esquema para conectar el sitio a Supabase (ejecutar en el SQL Editor del proyecto).

create table if not exists public.essays (
  slug text primary key,
  title text not null,
  excerpt text not null,
  category text not null check (category in ('Derecho', 'Política', 'Gestión Pública', 'Sociedad')),
  tags text[] not null default '{}',
  author text not null default 'David Julián Oliveros Serrano',
  published_at date not null default current_date,
  reading_minutes int not null default 5,
  likes int not null default 0,
  cover text,
  sections jsonb not null default '[]',
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  source text,
  created_at timestamptz not null default now()
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  essay_slug text not null references public.essays (slug) on delete cascade,
  author_name text not null,
  author_email text not null,
  body text not null check (char_length(body) between 3 and 2000),
  created_at timestamptz not null default now()
);

create index if not exists comments_essay_slug_idx on public.comments (essay_slug, created_at desc);

alter table public.essays enable row level security;
alter table public.subscribers enable row level security;
alter table public.comments enable row level security;

create policy "Ensayos publicados son públicos" on public.essays for select using (published);
create policy "Comentarios son públicos" on public.comments for select using (true);
