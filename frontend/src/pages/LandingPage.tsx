import { FeatureList } from '@/components/landing/FeatureList'
import { HeroSection } from '@/components/landing/HeroSection'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { SiteFooter } from '@/components/landing/SiteFooter'
import { TrustNote } from '@/components/landing/TrustNote'
import { SiteHeader } from '@/components/layout/SiteHeader'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <HeroSection />
        <HowItWorks />
        <FeatureList />
        <TrustNote />
      </main>
      <SiteFooter />
    </div>
  )
}
