'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export function PageShell({
  title,
  description,
  eyebrow = 'Page',
  actions,
  children,
}: {
  title: string
  description?: string
  eyebrow?: string
  actions?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#1a1a1a]">
      <NavbarShell />
      <main>
        <section className="relative overflow-hidden border-b border-[#e8ded1]/90 bg-[linear-gradient(180deg,#faf8f6_0%,#f5f5f5_100%)]">
          <div
            className="pointer-events-none absolute left-0 top-0 h-full w-[3px] bg-[linear-gradient(180deg,#B08D44_0%,#D4AF37_55%,#1B3022_100%)] sm:w-1"
            aria-hidden
          />
          <div className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.12),transparent_68%)]" aria-hidden />
          <div className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(27,48,34,0.08),transparent_70%)]" aria-hidden />
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-3xl pl-2 sm:pl-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#1B3022]/85">{eyebrow}</p>
                <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[#1a1a1a] sm:text-[2.75rem]">{title}</h1>
                {description ? (
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#5c5652]">{description}</p>
                ) : null}
              </div>
              {actions ? (
                <div className="flex flex-wrap items-center gap-3 pl-2 sm:pl-4 [&_input]:rounded-full [&_button]:rounded-full [&_a]:rounded-full">
                  {actions}
                </div>
              ) : null}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <div className="space-y-10">{children}</div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
