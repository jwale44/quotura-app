"use client"

import moment from "moment"
import { quotura_plans } from "../data"
import { ISubscription } from "../types"

interface CurrentPlanTabProps {
  plan?: ISubscription | null
  isLoading: boolean
}

export const CurrentPlanTab = ({ plan }: CurrentPlanTabProps) => {
  if (!plan)
    return <PlanTab planName="Free" amount={0} interval="No interval" />

  const quoturaPlan = quotura_plans.find((p) => p.plan_code === plan.plan_code)

  if (!quoturaPlan)
    return <PlanTab planName="Free" amount={0} interval="No interval" />

  return (
    <PlanTab
      planName={quoturaPlan.name}
      amount={quoturaPlan.amount}
      interval={quoturaPlan.interval}
      expiresAt={plan.expires_at}
    />
  )
}

const PlanTab = ({
  planName,
  amount,
  interval,
  expiresAt,
}: {
  planName: string
  amount: number
  interval: string
  expiresAt?: string
}) => {
  return (
    <div className="w-full p-6 shadow rounded-lg border border-gray-100 bg-background-lemon">
      <div className="flex items-center justify-between">
        <h4 className="font-sans text-xl font-semibold">Your Plan</h4>
      </div>

      <div className="mt-3.5 flex items-end justify-between">
        <div>
          <div className="w-fit px-5 py-1.5 rounded-full bg-lemon shadow-sm">
            <p className="font-tenor text-black text-sm">{planName}</p>
          </div>
          <div className="mt-0 p-3 pb-0 flex items-center">
            <p className="text-4xl font-tenor font-semibold">
              ₦{`${amount.toLocaleString("en")}`}
            </p>
            <sub className="ml-0 mt-1 text-sm font-sans text-gray-500">{`/${interval}`}</sub>
          </div>
        </div>

        {expiresAt && <p>Expires: {moment(expiresAt).format("MMM Do, YYYY")}</p>}
      </div>
    </div>
  )
}
