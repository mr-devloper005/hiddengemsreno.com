import Link from 'next/link'
import { Bookmark, Building2, FileText, Image as ImageIcon, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { REGISTER_PAGE_OVERRIDE_ENABLED, RegisterPageOverride } from '@/overrides/register-page'

function getRegisterConfig(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      shell: 'bg-[#f5f5f5] text-[#1a1a1a]',
      panel: 'border border-[#e5ddd4] bg-white shadow-[0_24px_60px_rgba(26,26,26,0.06)]',
      side: 'border border-[#e8ded1] bg-[#faf8f6]',
      muted: 'text-[#5c5652]',
      action: 'bg-[#1B3022] text-[#faf8f6] hover:bg-[#243d2e]',
      icon: Building2,
      title: 'Create a business-ready account',
      body: 'List services, manage locations, and activate trust signals with a proper directory workflow.',
    }
  }
  if (kind === 'editorial') {
    return {
      shell: 'bg-[#f5f5f5] text-[#1a1a1a]',
      panel: 'border border-[#e5ddd4] bg-white shadow-[0_24px_60px_rgba(26,26,26,0.06)]',
      side: 'border border-[#e8ded1] bg-[#faf8f6]',
      muted: 'text-[#5c5652]',
      action: 'bg-[#1B3022] text-[#faf8f6] hover:bg-[#243d2e]',
      icon: FileText,
      title: 'Start your contributor workspace',
      body: 'Create a profile for essays, issue drafts, editorial review, and publication scheduling.',
    }
  }
  if (kind === 'visual') {
    return {
      shell: 'bg-[#f5f5f5] text-[#1a1a1a]',
      panel: 'border border-[#e5ddd4] bg-white shadow-[0_24px_60px_rgba(26,26,26,0.06)]',
      side: 'border border-[#e8ded1] bg-[#faf8f6]',
      muted: 'text-[#5c5652]',
      action: 'bg-[#1B3022] text-[#faf8f6] hover:bg-[#243d2e]',
      icon: ImageIcon,
      title: 'Set up your creator profile',
      body: 'Launch a visual-first account with gallery publishing, identity surfaces, and profile-led discovery.',
    }
  }
  return {
    shell: 'bg-[#f5f5f5] text-[#1a1a1a]',
    panel: 'border border-[#e5ddd4] bg-white shadow-[0_24px_60px_rgba(26,26,26,0.06)]',
    side: 'border border-[#e8ded1] bg-[#faf8f6]',
    muted: 'text-[#5c5652]',
    action: 'bg-[#1B3022] text-[#faf8f6] hover:bg-[#243d2e]',
    icon: Bookmark,
    title: 'Create a curator account',
    body: 'Build shelves, save references, and connect collections to your profile without a generic feed setup.',
  }
}

export default function RegisterPage() {
  if (REGISTER_PAGE_OVERRIDE_ENABLED) {
    return <RegisterPageOverride />
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const config = getRegisterConfig(productKind)
  const Icon = config.icon

  return (
    <div className={`min-h-screen ${config.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <section className="relative grid gap-8 overflow-hidden rounded-[2rem] border border-[#e5ddd4] bg-[linear-gradient(180deg,#faf8f6_0%,#fff_50%)] p-6 shadow-[0_28px_75px_rgba(26,26,26,0.08)] sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch lg:p-10">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-[3px] bg-[linear-gradient(180deg,#B08D44_0%,#D4AF37_55%,#1B3022_100%)] sm:w-1" aria-hidden />
          <div className={`rounded-[1.75rem] p-6 sm:p-8 ${config.side}`}>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-[#e8ded1] bg-white">
                <img src="/favicon.png?v=20260416" alt="" width={40} height={40} className="h-9 w-9 object-contain" />
              </div>
              <Icon className="h-7 w-7 text-[#1B3022]" />
            </div>
            <h1 className="mt-6 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{config.title}</h1>
            <p className={`mt-5 text-sm leading-8 ${config.muted}`}>{config.body}</p>
            <div className="mt-8 grid gap-4">
              {[
                'Warm, gallery-inspired interface that matches the rest of the site',
                'Clear paths for publishing, profiles, and discovery—without clutter',
                'Designed for calm focus: fewer modals, softer contrast, generous spacing',
              ].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-[#e8ded1] bg-white/90 px-4 py-4 text-sm text-[#5c5652] shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-[1.75rem] p-6 ring-1 ring-[rgba(176,141,68,0.12)] sm:p-8 ${config.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6b6560]">Create account</p>
            <form className="mt-6 grid gap-4">
              <input className="h-12 rounded-full border border-[#e5ddd4] bg-[#faf8f6] px-5 text-sm text-[#1a1a1a]" placeholder="Full name" />
              <input className="h-12 rounded-full border border-[#e5ddd4] bg-[#faf8f6] px-5 text-sm text-[#1a1a1a]" placeholder="Email address" />
              <input className="h-12 rounded-full border border-[#e5ddd4] bg-[#faf8f6] px-5 text-sm text-[#1a1a1a]" placeholder="Password" type="password" />
              <input className="h-12 rounded-full border border-[#e5ddd4] bg-[#faf8f6] px-5 text-sm text-[#1a1a1a]" placeholder="What are you creating or publishing?" />
              <button type="submit" className={`inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold ${config.action}`}>Create account</button>
            </form>
            <div className={`mt-6 flex items-center justify-between text-sm ${config.muted}`}>
              <span>Already have an account?</span>
              <Link href="/login" className="inline-flex items-center gap-2 font-semibold text-[#1B3022] hover:underline">
                <Sparkles className="h-4 w-4" />
                Sign in
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
