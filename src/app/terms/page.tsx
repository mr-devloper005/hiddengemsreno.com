import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { SITE_CONFIG } from '@/lib/site-config'

const sections = [
  {
    title: 'Using the service',
    body: `By accessing ${SITE_CONFIG.name}, you agree to these terms and to any posted guidelines. You must provide accurate account information and keep credentials secure.`,
  },
  {
    title: 'Your content',
    body: 'You retain rights to content you post. You grant us a license to host, display, and distribute that content as needed to operate and promote the platform.',
  },
  {
    title: 'Acceptable use',
    body: 'No harassment, hate speech, illegal activity, spam, or attempts to compromise security. We may remove content or suspend accounts that put the community at risk.',
  },
  {
    title: 'Disclaimers & liability',
    body: 'The service is provided "as is." To the fullest extent permitted by law, we are not liable for indirect damages or losses from reliance on user-submitted content.',
  },
  {
    title: 'Changes',
    body: 'We may update these terms and will post the new effective date here. Continued use after changes means you accept the updated terms.',
  },
]

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Terms of Service"
      description={`The rules for using ${SITE_CONFIG.name} with clarity and respect.`}
    >
      <Card className="border-[#e5ddd4] bg-white shadow-sm">
        <CardContent className="space-y-6 p-6 sm:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#6b6560]">Effective · April 16, 2026</p>
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
