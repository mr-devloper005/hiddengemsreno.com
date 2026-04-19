import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Code2, Terminal } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata: Metadata = {
  title: `Developers · ${SITE_CONFIG.name}`,
  description: `Documentation, integration patterns, and developer resources for ${SITE_CONFIG.name}.`,
}

const pillars = [
  {
    icon: BookOpen,
    title: 'Guides & concepts',
    body: 'Learn how content types, profiles, and discovery fit together—written for builders who care about clarity, not buzzwords.',
  },
  {
    icon: Code2,
    title: 'Patterns & examples',
    body: 'Reference layouts, embedding notes, and sane defaults you can copy when you ship your own experiences on top of the platform.',
  },
  {
    icon: Terminal,
    title: 'APIs & tooling',
    body: 'Structured endpoints, predictable pagination, and status surfaces so you can automate publishing and monitoring with confidence.',
  },
]

export default function DevelopersPage() {
  return (
    <PageShell
      eyebrow="Developers"
      title="Build with the same calm, premium surface your readers see"
      description={`${SITE_CONFIG.name} is designed so product teams can extend discovery, publishing, and profiles without fighting the UI. Start here for concepts, then dive into the patterns that match your stack.`}
      actions={
        <Button asChild className="border border-[#e5ddd4] bg-[#1B3022] text-[#faf8f6] hover:bg-[#243d2e]">
          <Link href="/status">
            System status
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {pillars.map((item) => (
          <Card key={item.title} className="border-[#e5ddd4] bg-white shadow-[0_18px_50px_rgba(26,26,26,0.06)] ring-1 ring-[rgba(176,141,68,0.08)]">
            <CardContent className="p-6 sm:p-7">
              <item.icon className="h-8 w-8 text-[#1B3022]" />
              <h2 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-[#1a1a1a]">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#5c5652]">{item.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8 border-[#e5ddd4] bg-[#faf8f6] shadow-sm">
        <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h3 className="text-lg font-semibold text-[#1a1a1a]">Need a partner integration?</h3>
            <p className="mt-2 max-w-xl text-sm leading-7 text-[#5c5652]">
              Share your timeline, auth model, and what you are trying to sync. We will point you to the smallest set of endpoints and UI hooks to get live.
            </p>
          </div>
          <Button variant="outline" asChild className="shrink-0 rounded-full border-[#1B3022]/30 text-[#1B3022] hover:bg-[#1B3022]/5">
            <Link href="/contact">Talk to us</Link>
          </Button>
        </CardContent>
      </Card>
    </PageShell>
  )
}
