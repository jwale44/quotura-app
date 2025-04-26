import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const isProtectedRoute = createRouteMatcher(["/a(.*)"])

const onboardingPath = "/a/onboard"
const boardPath = "/a/board"

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionId, sessionClaims } = await auth()

  const pathname = req.nextUrl.pathname
  const isOn_OnboardPath = pathname === onboardingPath

  const origin = new URL("/", req.nextUrl.origin)

  if (isProtectedRoute(req)) {
    if (!userId || !sessionId) {
      return NextResponse.redirect(new URL(origin.href, req.nextUrl.origin))
    }

    const userIsOnboarded =
      (sessionClaims?.public_metadata as { isOnboarded?: boolean })
        ?.isOnboarded === true

    if (userIsOnboarded) {
      if (isOn_OnboardPath) {
        return NextResponse.redirect(new URL(boardPath, req.nextUrl.origin))
      }

      return NextResponse.next()
    } else {
      if (!isOn_OnboardPath) {
        return NextResponse.redirect(
          new URL(onboardingPath, req.nextUrl.origin)
        )
      }

      return NextResponse.next()
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
