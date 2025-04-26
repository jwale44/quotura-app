"use client"

import { useGetUserSubscription } from "@/app/a/board/plans/(hooks)"
import { quotura_plans } from "@/app/a/board/plans/data"
import { Loader2 } from "lucide-react"

export const GetSidebarActivePlan = () => {
  const { data: userSubscription, isFetching } = useGetUserSubscription()

  if (isFetching)
    return (
      <div className="flex items-center">
        <span className="block text-xs text-slate-500">Plan is loading</span>
        <Loader2 size={12} className="ml-1.5 animate-spin" />
      </div>
    )

  if (!userSubscription)
    return <span className="block text-xs text-slate-500">Free Plan</span>

  const quoturaPlan = quotura_plans.find(
    (plan) => plan.plan_code === userSubscription.plan_code
  )

  if (!quoturaPlan)
    return <span className="block text-xs text-slate-500">Free Plan</span>

  return (
    <span className="block text-xs text-slate-500">
      {quoturaPlan.name} Plan
    </span>
  )
}
