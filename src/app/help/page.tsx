import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { mockFaqs } from '@/data/mock-data'

const topics = [
  {
    title: 'Getting started',
    description: 'Create your account, complete your profile, and publish your first gallery or story in minutes.',
  },
  {
    title: 'Profiles & trust',
    description: 'Add photos, hours, and social proof so visitors understand who you are before they reach out.',
  },
  {
    title: 'Discovery & search',
    description: 'Use filters, categories, and saved collections to find the right places without endless scrolling.',
  },
  {
    title: 'Publishing visuals',
    description: 'Best practices for image sizing, captions, and organizing sets so your work shines on every device.',
  },
]

export default function HelpPage() {
  return (
    <PageShell
      eyebrow="Help"
      title="Help Center"
      description="Straight answers about accounts, publishing, and discovery—written in plain language, with the same soft visual language as the rest of the site."
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
