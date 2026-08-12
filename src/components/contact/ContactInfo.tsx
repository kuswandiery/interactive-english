import { Mail, Phone, MapPin, Clock } from 'lucide-react'

const contactInfo = {
  email: 'hello@englishacademy.example',
  phone: '+62 812-0000-0000',
  address: 'Jakarta, Indonesia',
  hours: 'Mon – Fri · 9:00–18:00',
}

interface ContactInfoProps {
  email?: string
  phone?: string
  address?: string
  hours?: string
}

export function ContactInfo({
  email = contactInfo.email,
  phone = contactInfo.phone,
  address = contactInfo.address,
  hours = contactInfo.hours,
}: ContactInfoProps) {
  const items = [
    { icon: Mail, label: 'Email', value: email },
    { icon: Phone, label: 'Phone', value: phone },
    { icon: MapPin, label: 'Address', value: address },
    { icon: Clock, label: 'Office Hours', value: hours },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="flex items-start gap-3 rounded-md border border-slate-200 bg-white p-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <item.icon className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-secondary">{item.label}</h3>
            <p className="text-sm text-muted">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}