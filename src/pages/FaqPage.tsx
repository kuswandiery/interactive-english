import { useState } from 'react'
import { Accordion, type AccordionItemData } from '@/components/ui/Accordion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { faqs, faqCategories } from '@/data/faqs'

export default function FaqPage() {
  const [category, setCategory] = useState('')

  const filtered = category ? faqs.filter((f) => f.category === category) : faqs

  const items: AccordionItemData[] = filtered.map((faq) => ({
    value: faq.id,
    title: faq.question,
    content: faq.answer,
  }))

  return (
    <div>
      <section className="bg-secondary">
        <div className="container-page py-12 sm:py-16">
          <SectionHeader
            align="left"
            eyebrow="FAQ"
            title="Frequently asked questions"
            description="Find quick answers about courses, learning, pricing, and more."
            className="text-white [&_p:first-child]:text-primary [&_h2]:text-white [&_p]:text-slate-300"
          />
        </div>
      </section>

      <section className="container-page py-8 sm:py-12">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter FAQ by category">
          <CategoryButton active={category === ''} onClick={() => setCategory('')}>
            All
          </CategoryButton>
          {faqCategories.map((cat) => (
            <CategoryButton key={cat} active={category === cat} onClick={() => setCategory(cat)}>
              {cat}
            </CategoryButton>
          ))}
        </div>

        <Accordion items={items} className="mt-8" />
      </section>
    </div>
  )
}

function CategoryButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        active ? 'bg-primary text-white' : 'bg-white text-secondary hover:bg-slate-100'
      }`}
    >
      {children}
    </button>
  )
}