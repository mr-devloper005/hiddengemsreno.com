import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'

const sections = [
  {
    title: 'Essential cookies',
    body: 'Required for sign-in, security, and core navigation. These cannot be switched off if you want the product to work reliably.',
  },
  {
    title: 'Functional preferences',
    body: 'Remember choices like language, layout density, and filters so you do not have to reset them on every visit.',
  },
  {
    title: 'Analytics',
    body: 'Help us understand aggregate usage—what is confusing, what is fast—without selling your data to ad networks.',
  },
  {
    title: 'Managing cookies',
    body: 'Use your browser settings to block or clear cookies. Note that some features may degrade if essential cookies are blocked.',
  },
]

export default function CookiesPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Cookie Policy"
      description="Transparent detail on how we use cookies and similar technologies."
    >
      <Card className="border-[#e5ddd4] bg-white shadow-sm">
        <CardContent className="space-y-6 p-6 sm:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#6b6560]">Updated · April 16, 2026</p>
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
