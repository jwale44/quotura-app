"use client"

import { useState } from "react"
import { Board } from "./board"
import { cn } from "@/lib/utils"
import { MarkdownHooks } from "react-markdown"
import { Button } from "@/components/ui/button"
import { CounterSection } from "./counter-section"
import rehypeStarryNight from "rehype-starry-night"
import { useIsScreenXl } from "@/lib/hooks/use-media-query"

interface SummarizerOutputBoardProps {
  summary: string | null
}

export const SummarizerOutputBoard = ({
  summary,
}: SummarizerOutputBoardProps) => {
  const [copied, setCopied] = useState(false)
  const placeholder = "Your summary will appear here"

  const handleCopy = () => {
    if (!summary) return
    navigator.clipboard.writeText(summary)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  const isScreenXl = useIsScreenXl()

  return (
    <Board
      className={cn(
        "relative border-t xl:border-l border-lemon",
        summary && "pb-16"
      )}
    >
      <div
        className={cn(
          "p-6 w-full min-h-[60px] xl:h-full overflow-y-scroll font-sans text-[13px]",
          summary ? "text-gray-700" : "text-gray-400"
        )}
      >
        {summary ? <MarkdownFormatted summary={summary} /> : placeholder}
      </div>

      {summary && (
        <CounterSection
          isOutput
          text={summary}
          className={
            !isScreenXl
              ? "absolute bottom-0 left-0 w-full bg-white border-t border-lemon sm:h-[60px] py-2 px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-y-3"
              : undefined
          }
        >
          <Button
            onClick={handleCopy}
            className={cn(
              "bg-lemon text-black hover:bg-lemon/85",
              copied && "opacity-50 select-none"
            )}
          >
            {copied ? "Copied" : "Copy"}
          </Button>
        </CounterSection>
      )}
    </Board>
  )
}

const MarkdownFormatted = ({ summary }: { summary: string }) => {
  return (
    <MarkdownHooks rehypePlugins={[rehypeStarryNight]}>{summary}</MarkdownHooks>
  )
}
