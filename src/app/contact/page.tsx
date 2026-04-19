import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'

const lanes = [
  {
    icon: MessageCircle,
    title: 'General inquiries',
    body: 'Questions about accounts, publishing, or how to get the most from the platform—we read every message and route it to the right person.',
  },
  {
    icon: Phone,
    title: 'Partnerships & press',
    body: 'Collaborations, media requests, and brand storytelling. Share timing, audience, and what you are hoping to achieve.',
  },
  {
    icon: MapPin,
    title: 'Local & community',
    body: 'Spotlight requests, neighborhood features, and ideas that help people discover places and people worth knowing.',
  },
]

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#1a1a1a]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="relative overflow-hidden rounded-[2rem] border border-[#e5ddd4] bg-[linear-gradient(180deg,#faf8f6_0%,#ffffff_55%)] p-8 shadow-[0_24px_70px_rgba(26,26,26,0.07)] sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute -right-20 top-0 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.14),transparent_68%)]" aria-hidden />
          <div className="pointer-events-none absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(27,48,34,0.07),transparent_72%)]" aria-hidden />
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#1B3022]/85">Contact</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Let&apos;s talk about what you&apos;re building, sharing, or discovering on {SITE_CONFIG.name}.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-[#5c5652]">
            Skip the generic ticket queue—tell us what you need in plain language. We&apos;ll respond with clear next steps, whether you&apos;re a creator, a local business, or a curious reader.
          </p>
        </div>

        <section className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-5">
            {lanes.map((lane) => (
              <div
                key={lane.title}
                className="rounded-[1.75rem] border border-[#e8ded1] bg-[#faf8f6] p-6 shadow-[0_14px_40px_rgba(26,26,26,0.05)] transition hover:border-[#d9c5c1]"
              >
                <lane.icon className="h-5 w-5 text-[#1B3022]" />
                <h2 className="mt-3 text-xl font-semibold tracking-[-0.02em]">{lane.title}</h2>
                <p className="mt-2 text-sm leading-7 text-[#5c5652]">{lane.body}</p>
              </div>
            ))}
            <p className="text-sm text-[#5c5652]">
              Prefer email directly?{' '}
              <a href="mailto:hello@example.com" className="font-semibold text-[#1B3022] underline-offset-4 hover:underline">
                hello@example.com
              </a>
            </p>
          </div>

          <div className="rounded-[2rem] border border-[#e5ddd4] bg-white p-7 shadow-[0_22px_60px_rgba(26,26,26,0.08)] ring-1 ring-[rgba(176,141,68,0.1)] sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#e8ded1] bg-[#faf8f6]">
                <Mail className="h-5 w-5 text-[#1B3022]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold tracking-[-0.02em]">Send a message</h2>
                <p className="text-xs text-[#6b6560]">We typically reply within two business days.</p>
              </div>
            </div>
            <form className="mt-6 grid gap-4">
              <input
                className="h-12 rounded-full border border-[#e5ddd4] bg-[#faf8f6] px-5 text-sm text-[#1a1a1a] outline-none transition focus:border-[#1B3022]/40"
                placeholder="Your name"
              />
              <input
                className="h-12 rounded-full border border-[#e5ddd4] bg-[#faf8f6] px-5 text-sm text-[#1a1a1a] outline-none transition focus:border-[#1B3022]/40"
                placeholder="Email address"
                type="email"
              />
              <input
                className="h-12 rounded-full border border-[#e5ddd4] bg-[#faf8f6] px-5 text-sm text-[#1a1a1a] outline-none transition focus:border-[#1B3022]/40"
                placeholder="Topic (e.g. partnership, support, press)"
              />
              <textarea
                className="min-h-[160px] rounded-[1.5rem] border border-[#e5ddd4] bg-[#faf8f6] px-5 py-4 text-sm text-[#1a1a1a] outline-none transition focus:border-[#1B3022]/40"
                placeholder="Share context so we can help in one pass—links, timelines, and what success looks like for you."
              />
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#1B3022] px-6 text-sm font-semibold text-[#faf8f6] transition hover:bg-[#243d2e]"
              >
                Send message
              </button>
            </form>
            <p className="mt-5 text-center text-xs text-[#6b6560]">
              By sending this form you agree to our{' '}
              <Link href="/privacy" className="font-medium text-[#1B3022] hover:underline">
                Privacy
              </Link>{' '}
              practices.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
