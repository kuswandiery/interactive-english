import type { FaqItem } from '@/types/card'

export const faqs: FaqItem[] = [
  {
    id: 'choose',
    category: 'Courses',
    question: 'How do I choose a course?',
    answer:
      'Start with our level assessment or browse courses by category. Each course page shows the level, tutor, curriculum, and duration so you can pick the best fit for your goals.',
  },
  {
    id: 'mobile',
    category: 'Learning',
    question: 'Can I learn from my mobile device?',
    answer:
      'Yes. English Academy is fully responsive and works on desktop, laptop, tablet, and mobile, so you can study anywhere at any time.',
  },
  {
    id: 'certificates',
    category: 'Certificate',
    question: 'Are certificates available?',
    answer:
      'Yes. You earn a certificate after completing all requirements of a course. It displays your name, the course, and the completion date.',
  },
  {
    id: 'retake-quizzes',
    category: 'Learning',
    question: 'Can I retake quizzes?',
    answer:
      'Absolutely. You can retake quizzes as many times as you like. A passing score of 70% is required to mark a quiz as passed.',
  },
  {
    id: 'billing',
    category: 'Pricing',
    question: 'How does pricing work?',
    answer:
      'We offer free, basic, pro, and premium plans. You start on the Free plan and can upgrade anytime as your learning needs grow.',
  },
  {
    id: 'cancel',
    category: 'Pricing',
    question: 'Can I cancel my subscription anytime?',
    answer:
      'Yes. You can cancel or change your plan at any time directly from your settings. There are no long-term commitments.',
  },
  {
    id: 'enroll',
    category: 'Enrollment',
    question: 'How do I enroll in a course?',
    answer:
      'Open the course page and click "Enroll Now". If you are not signed in, you will be asked to log in or register first.',
  },
  {
    id: 'beginner',
    category: 'Courses',
    question: 'Is English Academy suitable for beginners?',
    answer:
      'Yes. We have dedicated programs for beginners starting from the very basics, including General English and English for Kids.',
  },
  {
    id: 'schedule',
    category: 'Enrollment',
    question: 'Can I learn at my own pace?',
    answer:
      'Yes. Most of our courses are self-paced. You can log in whenever you like and continue from where you left off.',
  },
  {
    id: 'technical-req',
    category: 'Technical',
    question: 'What are the technical requirements?',
    answer:
      'You only need a device with internet access and a modern browser. For speaking practice, a microphone and headset are recommended.',
  },
]

export const faqCategories = [
  'Courses',
  'Learning',
  'Pricing',
  'Enrollment',
  'Certificate',
  'Technical',
]