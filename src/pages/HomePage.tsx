import { HeroSection } from '@/components/home/HeroSection'
import { StatisticsSection } from '@/components/home/StatisticsSection'
import { PopularCourses } from '@/components/home/PopularCourses'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import { LearningProcess } from '@/components/home/LearningProcess'
import { FeaturedTutors } from '@/components/home/FeaturedTutors'
import { Testimonials } from '@/components/home/Testimonials'
import { PricingSection } from '@/components/home/PricingSection'
import { FaqPreview } from '@/components/home/FaqPreview'
import { FinalCta } from '@/components/home/FinalCta'

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <StatisticsSection />
      <PopularCourses />
      <WhyChooseUs />
      <LearningProcess />
      <FeaturedTutors />
      <Testimonials />
      <PricingSection />
      <FaqPreview />
      <FinalCta />
    </div>
  )
}