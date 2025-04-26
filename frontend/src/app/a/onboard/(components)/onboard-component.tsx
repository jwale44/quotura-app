"use client"

import { useMemo } from "react"
import { JoinUs } from "./views/join-us"
import { Button } from "@/components/ui/button"
import { EnterCompany } from "./views/enter-company"
import { QuotoraLogo } from "@/components/ui/quotora-logo"
import { OnboardViewType, useOnboardContext } from "../onboard-context"
import { useIsScreenLg } from "@/lib/hooks/use-media-query"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

const OnboardViewsMap: Record<OnboardViewType, React.ElementType> = {
  "join-us": JoinUs,
  "enter-company": EnterCompany,
}

export const OnboardViewComponent = () => {
  const { currentView } = useOnboardContext()

  const ViewComponent = useMemo(
    () => OnboardViewsMap[currentView],
    [currentView]
  )

  const router = useRouter()
  const isScreenLg = useIsScreenLg()

  return (
    <div className="h-full w-full flex flex-col lg:flex-row">
      <div className="relative w-1/2 h-full bg-[url(/images/onboard/writing-background.jpg)] bg-no-repeat bg-cover bg-center hidden lg:flex">
        {/* Overlay */}
        <div className="absolute w-full h-full bg-lemon/80 z-10"></div>

        <div className="h-full w-full relative z-20 p-6">
          <QuotoraLogo width={180} height={180} />

          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-fit">
            <p className="font-sans text-sm font-light">
              Quotura completely changed the way I handle communication. As
              someone constantly juggling creative projects, I used to dread
              writing summaries and structured emails. But this platform?
              It&apos;s like having a brilliant assistant who just gets me.
              It&apos;s fast, intuitive, and surprisingly human. I honestly
              can&apos;t imagine working without it now.
            </p>
            <div className="mt-3">
              <small className="font-sans italic text-xs font-medium">
                — Andrew Garfield, Actor & Creative Collaborator
              </small>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full h-full lg:w-1/2 p-6">
        <div
          className={cn(
            "flex items-center",
            isScreenLg ? "justify-between" : "justify-end"
          )}
        >
          {isScreenLg && <QuotoraLogo width={180} height={180} />}

          <Button
            size="sm"
            onClick={() => router.push("/?signOutRequest=true")}
            variant="ghost"
          >
            Sign out
          </Button>
        </div>
        <ViewComponent />
      </div>
    </div>
  )
}
