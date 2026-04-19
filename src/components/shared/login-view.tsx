'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Bookmark, FileText, Image as ImageIcon, Building2, Sparkles } from 'lucide-react'
import type { ProductKind } from '@/design/factory/get-product-kind'
import { useAuth } from '@/lib/auth-context'

function getLoginConfig(kind: ProductKind) {
  if (kind === 'directory') {
    return {
      panel: 'border border-[#e5ddd4] bg-white shadow-[0_24px_60px_rgba(26,26,26,0.06)]',
      side: 'border border-[#e8ded1] bg-[#faf8f6]',
      muted: 'text-[#5c5652]',
      action: 'bg-[#1B3022] text-[#faf8f6] hover:bg-[#243d2e]',
      icon: Building2,
      title: 'Sign in to manage your presence',
      body: 'Access saved preferences and your dashboard using the same lightweight session model as the rest of the site.',
    }
  }
  if (kind === 'editorial') {
    return {
      panel: 'border border-[#e5ddd4] bg-white shadow-[0_24px_60px_rgba(26,26,26,0.06)]',
      side: 'border border-[#e8ded1] bg-[#faf8f6]',
      muted: 'text-[#5c5652]',
      action: 'bg-[#1B3022] text-[#faf8f6] hover:bg-[#243d2e]',
      icon: FileText,
      title: 'Sign in to your workspace',
      body: 'Continue drafting, publishing, and managing content with the same flows—now wrapped in a calmer visual shell.',
    }
  }
  if (kind === 'visual') {
    return {
      panel: 'border border-[#e5ddd4] bg-white shadow-[0_24px_60px_rgba(26,26,26,0.06)]',
      side: 'border border-[#e8ded1] bg-[#faf8f6]',
      muted: 'text-[#5c5652]',
      action: 'bg-[#1B3022] text-[#faf8f6] hover:bg-[#243d2e]',
      icon: ImageIcon,
      title: 'Welcome back, creator',
      body: 'Sign in to sync your gallery preferences and profile. Your session is stored locally in this demo environment.',
    }
  }
  return {
    panel: 'border border-[#e5ddd4] bg-white shadow-[0_24px_60px_rgba(26,26,26,0.06)]',
    side: 'border border-[#e8ded1] bg-[#faf8f6]',
    muted: 'text-[#5c5652]',
    action: 'bg-[#1B3022] text-[#faf8f6] hover:bg-[#243d2e]',
    icon: Bookmark,
    title: 'Open your saved collections',
    body: 'Manage bookmarks and curated lists with the same account session.',
  }
}

export function LoginView({ productKind }: { productKind: ProductKind }) {
  const config = getLoginConfig(productKind)
  const Icon = config.icon
  const { login, isLoading } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    if (!email.trim() || !password) {
      setError('Enter an email and password.')
      return
    }
    try {
      await login(email.trim(), password)
      router.push('/')
      router.refresh()
    } catch {
      setError('Something went wrong. Try again.')
    }
  }

  return (
    <section className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch">
      <div className={`rounded-[2rem] p-8 ${config.side}`}>
        <Icon className="h-8 w-8 text-[#1a1a1a]" />
        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-[#1a1a1a]">{config.title}</h1>
        <p className={`mt-5 text-sm leading-8 ${config.muted}`}>{config.body}</p>
        <div className="mt-8 grid gap-4">
          {['Rounded, editorial forms', 'Charcoal primary actions', 'Same auth behavior as the base platform'].map((item) => (
            <div key={item} className="rounded-[1.5rem] border border-[#e8ded1] bg-white/80 px-4 py-4 text-sm text-[#5c5652]">
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className={`rounded-[2rem] p-8 ${config.panel}`}>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6b6560]">Welcome back</p>
        <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
          <input
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            autoComplete="email"
            className="h-12 rounded-full border border-[#e5ddd4] bg-[#faf8f6] px-5 text-sm text-[#1a1a1a] outline-none transition focus:border-[#1B3022]/40"
            placeholder="Email address"
            type="email"
            name="email"
          />
          <input
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            autoComplete="current-password"
            className="h-12 rounded-full border border-[#e5ddd4] bg-[#faf8f6] px-5 text-sm text-[#1a1a1a] outline-none transition focus:border-[#1B3022]/40"
            placeholder="Password"
            type="password"
            name="password"
          />
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <button
            type="submit"
            disabled={isLoading}
            className={`inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition disabled:opacity-60 ${config.action}`}
          >
            {isLoading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <div className={`mt-6 flex flex-wrap items-center justify-between gap-3 text-sm ${config.muted}`}>
          <Link href="/forgot-password" className="hover:underline">
            Forgot password?
          </Link>
          <Link href="/register" className="inline-flex items-center gap-2 font-semibold text-[#1B3022] hover:underline">
            <Sparkles className="h-4 w-4" />
            Create account
          </Link>
        </div>
      </div>
    </section>
  )
}
