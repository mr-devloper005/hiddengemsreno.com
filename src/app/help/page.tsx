import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { mockFaqs } from '@/data/mock-data'

const topics = [
  {
    title: 'Getting started',
    description: 'Set up your account, verify your email, and publish your first post with a clean step-by-step flow.',
  },
  {
    title: 'Account & security',
    description: 'Manage passwords, sign-in sessions, and recovery options to keep your account safe and accessible.',
  },
  {
    title: 'Discovery & search',
    description: 'Use filters, categories, and search operators to find relevant content quickly without noisy results.',
  },
  {
    title: 'Publishing best practices',
    description: 'Learn recommended image sizes, writing tips, and content structure so your posts look great on any screen.',
  },
  {
    title: 'Policies & compliance',
    description: 'Understand moderation standards, legal policies, and what to do if content or account issues come up.',
  },
  {
    title: 'Billing & support',
    description: 'Find answers about plans, invoices, refunds, and how to contact support with faster resolution details.',
  },
]

export default function HelpPage() {
  return (
    <PageShell
      eyebrow="Help"
      title="Help Center"
      description="Straight answers about account setup, publishing, search, and policy questions in clear, practical language."
      actions={
        <Button asChild className="rounded-full bg-[#1B3022] text-[#faf8f6] hover:bg-[#243d2e]">
          <Link href="/contact">Contact support</Link>
        </Button>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {topics.map((topic) => (
            <Card
              key={topic.title}
              className="border-[#e5ddd4] bg-white shadow-[0_14px_40px_rgba(26,26,26,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(26,26,26,0.07)]"
            >
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold tracking-[-0.02em] text-[#1a1a1a]">{topic.title}</h2>
                <p className="mt-2 text-sm leading-7 text-[#5c5652]">{topic.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="border-[#e5ddd4] bg-[#faf8f6] ring-1 ring-[rgba(27,48,34,0.06)]">
          <CardContent className="p-6 sm:p-7">
            <h3 className="text-lg font-semibold text-[#1a1a1a]">Frequently asked questions</h3>
            <p className="mt-2 text-sm text-[#5c5652]">Tap a question to reveal the full answer.</p>
            <Accordion type="single" collapsible className="mt-5">
              {mockFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border-[#e8ded1]">
                  <AccordionTrigger className="text-left text-[#1a1a1a] hover:no-underline">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-7 text-[#5c5652]">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}
