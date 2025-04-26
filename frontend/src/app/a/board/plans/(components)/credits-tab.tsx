"use client"

import { Loader2, Star } from "lucide-react"

interface CreditsTabProps {
  credits: number
  isLoading: boolean
}

export const CreditsTab = ({ credits, isLoading }: CreditsTabProps) => {
  return (
    <div className="w-full p-6 shadow rounded-lg border border-gray-100 bg-background-lemon">
      <div className="flex items-center justify-between">
        <h4 className="font-sans text-xl font-semibold">Credits</h4>
      </div>

      <div className="mt-0.5">
        <div>
          <p className="text-sm flex items-center font-sans">
            {`Remaining Credits:`}
            {isLoading ? (
              <Loader2 size={25} className="ml-3 animate-spin" />
            ) : (
              <>
                <span className="ml-1 font-semibold">{credits}</span>
                <Star className="ml-1 text-amber-400" size={15} />
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
