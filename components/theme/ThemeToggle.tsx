'use client'

import { Moon, Sun } from 'lucide-react'

export function ThemeToggle({ className = '' }: { className?: string }) {
  function toggle() {
    const isDark = document.documentElement.classList.toggle('dark')
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`inline-flex size-10 items-center justify-center rounded-md text-ink-muted transition hover:bg-surface-muted hover:text-accent ${className}`}
      aria-label="Cambiar entre modo claro y oscuro"
      title="Cambiar tema"
    >
      <Moon className="size-[1.15rem] dark:hidden" strokeWidth={1.8} />
      <Sun className="hidden size-[1.15rem] dark:block" strokeWidth={1.8} />
    </button>
  )
}
