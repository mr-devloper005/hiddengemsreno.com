import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { SITE_CONFIG } from '@/lib/site-config'

const sections = [
  {
    title: 'What we collect',
    body: 'Account details you provide (name, email, profile information), content you upload, basic device and usage data to keep the service reliable, and communications you send to support.',
  },
  {
    title: 'How we use information',
    body: `To operate ${SITE_CONFIG.name}, personalize your experience, improve search and discovery, keep the platform secure, and—only where allowed—send product updates you can opt out of anytime.`,
  },
  {
    title: 'Sharing & processors',
    body: 'We use trusted infrastructure providers to host media and deliver the app. They process data on our instructions and may not use it for their own marketing.',
  },
  {
    title: 'Your choices & rights',
    body: 'You can export key account data, correct profile fields, and request deletion subject to legal retention needs. Contact us if you need help exercising these rights.',
  },
  {
    title: 'Children',
    body: 'The service is not directed at children under 13, and we do not knowingly collect their personal information.',
  },
]

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy Policy"
      description={`How ${SITE_CONFIG.name} collects, uses, and protects information.`}
    >
      <Card className="border-[#e5ddd4] bg-white shadow-sm">
        <CardContent className="space-y-6 p-6 sm:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#6b6560]">Last updated · April 16, 2026</p>
          <p className="text-sm leading-7 text-[#5c5652]">
            We wrote this policy to be readable. If anything is unclear, email us and we will clarify—not hide behind jargon.
          </p>
          <div className="space-y-4">
            {sections.map((section) => (
              <div key={section.title} className="rounded-[1.35rem] border border-[#e8ded1] bg-[#faf8f6] p-5">
                <h3 className="text-sm font-semibold text-[#1B3022]">{section.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#5c5652]">{section.body}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageShell>
  )
}
