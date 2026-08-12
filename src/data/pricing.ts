import type { PricingPlan } from '@/types/card'

export const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'month',
    description: 'Get started and explore basic English learning at no cost.',
    cta: 'Get Started',
    features: [
      'Access to basic courses',
      'Community forum access',
      'Basic progress tracking',
      'Mobile friendly',
    ],
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 19,
    period: 'month',
    description: 'For regular learners who want structured lessons and quizzes.',
    cta: 'Get Started',
    features: [
      'All free features',
      'Standard course library',
      'Quizzes & practice exercises',
      'Progress tracking',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29,
    period: 'month',
    description: 'Our most popular plan for focused learners who want it all.',
    highlighted: true,
    cta: 'Get Started',
    features: [
      'All courses included',
      'Live conversation practice',
      'Quiz & progress tracking',
      'Certificate of completion',
      'Priority support',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 59,
    period: 'month',
    description: 'Maximum support with private tutoring and career guidance.',
    cta: 'Join Now',
    features: [
      'Everything in Pro',
      'Private 1-on-1 tutoring',
      'IELTS / TOEFL prep',
      'Business English coaching',
      'Career guidance',
    ],
  },
]