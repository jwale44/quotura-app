"use client"

import { cn } from "@/lib/utils"
import { wordCounter, characterCounter } from "@/utils/word-counter"

interface CounterSectionProps {
  text: string
  className?: string
  isOutput?: boolean
  children?: React.ReactNode
}

export const CounterSection = ({
  text,
  children,
  className,
}: CounterSectionProps) => {
  return (
    <div
      className={cn(
        className
          ? className
          : "relative xl:absolute bottom-0 left-0 w-full bg-white border-t border-lemon sm:h-[60px] py-2 px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-y-3"
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">
          {`${characterCounter(text)} characters. \n\n${wordCounter(
            text
          )} words`}
        </p>
      </div>

      {children}
    </div>
  )
}
