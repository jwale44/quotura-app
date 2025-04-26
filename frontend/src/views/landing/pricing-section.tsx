'use client'

import { DefaultWidth } from "@/components/default-width"
import { LandingPricingSection as LandingPricingSectionComponent } from "@/views/components/pricing-section"

export const LandingPricingSection = () => {
  return (
    <section className="min-h-screen pt-32">
      <DefaultWidth className="px-6 sm:px-10">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl sm:text-4xl font-semibold font-tenor text-center leading-normal">
            Pricing
          </h2>

          <LandingPricingSectionComponent />
        </div>
      </DefaultWidth>
    </section>
  )
}
