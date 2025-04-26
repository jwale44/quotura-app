"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { useSignIn } from "@clerk/nextjs"
import { OAuthStrategy } from "@clerk/types"
import { useAuth, useUser } from "@clerk/nextjs"
import { motion, AnimatePresence } from "motion/react"
import { SquareX, CircleCheckBig } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

type PriceColumnProps = {
  currentPlanCode?: string
  activeId?: string
  highlight?: boolean
  title: string
  price: number
  statement: string
  items: CheckListItemType[]
  onModalPaymentSuccess: ({
    reference,
    selectedPlanCode,
  }: {
    reference: string
    selectedPlanCode: string
  }) => void
  isVerifyingPayment: boolean
}

type CheckListItemType = {
  children: string
  checked: boolean
}

const PaystackButton = dynamic(
  () =>
    import("react-paystack").then((mod) => {
      const { PaystackButton } = mod
      return PaystackButton
    }),
  { ssr: false }
)

const setConfig = ({
  userEmail,
  amount,
}: {
  userEmail: string
  amount: number
}) => {
  return {
    reference: new Date().getTime().toString(),
    email: userEmail,
    amount: amount,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
  }
}

interface PaymentResponse {
  reference: string
}

export const PriceColumn = ({
  activeId,
  currentPlanCode,
  highlight,
  title,
  price,
  statement,
  items,
  onModalPaymentSuccess,
  isVerifyingPayment,
}: PriceColumnProps) => {
  const { signIn } = useSignIn()
  const { user } = useUser()
  const { isSignedIn } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [clientReady, setClientReady] = useState(false)

  useEffect(() => {
    setClientReady(true)
  }, [])

  const email = user?.emailAddresses[0].emailAddress || ""

  const planIsAlreadyActive = activeId === currentPlanCode

  const config = setConfig({ userEmail: email, amount: price * 100 })

  const componentProps = {
    ...config,
    onSuccess: (res: PaymentResponse) =>
      onModalPaymentSuccess({
        reference: res.reference,
        selectedPlanCode: activeId || "",
      }),
    onClose: () => {},
  }

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
    <div
      style={{
        boxShadow: highlight ? "0px 6px 0px rgb(24, 24, 27)" : "",
      }}
      className={`relative w-full rounded-lg p-6 md:p-8 ${
        highlight ? "border-2 border-zinc-900 bg-white" : ""
      }`}
    >
      {highlight && (
        <span className="absolute right-4 top-0 -translate-y-1/2 rounded-full bg-lemon px-2 py-0.5 text-sm text-white font-sans">
          Most Popular
        </span>
      )}

      <p className="mb-6 text-xl font-sans font-medium">{title}</p>
      <div className="mb-6 flex items-center gap-3">
        <AnimatePresence mode="popLayout">
          <motion.span
            initial={{
              y: 24,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -24,
              opacity: 0,
            }}
            key={price}
            transition={{
              duration: 0.25,
              ease: "easeInOut",
            }}
            className="block text-4xl font-tenor font-bold"
          >
            ₦{price.toLocaleString("en")}
          </motion.span>
        </AnimatePresence>
        <motion.div layout className="font-medium text-zinc-600 font-sans">
          <span className="block">/user</span>
          <span className="block">/month</span>
        </motion.div>
      </div>

      <p className="mb-8 text-sm font-sans">{statement}</p>

      <div className="mb-8 space-y-2">
        {items.map((i) => (
          <CheckListItem key={i.children} checked={i.checked}>
            {i.children}
          </CheckListItem>
        ))}
      </div>

      {clientReady && (
        <>
          {pathname === "/" ? (
            <button
              disabled={isVerifyingPayment}
              onClick={() =>
                isSignedIn
                  ? router.push("/a/board/plans")
                  : signInWith("oauth_google")
              }
              className={`w-full rounded-lg p-3 text-base uppercase text-white transition-colors font-sans ${
                highlight ? "bg-lemon" : "bg-zinc-900 hover:bg-zinc-700"
              }`}
            >
              {planIsAlreadyActive ? "Plan is active" : "Try it now"}
            </button>
          ) : (
            <PaystackButton
              disabled={planIsAlreadyActive || isVerifyingPayment}
              {...componentProps}
              className={`w-full rounded-lg p-3 text-base uppercase text-white transition-colors font-sans ${
                highlight ? "bg-lemon" : "bg-zinc-900 hover:bg-zinc-700"
              }`}
            >
              {planIsAlreadyActive ? "Plan is active" : "Try it now"}
            </PaystackButton>
          )}
        </>
      )}
    </div>
  )
}

const CheckListItem = ({ children, checked }: CheckListItemType) => {
  return (
    <div className="flex items-center gap-2 text-lg font-sans">
      {checked ? (
        <CircleCheckBig className="text-lg text-lemon" />
      ) : (
        <SquareX className="text-xl text-zinc-400" />
      )}
      {children}
    </div>
  )
}
