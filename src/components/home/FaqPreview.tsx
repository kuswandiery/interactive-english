import { Accordion } from '@/components/ui/Accordion'
import { faqs } from '@/data/faqs'
import type { FaqItem } from '@/data/faqs'

export function FaqPreview() {
  const items: { value: string; title: string; content: React.ReactNode }[] = faqs.map(
    (faq: FaqItem) => ({
      value: faq.question.split(' ')[0].toLowerCase(),
      title: faq.question,
      content: faq.answer,
    }),
  )

  return (
    <section className="bg-surface">
      <div className="container-page max-w-3xl py-16">
        <div className="text-center">
          <p className="text-sm font-medium text-primary">FAQ</p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-secondary">
            Frequently asked questions
          </h2>
        </div>

        <Accordion items={items} className="mt-10" />
      </div>
    </section>
  )
}