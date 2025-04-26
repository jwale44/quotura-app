"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import { useUser } from "@clerk/nextjs"
import { ChevronDown, CircleUser } from "lucide-react"
import { useRouter } from "next/navigation"
import { GetSidebarActivePlan } from "./get-active-plan"

export const TitleSection = ({ open }: { open: boolean }) => {
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(true)

  const { user } = useUser()

  const firstName = user?.firstName

  return (
    <div className="border-b border-slate-300 pb-3 px-3 ">
      <motion.div className="w-full flex cursor-pointer items-center justify-between rounded-md transition-colors">
        <div className="w-full flex flex-col items-start gap-2 overflow-hidden font-sans">
          <div
            className="w-full flex items-center justify-between"
            onClick={() => setCollapsed(!collapsed)}
          >
            <div className="w-full flex items-center gap-2">
              <div
                className={cn(
                  open ? "w-fit" : "w-full flex items-center justify-center"
                )}
              >
                {user?.imageUrl ? (
                  <Image
                    src={user?.imageUrl}
                    alt="QuoturaLogo"
                    width={35}
                    height={35}
                    className="rounded-full"
                  />
                ) : (
                  <CircleUser size={30} />
                )}
              </div>
              {open && (
                <div>
                  <h6 className="block text-sm font-semibold">
                    {`${firstName}'s Project`}
                  </h6>
                  <GetSidebarActivePlan />
                </div>
              )}
            </div>
            {open && <ChevronDown size={24} />}
          </div>

          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={
                collapsed
                  ? { opacity: 0, height: 0 }
                  : { opacity: 1, height: "auto" }
              }
              transition={{ delay: 0.125, duration: 0.25 }}
              className="w-full"
            >
              <div className="w-full flex flex-col items-start gap-0 pt-2">
                <TitleSectionButton
                  title="Plans & Pricing"
                  onClick={() => router.push("/a/board/plans")}
                />
                <TitleSectionButton
                  title="Logout"
                  textColor="text-red-500"
                  onClick={() => {
                    router.push("/?signOutRequest=true")
                  }}
                />
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

interface TitleSectionButtonProps {
  title: string
  textColor?: string
  onClick: () => void
}

const TitleSectionButton = ({
  title,
  textColor,
  onClick,
}: TitleSectionButtonProps) => {
  return (
    <button
      className="w-full text-xs text-slate-500 hover:text-slate-700 py-2 px-2 hover:bg-background-lemon rounded-md text-left"
      onClick={onClick}
    >
      <span className={cn("font-sans", textColor)}>{title}</span>
    </button>
  )
}
