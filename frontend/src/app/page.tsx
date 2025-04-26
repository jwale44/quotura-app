import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { LandingHeroSection } from "@/views/landing/hero-section"
import { LandingPricingSection } from "@/views/landing/pricing-section"
import { LandingHowItWorksSection } from "@/views/landing/how-it-works-section"
import { Suspense } from "react"
import { HandleGetSearchParamsAndSignOut } from "@/components/handle-get-search-params"

export default function Home() {
  return (
    <>
      <Suspense>
        <HandleGetSearchParamsAndSignOut />
      </Suspense>
      <div className="relative">
        <Header />

        <div>
          <LandingHeroSection />
          <LandingHowItWorksSection />
          <LandingPricingSection />
          <Footer />
        </div>
      </div>
    </>
  )
}
