import type { PricingPlan } from '@/types/card'

export const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    plan: 'Starter',
    price: 0,
    billing: 'month',
    features: [
      'Access to basic courses',
      'Community forum access',
      'Progress tracking',
      'Mobile friendly',
    ],
  },
  {
    id: 'pro',
    plan: 'Pro',
    price: 29,
    billing: 'month',
    popular: true,
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
    plan: 'Premium',
    price: 59,
    billing: 'month',
    features: [
      'Everything in Pro',
      'Private 1-on-1 tutoring',
      'IELTS / TOEFL prep',
      'Business English coaching',
      'Career guidance',
    ],
  },
]