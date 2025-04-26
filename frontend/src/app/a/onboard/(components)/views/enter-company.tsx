"use client"

import { Button } from "@/components/ui/button"
import { Loader2, MoveLeft } from "lucide-react"
import { useState } from "react"
import { usePostOnboardData } from "../../(hooks)"
import { useOnboardContext } from "../../onboard-context"
import { useToastCotext } from "@/components/toast"

export const EnterCompany = () => {
  const [companyName, setCompanyName] = useState("")
  const { setCurrentView } = useOnboardContext()
  const { setNotification } = useToastCotext()

  const { mutateAsync: onboardUser, isPending } = usePostOnboardData()

  const handleNextClick = async () => {
    if (!companyName || companyName.length < 2) {
      setNotification({
        message: "Please enter a company name",
        type: "error",
      })
      return
    }

    try {
      await onboardUser({
        company_name: companyName,
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

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-none sm:max-w-[400px] px-6">
        <div>
          <Button
            variant="link"
            className="flex items-center"
            onClick={() => setCurrentView("join-us")}
          >
            <MoveLeft />
            <span>Go back</span>
          </Button>
        </div>
        <h3 className="mt-3 font-semibold text-2xl font-sans">
          Register Company Account!
        </h3>
        <p className="mt-1 font-extralight text-sm font-sans">
          For the purpose of industry regulation, your details are required.
        </p>

        <form className="mt-5">
          <InputField
            id="company_name"
            label="Company Name"
            text={companyName}
            setText={setCompanyName}
            disabled={isPending}
          />

          <div className="w-full flex justify-end mt-5">
            <Button
              size="lg"
              disabled={isPending}
              onClick={handleNextClick}
              className="bg-lemon text-black hover:bg-lemon/90 cursor-pointer flex items-center gap-2"
            >
              {isPending ? "Submitting..." : "Submit"}
              {isPending && <Loader2 size={20} className="animate-spin" />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

const InputField = ({
  id,
  label,
  text,
  setText,
  disabled,
}: {
  id: string
  label: string
  text: string
  setText: (text: string) => void
  disabled?: boolean
}) => {
  return (
    <div className="font-sans">
      <label htmlFor={id}>{label}</label>
      <div className="border border-lemon shadow rounded-sm duration-100 mt-2">
        <input
          id={id}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter company name*"
          className="w-full py-3 px-6 placeholder:text-xs text-sm"
          required
          disabled={disabled}
        />
      </div>
    </div>
  )
}
