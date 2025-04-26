import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import { ArrowRightToLine } from "lucide-react"

export const ToggleSideBar = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (open: boolean) => void
}) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen(!open)}
      className="w-full relative border-t border-slate-300 transition-colors hover:bg-slate-100"
    >
      <div className="w-full flex items-center py-4 px-5">
        <motion.div
          layout
          className={cn(
            "flex items-center text-lg",
            !open && "w-full justify-center"
          )}
        >
          <ArrowRightToLine
            className={`${open && "rotate-180"} text-zinc-500`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="ml-2 text-xs font-normal font-sans"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  )
}
