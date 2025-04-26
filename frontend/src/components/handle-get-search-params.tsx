"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useAuth } from "@clerk/nextjs"

export const HandleGetSearchParamsAndSignOut = () => {
  const searchParams = useSearchParams()
  const { signOut, isSignedIn } = useAuth()

  useEffect(() => {
    const hasLogoutRequest = searchParams.get("signOutRequest")
    if (isSignedIn && hasLogoutRequest === "true") {
      signOut()
    }
  }, [isSignedIn, searchParams, signOut])

  return null
}
