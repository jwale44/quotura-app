"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useOnboardContext, UserAccountType } from "../../onboard-context"
import { usePostOnboardData } from "../../(hooks)"
import { useToastCotext } from "@/components/toast"
import { Loader2 } from "lucide-react"

export const JoinUs = () => {
  const { userAccountType, setUserAccountType, setCurrentView } =
    useOnboardContext()
  const { setNotification } = useToastCotext()

  const { mutateAsync: onboardUser, isPending } = usePostOnboardData()

  const handleNextClick = async () => {
    if (!userAccountType) return
    if (userAccountType === "company") {
      setCurrentView("enter-company")
      return
    }

    try {
      await onboardUser({
        company_name: "Student",
      })

      setNotification({
        message: "Onboarding successful! Welcome to Quotura",
        type: "success",
      })
      window.location.href = "/a/board"
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setNotification({
        message: "Oh no! Something went wrong",
        type: "error",
      })
    }
  }

  const handleSetAccountType = (type: UserAccountType) => {
    if (isPending) return
    setUserAccountType(type)
  }

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-none sm:max-w-[400px] px-6">
        <h3 className="font-semibold text-2xl font-sans">Onboard!</h3>
        <p className="mt-1 font-extralight text-sm font-sans">
          To begin this journey, tell us what type of account you&apos;d be
          opening.
        </p>
        <div className="mt-5 sm:p-6 flex flex-col gap-6">
          <AccountTypeTab
            title="Individual"
            icon="/icons/polygon-user.svg"
            isSelected={userAccountType === "individual"}
            onClick={() => handleSetAccountType("individual")}
            description="Personal account to manage all you activities."
          />
          <AccountTypeTab
            title="Company"
            icon="/icons/polygon-company.svg"
            isSelected={userAccountType === "company"}
            onClick={() => handleSetAccountType("company")}
            description="Own or belong to a company, this is for you."
          />
        </div>

        <div className="w-full flex justify-end mt-5">
          <Button
            size="lg"
            disabled={!userAccountType || isPending}
            onClick={handleNextClick}
            className="bg-lemon text-black hover:bg-lemon/90 cursor-pointer flex items-center gap-2"
          >
            {isPending ? "Submitting..." : "Next"}
            {isPending && <Loader2 size={20} className="animate-spin" />}
          </Button>
        </div>
      </div>
    </div>
  )
}

const AccountTypeTab = ({
  title,
  icon,
  isSelected,
  onClick,
  description,
}: {
  title: string
  icon: string
  description: string
  isSelected: boolean
  onClick?: () => void
}) => {
  return (
    <div
      className={cn(
        "p-4 flex items-center gap-3 hover:bg-background-lemon border shadow rounded-sm duration-100 cursor-pointer",
        isSelected ? "border-lemon bg-background-lemon" : "border-transparent"
      )}
      onClick={onClick}
      title={description}
    >
      <Image src={icon} alt={`${title} account`} width={30} height={30} />
      <div className="font-sans flex-1 min-w-0">
        <h4>{title}</h4>
        <p className="truncate text-xs text-gray-600/70">{description}</p>
      </div>
    </div>
  )
}
