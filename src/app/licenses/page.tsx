import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'

const licenses = [
  { name: 'Next.js', description: 'MIT License · App framework & routing' },
  { name: 'React', description: 'MIT License · UI library' },
  { name: 'Tailwind CSS', description: 'MIT License · Utility-first styling' },
  { name: 'Lucide Icons', description: 'ISC License · Icon set' },
  { name: 'Radix UI', description: 'MIT License · Accessible primitives' },
]

export default function LicensesPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Open source licenses"
      description="We stand on the shoulders of excellent open source projects. Here are the core dependencies that power this experience."
    >
      <Card className="border-[#e5ddd4] bg-white shadow-sm">
        <CardContent className="space-y-3 p-6 sm:p-8">
          {licenses.map((license) => (
            <div key={license.name} className="rounded-[1.35rem] border border-[#e8ded1] bg-[#faf8f6] p-5">
              <h3 className="text-sm font-semibold text-[#1a1a1a]">{license.name}</h3>
              <p className="mt-1 text-sm text-[#5c5652]">{license.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </PageShell>
  )
}
