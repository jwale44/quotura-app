"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToastCotext } from "@/components/toast"
import {
  useGetSubscriptionPlans,
  useGetUserSubscription,
  useVerifyPlanPaymentMutation,
} from "@/app/a/board/plans/(hooks)"
import { PriceColumn } from "@/views/components/pricing-section/price-column"
import {
  Toggle,
  ToggleOptionsType,
} from "@/views/components/pricing-section/toggle"
import { useQueryClient } from "@tanstack/react-query"

export const PlansPricingSection = () => {
  const queryClient = useQueryClient()
  const { setNotification } = useToastCotext()
  const {
    data: subscriptionPlans,
    isFetching,
    isError,
    refetch,
  } = useGetSubscriptionPlans()
  const { data: userSubscription, isFetching: isFetchingSubscription } =
    useGetUserSubscription()

  const { mutateAsync: verifyPayment, isPending: isVerifying } =
    useVerifyPlanPaymentMutation()

  useEffect(() => {
    if (isError) {
      setNotification({
        message: "Error fetching plans",
        type: "error",
      })
    }
  }, [isError, setNotification])

  const [selected, setSelected] = useState<ToggleOptionsType>("monthly")

  if (isFetching || isFetchingSubscription) {
    return (
      <div className="mx-auto flex h-[200px] min-w-[200px] w-full items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  if (!subscriptionPlans) {
    return (
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col w-fit items-center gap-2">
        <p className="font-sans">Could not fetch plans</p>
        <Button className="w-fit font-sans" onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    )
  }

  const subscriptionPlansList = subscriptionPlans.data as {
    name: string
    plan_code: string
  }[]
  const individualMonthPlan = subscriptionPlansList.find(
    (plan) => plan.name === "individual-month"
  )
  const individualYearPlan = subscriptionPlansList.find(
    (plan) => plan.name === "individual-year"
  )
  const teamsMonthPlan = subscriptionPlansList.find(
    (plan) => plan.name === "team-month"
  )
  const teamsYearPlan = subscriptionPlansList.find(
    (plan) => plan.name === "team-year"
  )

  const handleOnSuccess = async ({
    reference,
    selectedPlanCode,
  }: {
    reference: string
    selectedPlanCode: string
  }) => {
    try {
      await verifyPayment({
        plan_code: selectedPlanCode,
        reference: reference,
      })
      await queryClient.invalidateQueries({
        queryKey: ["user-subscription"],
      })
      await queryClient.invalidateQueries({
        queryKey: ["user-credits"],
      })
    } catch (error) {
      //
      console.error(error, null, 2)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-2 py-4 md:px-4">
      <Toggle selected={selected} setSelected={setSelected} />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-2 lg:gap-8 mx-auto">
        <PriceColumn
          activeId={
            selected === "monthly"
              ? individualMonthPlan?.plan_code || ""
              : selected === "annual"
              ? individualYearPlan?.plan_code || ""
              : ""
          }
          currentPlanCode={userSubscription?.plan_code}
          title="Individual"
          price={selected === "monthly" ? 8100 : 5100}
          statement="For individuals who want smarter writing, faster — unlock full-length essays, structured summaries, and custom output controls."
          highlight
          items={[
            {
              children: "250 Credits",
              checked: true,
            },
            {
              children: "Intelligent Summaries",
              checked: true,
            },
            {
              children: "Essay Generation",
              checked: true,
            },
            {
              children: "Length & Format Control",
              checked: true,
            },
            {
              children: "Tone Customization",
              checked: true,
            },
            {
              children: "Priority Support",
              checked: true,
            },
          ]}
          isVerifyingPayment={isVerifying}
          onModalPaymentSuccess={handleOnSuccess}
        />
        <PriceColumn
          activeId={
            selected === "monthly"
              ? teamsMonthPlan?.plan_code || ""
              : selected === "annual"
              ? teamsYearPlan?.plan_code || ""
              : ""
          }
          currentPlanCode={userSubscription?.plan_code}
          title="Teams"
          price={selected === "monthly" ? 14500 : 10000}
          statement="Built for teams and institutions needing scalable, consistent writing and summarization across users."
          items={[
            {
              children: "520 Summaries",
              checked: true,
            },
            {
              children: "Essay Generation",
              checked: true,
            },
            {
              children: "Length & Format Control",
              checked: true,
            },
            {
              children: "Tone Customization",
              checked: true,
            },
            {
              children: "Priority Support",
              checked: true,
            },
            {
              children: "Support for Teams",
              checked: true,
            },
          ]}
          isVerifyingPayment={isVerifying}
          onModalPaymentSuccess={handleOnSuccess}
        />
      </div>
    </div>
  )
}
