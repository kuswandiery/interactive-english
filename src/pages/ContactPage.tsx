import { useState } from 'react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ContactInfo } from '@/components/contact/ContactInfo'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useToast } from '@/components/ui/Toast'

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

const initialForm: ContactForm = { name: '', email: '', subject: '', message: '' }

function validate(form: ContactForm) {
  const errors: Partial<Record<keyof ContactForm, string>> = {}
  if (!form.name.trim()) errors.name = 'Name is required'
  if (!form.email.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email address'
  if (!form.subject) errors.subject = 'Subject is required'
  if (!form.message.trim()) errors.message = 'Message is required'
  return errors
}

export default function ContactPage() {
  const toast = useToast()
  const [form, setForm] = useState<ContactForm>(initialForm)
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({})
  const [sending, setSending] = useState(false)

  const setField = <K extends keyof ContactForm>(field: K, value: ContactForm[K]) => {
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((e) => ({ ...e, [field]: undefined }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validate(form)
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setSending(true)
    window.setTimeout(() => {
      setSending(false)
      setForm(initialForm)
      toast.success(
        'Your message has been sent successfully.',
        'We will get back to you soon.',
      )
    }, 600)
  }

  return (
    <div>
      <section className="bg-secondary">
        <div className="container-page py-12 sm:py-16">
          <SectionHeader
            align="left"
            eyebrow="Contact"
            title="Get in touch with us"
            description="Have a question or need help choosing the right course? Send us a message and our team will reply."
            className="text-white [&_p:first-child]:text-primary [&_h2]:text-white [&_p]:text-slate-300"
          />
        </div>
      </section>

      <section className="container-page py-8 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          <Card className="p-6 sm:p-8">
            <h2 className="font-heading text-xl font-bold text-secondary">Send us a message</h2>
            <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Name"
                  required
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => setField('name', e.target.value)}
                  error={errors.name}
                />
                <Input
                  label="Email"
                  required
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setField('email', e.target.value)}
                  error={errors.email}
                />
              </div>
              <Select
                label="Subject"
                required
                value={form.subject}
                options={[
                  { label: 'General Inquiry', value: 'General Inquiry' },
                  { label: 'Courses & Enrollment', value: 'Courses & Enrollment' },
                  { label: 'Pricing', value: 'Pricing' },
                  { label: 'Technical Support', value: 'Technical Support' },
                  { label: 'Partnership', value: 'Partnership' },
                ]}
                placeholder="Select a subject"
                onChange={(e) => setField('subject', e.target.value)}
                error={errors.subject}
              />
              <Textarea
                label="Message"
                required
                rows={5}
                placeholder="How can we help you?"
                value={form.message}
                onChange={(e) => setField('message', e.target.value)}
                error={errors.message}
              />
              <Button type="submit" size="lg" loading={sending} className="w-full sm:w-auto">
                Send Message
              </Button>
            </form>
          </Card>

          <div className="space-y-6">
            <div>
              <h2 className="font-heading text-xl font-bold text-secondary">Contact information</h2>
              <div className="mt-4">
                <ContactInfo />
              </div>
            </div>

            <Card className="p-6">
              <h2 className="font-heading text-lg font-semibold text-secondary">
                Need help instantly?
              </h2>
              <p className="mt-2 text-sm text-muted">
                Many common questions are answered in our FAQ section, organized by topic.
              </p>
              <a href="/faq">
                <Button variant="outline" className="mt-4 w-full">
                  Visit FAQ
                </Button>
              </a>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}