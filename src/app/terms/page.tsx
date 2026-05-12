import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { SITE_CONFIG } from '@/lib/site-config'

const sections = [
  {
    title: 'Acceptance of terms',
    body: `By accessing or using ${SITE_CONFIG.name}, you agree to these Terms of Service and any product-specific guidelines posted in the app. If you do not agree, do not use the service.`,
  },
  {
    title: 'Accounts and eligibility',
    body: 'You are responsible for account activity, safeguarding credentials, and providing accurate information. You must be legally able to enter this agreement in your jurisdiction.',
  },
  {
    title: 'User content and license',
    body: 'You retain ownership of content you submit. You grant us a limited, non-exclusive license to host, process, display, and distribute that content solely to operate, improve, and promote the service.',
  },
  {
    title: 'Acceptable use',
    body: 'You may not post unlawful content, infringing material, malware, spam, deceptive listings, or abusive content. We may remove content, limit distribution, or suspend accounts that violate these rules.',
  },
  {
    title: 'Moderation and enforcement',
    body: 'We may investigate reports, remove content, or take account-level action when needed to protect users, platform integrity, and legal compliance.',
  },
  {
    title: 'Third-party links and services',
    body: 'The service may link to third-party websites or tools. We are not responsible for their content, terms, or privacy practices.',
  },
  {
    title: 'Disclaimers and limitation of liability',
    body: 'The service is provided "as is" and "as available." To the maximum extent permitted by law, we are not liable for indirect, incidental, or consequential damages arising from use of the platform.',
  },
  {
    title: 'Termination',
    body: 'You can stop using the service at any time. We may suspend or terminate access for serious or repeated violations, security threats, or legal obligations.',
  },
  {
    title: 'Changes to terms',
    body: 'We may update these terms periodically. Updated terms are effective when posted, and continued use after that date means you accept the revised terms.',
  },
  {
    title: 'Contact',
    body: 'For legal questions about these terms, contact us through the site contact page.',
  },
]

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Terms of Service"
      description={`The rules and responsibilities for using ${SITE_CONFIG.name}.`}
    >
      <Card className="border-[#e5ddd4] bg-white shadow-sm">
        <CardContent className="space-y-6 p-6 sm:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#6b6560]">Effective · May 11, 2026</p>
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
