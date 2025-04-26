import { cn } from "@/lib/utils"

interface BoardProps {
  className?: string
  children: React.ReactNode
}

export const Board = ({ children, className }: BoardProps) => {
  return (
    <div className={cn("w-full xl:w-1/2 bg-white", className)}>{children}</div>
  )
}
