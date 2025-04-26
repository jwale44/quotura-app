import { cn } from "@/lib/utils"

export const DefaultWidth = ({
  children,
  className,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <div className={cn("max-w-6xl mx-auto", className)}>{children}</div>
  )
}
