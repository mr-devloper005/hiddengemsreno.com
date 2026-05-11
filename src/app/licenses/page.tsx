import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'

const licenses = [
  { name: 'Next.js', description: 'MIT License · App framework & routing' },
  { name: 'React', description: 'MIT License · UI library' },
  { name: 'TypeScript', description: 'Apache-2.0 License · Type-safe JavaScript tooling' },
  { name: 'Tailwind CSS', description: 'MIT License · Utility-first styling' },
  { name: 'Lucide Icons', description: 'ISC License · Icon set' },
  { name: 'Radix UI', description: 'MIT License · Accessible primitives' },
  { name: 'Zod', description: 'MIT License · Schema validation and parsing' },
  { name: 'React Hook Form', description: 'MIT License · Form state management' },
]

export default function LicensesPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Open source licenses"
      description="We rely on excellent open source software. Below are key packages used in this project and their license families."
    >
      <Card className="border-[#e5ddd4] bg-white shadow-sm">
        <CardContent className="space-y-4 p-6 sm:p-8">
          <p className="text-sm leading-7 text-[#5c5652]">
            This is a concise attribution summary, not a complete legal inventory. Full license texts and transitive dependency notices are available from package metadata in the repository lockfile and installed dependency tree.
          </p>
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
