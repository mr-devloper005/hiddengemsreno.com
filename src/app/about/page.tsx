import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { mockTeamMembers } from '@/data/mock-data'
import { SITE_CONFIG } from '@/lib/site-config'

const highlights = [
  { label: 'Local spotlights published', value: '480+' },
  { label: 'Creators & hosts on platform', value: '2.4k' },
  { label: 'Cities represented', value: '36' },
]

const values = [
  {
    title: 'Quality over noise',
    description: 'We spotlight places and people worth knowing—curated with care instead of algorithmic churn.',
  },
  {
    title: 'Warm, editorial design',
    description: 'Soft neutrals, generous spacing, and gold-and-forest accents keep the experience calm and premium.',
  },
  {
    title: 'Built to be shared',
    description: 'Profiles, galleries, and stories are structured so they are easy to link, save, and revisit.',
  },
]

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title={`The story behind ${SITE_CONFIG.name}`}
      description={`We are building a quieter corner of the internet for discovery—where locals, travelers, and creators meet through imagery, profiles, and trustworthy recommendations.`}
      actions={
        <>
          <Button variant="outline" asChild className="rounded-full border-[#e5ddd4] bg-white">
            <Link href="/team">Leadership & team</Link>
          </Button>
          <Button asChild className="rounded-full bg-[#1B3022] text-[#faf8f6] hover:bg-[#243d2e]">
            <Link href="/contact">Get in touch</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-[#e5ddd4] bg-white shadow-[0_22px_60px_rgba(26,26,26,0.07)] ring-1 ring-[rgba(176,141,68,0.1)]">
          <CardContent className="space-y-5 p-6 sm:p-8">
            <Badge className="rounded-full border border-[#e8ded1] bg-[#faf8f6] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1B3022]">
              Why we exist
            </Badge>
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#1a1a1a]">
              A modern home for hidden gems—shops, studios, hosts, and makers you will actually remember.
            </h2>
            <p className="text-sm leading-7 text-[#5c5652]">
              {SITE_CONFIG.name} brings together visual storytelling and human profiles so recommendations feel personal, not transactional. Whether you are planning a weekend or
              documenting your own craft, the same design language keeps everything cohesive.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-[1.25rem] border border-[#e8ded1] bg-[#faf8f6] p-4 text-center sm:text-left">
                  <div className="text-2xl font-semibold text-[#1B3022]">{item.value}</div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-[#6b6560]">{item.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {values.map((value) => (
            <Card key={value.title} className="border-[#e5ddd4] bg-white transition hover:shadow-[0_16px_44px_rgba(26,26,26,0.06)]">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-[#1a1a1a]">{value.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#5c5652]">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#1B3022]/85">People behind the product</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {mockTeamMembers.map((member) => (
            <Card key={member.id} className="border-[#e5ddd4] bg-white transition hover:-translate-y-0.5 hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border border-[#e8ded1]">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-[#1a1a1a]">{member.name}</p>
                    <p className="text-xs text-[#6b6560]">{member.role}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-7 text-[#5c5652]">{member.bio}</p>
                <p className="mt-3 text-xs text-[#6b6560]">{member.location}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
