"use client"

import { motion } from "motion/react"
import { useState } from "react"
import { TitleSection } from "./title-section"
import { SidebarItem } from "./sidebar-item"
import { Brain } from "lucide-react"
import { ToggleSideBar } from "./toggle-sidebar"
import { QuotoraLogo } from "../ui/quotora-logo"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"

export const Sidebar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const isSummarizerPath = pathname.includes("summarizer")
  // const isGenerateEssaysPath = pathname.includes("generate-essays")

  const goToSummarizer = () => {
    router.push("/a/board/summarizer")
  }

  // const goToGenerateEssays = () => {
  //   router.push("/a/board/generate-essays")
  // }

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-white p-2"
      style={{
        width: isOpen ? "225px" : "fit-content",
      }}
    >
      <div className="mb-3 border-b border-zinc-300 py-3.5 px-3">
        <Link href="/">
          <QuotoraLogo width={isOpen ? 80 : 60} height={isOpen ? 80 : 60} />
        </Link>
      </div>

      <div className="space-y-1">
        <SidebarItem
          Icon={Brain}
          title="Summarizer"
          selected={isSummarizerPath}
          setSelected={goToSummarizer}
          open={isOpen}
          notifs={0}
        />

        {/* <SidebarItem
          Icon={Zap}
          title="Generate Essays"
          selected={isGenerateEssaysPath}
          setSelected={goToGenerateEssays}
          open={isOpen}
          notifs={0}
        /> */}
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <TitleSection open={isOpen} />
        <ToggleSideBar open={isOpen} setOpen={setIsOpen} />
      </div>
    </motion.nav>
  )
}
