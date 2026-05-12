import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { SITE_CONFIG } from '@/lib/site-config'

const legalPages = [
  {
    title: 'Privacy Policy',
    href: '/privacy',
    description: 'How we collect, use, retain, and protect personal information.',
  },
  {
    title: 'Terms of Service',
    href: '/terms',
    description: 'Rules, responsibilities, and acceptable use of the platform.',
  },
  {
    title: 'Cookie Policy',
    href: '/cookies',
    description: 'How cookies and similar technologies are used across the site.',
  },
  {
    title: 'Open Source Licenses',
    href: '/licenses',
    description: 'Core open source packages and license families used in this project.',
  },
]

export default function LegalPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Legal Center"
      description={`A single place to review legal policies for ${SITE_CONFIG.name}.`}
    >
      <Card className="border-[#e5ddd4] bg-white shadow-sm">
        <CardContent className="space-y-6 p-6 sm:p-8">
          <p className="text-sm leading-7 text-[#5c5652]">
            We keep our policies readable and up to date. Use the links below to find the right document quickly.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {legalPages.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[1.35rem] border border-[#e8ded1] bg-[#faf8f6] p-5 transition hover:border-[#d9c5c1] hover:bg-white"
              >
                <h2 className="text-base font-semibold text-[#1B3022]">{item.title}</h2>
                <p className="mt-2 text-sm leading-7 text-[#5c5652]">{item.description}</p>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageShell>
  )
}
