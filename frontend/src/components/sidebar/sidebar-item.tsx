import { cn } from "@/lib/utils"
import { motion } from "motion/react"

interface SidebarItemProps {
  Icon: React.ElementType
  title: string
  selected: boolean
  setSelected: (selected: string) => void
  open: boolean
  notifs: number
}

export const SidebarItem = ({
  Icon,
  title,
  selected,
  setSelected,
  open,
  notifs,
}: SidebarItemProps) => {
  return (
    <motion.button
      layout
      onClick={() => setSelected(title)}
      className={cn(
        "relative flex h-10 w-full items-center rounded-md transition-colors",
        selected
          ? "bg-indigo-100 text-black"
          : "text-slate-500 hover:bg-indigo-50"
      )}
    >
      <motion.div
        layout
        className={cn(
          "flex h-full w-full items-center justify-center text-lg",
          open && "w-10"
        )}
      >
        <div className="mx-auto max-w-fit">
          <Icon size={20} />
        </div>
      </motion.div>

      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="text-xs font-medium font-sans"
        >
          {title}
        </motion.span>
      )}

      {notifs > 0 && open && (
        <motion.span
          initial={{ scale: 0, opacity: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ y: "-50%" }}
          transition={{ delay: 0.5 }}
          className="absolute right-2 top-1/2 size-4 rounded bg-indigo-500 text-white text-xs font-sans"
        >
          {notifs}
        </motion.span>
      )}
    </motion.button>
  )
}
