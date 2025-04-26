"use client"

import { createContext, useContext, useMemo, useState } from "react"

export type OnboardViewType = "join-us" | "enter-company"
export type UserAccountType = "individual" | "company"

interface OnboardContextProps {
  currentView: OnboardViewType
  setCurrentView: (view: OnboardViewType) => void

  userAccountType: UserAccountType | null
  setUserAccountType: (type: UserAccountType) => void
}

const OnboardContext = createContext<OnboardContextProps | undefined>(undefined)

export const OnboardContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [currentView, setCurrentView] = useState<OnboardViewType>("join-us")
  const [userAccountType, setUserAccountType] =
    useState<UserAccountType | null>(null)

  const contextValue = useMemo(
    () => ({
      currentView,
      setCurrentView,
      userAccountType,
      setUserAccountType,
    }),
    [currentView, setCurrentView, userAccountType, setUserAccountType]
  )

  return (
    <OnboardContext.Provider value={contextValue}>
      {children}
    </OnboardContext.Provider>
  )
}

export const useOnboardContext = () => {
  const context = useContext(OnboardContext)

  if (!context) {
    throw new Error("OnboardContext must be used within OnboardProvider")
  }

  return context
}
