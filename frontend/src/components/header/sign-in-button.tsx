"use client"

import { useSignIn } from "@clerk/nextjs"
import { OAuthStrategy } from "@clerk/types"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"

export const SignInButton = () => {
  const { signIn } = useSignIn()

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn
      ?.authenticateWithRedirect({
        strategy,
        redirectUrl: "/sign-in/sso-callback",
        redirectUrlComplete: "/a/board",
      })
      .catch((err) => {
        console.error(err, null, 2)
      })
  }

  return (
    <Button variant="ghost" onClick={() => signInWith("oauth_google")}>
      Get started <ArrowRight size={16} />
    </Button>
  )
}
