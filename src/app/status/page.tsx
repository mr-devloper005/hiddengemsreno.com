import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const services = [
  { name: 'Web application', status: 'Operational', detail: 'All regions responding normally.' },
  { name: 'Media & images', status: 'Operational', detail: 'CDN delivery within expected latency.' },
  { name: 'Search & discovery', status: 'Operational', detail: 'Indexing pipeline healthy.' },
]

const incidents = [
  { date: 'April 2, 2026', title: 'Brief image optimization lag', status: 'Resolved', note: 'Mitigated by scaling workers; no data loss.' },
  { date: 'March 18, 2026', title: 'Scheduled maintenance window', status: 'Completed', note: 'Database failover drill; 12 minutes of read-only mode.' },
]

export default function StatusPage() {
  return (
    <PageShell
      eyebrow="Systems"
      title="Platform status"
      description="Live snapshot of core services. We post incidents here first, then follow up by email for anything that affects publishing or payouts."
    >
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <Card key={service.name} className="border-[#e5ddd4] bg-white shadow-[0_14px_40px_rgba(26,26,26,0.05)]">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-[#1a1a1a]">{service.name}</h2>
                <Badge className="mt-3 rounded-full bg-[#1B3022]/10 text-[#1B3022] hover:bg-[#1B3022]/15">{service.status}</Badge>
                <p className="mt-3 text-sm leading-6 text-[#5c5652]">{service.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="border-[#e5ddd4] bg-[#faf8f6]">
          <CardContent className="p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-[#1a1a1a]">Recent incidents</h3>
            <p className="mt-2 text-sm text-[#5c5652]">Historical notes stay visible for transparency.</p>
            <div className="mt-5 space-y-3">
              {incidents.map((incident) => (
                <div key={incident.title} className="rounded-[1.25rem] border border-[#e8ded1] bg-white px-4 py-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6b6560]">{incident.date}</div>
                  <div className="mt-1 text-sm font-medium text-[#1a1a1a]">{incident.title}</div>
                  <div className="mt-1 text-xs text-[#1B3022]">{incident.status}</div>
                  <p className="mt-2 text-sm text-[#5c5652]">{incident.note}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
