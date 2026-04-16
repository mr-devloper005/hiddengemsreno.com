import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SITE_CONFIG } from '@/lib/site-config'

const roles = [
  { title: 'Senior Product Designer', location: 'Remote · US time zones', type: 'Full-time', level: 'Senior' },
  { title: 'Full-stack Engineer', location: 'Reno / hybrid', type: 'Full-time', level: 'Mid–Senior' },
  { title: 'Community & creator programs', location: 'Remote', type: 'Full-time', level: 'Mid' },
]

const benefits = [
  'Competitive pay and meaningful equity',
  'Health coverage and flexible PTO',
  'Annual learning budget for conferences and courses',
  'Quarterly team gatherings in walkable cities',
]

export default function CareersPage() {
  return (
    <PageShell
      eyebrow="Careers"
      title={`Build the future of discovery at ${SITE_CONFIG.name}`}
      description="We are a small, design-obsessed team shipping a calmer alternative to noisy review sites and generic social feeds. If you care about craft, local culture, and inclusive product decisions, you will feel at home here."
      actions={
        <Button asChild className="rounded-full bg-[#1B3022] text-[#faf8f6] hover:bg-[#243d2e]">
          <Link href="/contact">View open roles</Link>
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          {roles.map((role) => (
            <Card key={role.title} className="border-[#e5ddd4] bg-white shadow-[0_16px_48px_rgba(26,26,26,0.06)]">
              <CardContent className="p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="rounded-full border border-[#e8ded1] bg-[#faf8f6] text-[#1B3022]">{role.level}</Badge>
                  <Badge variant="outline" className="rounded-full border-[#d9c5c1]">
                    {role.type}
                  </Badge>
                </div>
                <h2 className="mt-3 text-lg font-semibold tracking-[-0.02em] text-[#1a1a1a]">{role.title}</h2>
                <p className="mt-1 text-sm text-[#6b6560]">{role.location}</p>
                <Button variant="outline" className="mt-4 rounded-full border-[#1B3022]/25 text-[#1B3022]" asChild>
                  <Link href="/contact">Ask about this role</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="border-[#e5ddd4] bg-[linear-gradient(180deg,#faf8f6_0%,#fff_100%)] ring-1 ring-[rgba(176,141,68,0.1)]">
          <CardContent className="p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-[#1a1a1a]">Why join now</h3>
            <p className="mt-3 text-sm leading-7 text-[#5c5652]">
              We are early enough that your work ships weekly, and mature enough to offer stability, benefits, and a respectful pace. Design and engineering collaborate as equals—no
              handoffs tossed over the wall.
            </p>
            <div className="mt-6 space-y-3 text-sm text-[#5c5652]">
              {benefits.map((benefit) => (
                <div key={benefit} className="rounded-[1.25rem] border border-[#e8ded1] bg-white px-4 py-3">
                  {benefit}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
