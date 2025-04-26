"use client"

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { SignInButton } from "./sign-in-button"
import { DefaultWidth } from "../default-width"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { QuotoraLogo } from "../ui/quotora-logo"

export const Header = () => {
  const router = useRouter()

  return (
    <header className="fixed top-0 z-50 bg-white/25 shadow-xs w-full backdrop-blur">
      <DefaultWidth>
        <div className="flex justify-between items-center py-6 px-4 gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <QuotoraLogo width={120} height={120} />
            </Link>
          </div>

          <div>
            <SignedOut>
              <SignInButton />
            </SignedOut>

            <SignedIn>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push("/a/board")}
                >
                  <span className="text-xs font-sans">Go to Board</span>
                </Button>

                <UserButton />
              </div>
            </SignedIn>
          </div>
        </div>
      </DefaultWidth>
    </header>
  )
}
