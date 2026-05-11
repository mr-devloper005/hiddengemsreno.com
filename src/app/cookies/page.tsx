import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'

const sections = [
  {
    title: 'Essential cookies',
    body: 'Required for core functions like authentication, session security, and basic navigation. Without these, key parts of the service will not work correctly.',
  },
  {
    title: 'Functional preferences',
    body: 'Store settings such as language, display preferences, and saved filters so your experience remains consistent between visits.',
  },
  {
    title: 'Analytics and performance',
    body: 'Help us understand product performance and aggregate usage patterns so we can improve navigation, readability, and stability.',
  },
  {
    title: 'Advertising',
    body: 'We do not sell personal data to third-party ad networks. If advertising features are introduced, this page will be updated with clear controls and choices.',
  },
  {
    title: 'Managing cookies',
    body: 'You can clear or block cookies through browser controls. Blocking essential cookies may limit sign-in, security checks, and account-related functionality.',
  },
  {
    title: 'Do Not Track',
    body: 'Some browsers offer a Do Not Track signal. Because no uniform standard exists, our response may vary by region and evolving legal requirements.',
  },
  {
    title: 'Policy updates',
    body: 'If our use of cookies changes, we will update this policy and revise the date below so you can review the latest version.',
  },
]

export default function CookiesPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Cookie Policy"
      description="Clear details on how we use cookies and similar technologies."
    >
      <Card className="border-[#e5ddd4] bg-white shadow-sm">
        <CardContent className="space-y-6 p-6 sm:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#6b6560]">Updated · May 11, 2026</p>
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
