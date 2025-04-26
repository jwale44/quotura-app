"use client"

import { useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { useRouter, usePathname } from "next/navigation"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { user } = useUser()
  const router = useRouter()
  const pathname = usePathname()

  const onboardingPath = "/a/onboard"
  const boardPath = "/a/board"
  const isOnOnboardPath = pathname === onboardingPath

  useEffect(() => {
    if (isOnOnboardPath) {
      const userIsOnboarded =
        (user?.publicMetadata?.isOnboarded as boolean) === true

      if (userIsOnboarded) {
        router.push(boardPath)
      }
    }
  }, [user, router, isOnOnboardPath])

  return <>{children}</>
}
