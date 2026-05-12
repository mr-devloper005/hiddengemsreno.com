import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { SITE_CONFIG } from '@/lib/site-config'

const sections = [
  {
    title: 'What we collect',
    body: 'We collect information you provide directly (such as name, email, account settings, and submitted content), technical information (such as browser type, device signals, and log events), and support communications so we can operate and improve the platform.',
  },
  {
    title: 'How we use information',
    body: `We use data to run ${SITE_CONFIG.name}, personalize content surfaces, improve performance and search quality, prevent abuse, respond to support requests, and communicate service updates. Where required, marketing communications are opt-in and can be turned off anytime.`,
  },
  {
    title: 'Legal basis & consent',
    body: 'Depending on your location, we process data using one or more legal bases: contract performance, legitimate interests, legal compliance, or consent. You can withdraw consent for optional processing at any time.',
  },
  {
    title: 'Sharing, processors, and transfers',
    body: 'We share data only with service providers needed to operate the platform, such as hosting, analytics, and security vendors. They process data under contract and may not repurpose it for unrelated advertising. If international transfers occur, we apply appropriate safeguards.',
  },
  {
    title: 'Retention',
    body: 'We keep data only as long as necessary for product operation, account continuity, legal obligations, and dispute handling. When retention periods expire, information is deleted or anonymized.',
  },
  {
    title: 'Your choices & rights',
    body: 'You can access, correct, export, or request deletion of your data, and object to certain processing where local law allows. We may need to retain limited records for legal or security reasons.',
  },
  {
    title: 'Security',
    body: 'We use reasonable administrative, technical, and organizational safeguards to protect data. No system is perfectly secure, but we continuously monitor and improve our controls.',
  },
  {
    title: 'Children and age limits',
    body: 'The service is not directed to children under the age required by applicable law in their jurisdiction, and we do not knowingly collect personal data from them.',
  },
  {
    title: 'Policy changes and contact',
    body: 'When this policy changes, we update the effective date and, for material changes, provide additional notice where appropriate. If you have privacy questions, contact support through the site contact page.',
  },
]

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy Policy"
      description={`How ${SITE_CONFIG.name} collects, uses, stores, and protects personal information.`}
    >
      <Card className="border-[#e5ddd4] bg-white shadow-sm">
        <CardContent className="space-y-6 p-6 sm:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#6b6560]">Last updated · May 11, 2026</p>
          <p className="text-sm leading-7 text-[#5c5652]">
            This policy is written for clarity. If anything is unclear, contact us and we will explain it in plain language.
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
