export interface FaqItem {
  question: string
  answer: string
}

export const faqs: FaqItem[] = [
  {
    question: 'How do I choose a course?',
    answer:
      'Start with our level assessment or browse courses by category. Each course page includes the level, tutor, curriculum, and duration to help you choose.',
  },
  {
    question: 'Can I learn from my mobile device?',
    answer:
      'Yes. English Academy is fully responsive and works on desktop, laptop, tablet, and mobile so you can learn anywhere.',
  },
  {
    question: 'Are certificates available?',
    answer:
      'Yes. You earn a certificate after completing all requirements of a course. It shows your name, course, and completion date.',
  },
  {
    question: 'Can I retake quizzes?',
    answer:
      'Absolutely. You can retake quizzes as many times as needed. A passing score of 70% is required to mark a quiz as passed.',
  },
]