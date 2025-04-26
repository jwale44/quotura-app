"use client"

import { useMemo } from "react"
import { CreditsTab } from "./credits-tab"
import { CurrentPlanTab } from "./current-plan-tab"
import { PlansPricingSection } from "./plans-pricing-section"
import { useGetUserCredits, useGetUserSubscription } from "../(hooks)"

export const TabsContainer = () => {
  const { data: creditsData, isFetching: isFetchingCredits } =
    useGetUserCredits()
  const { data: userSubscription, isFetching: isFetchingUserSubscription } =
    useGetUserSubscription()

  const credits = useMemo(
    () => creditsData?.credits || 0,
    [creditsData?.credits]
  )

  return (
    <>
      <div className="p-10 pt-0">
        <div className="mt-6 flex flex-col gap-6">
          <CurrentPlanTab
            plan={userSubscription}
            isLoading={isFetchingUserSubscription}
          />
          <CreditsTab credits={credits} isLoading={isFetchingCredits} />
        </div>

        <div className="mt-20 p-4">
          <div>
            <p className="font-sans">Change Plan</p>
            <p className="font-sans text-xs">Update your current plan</p>
          </div>

          <div className="relative flex flex-col items-center justify-center">
            <PlansPricingSection />
          </div>
        </div>
      </div>
    </>
  )
}
