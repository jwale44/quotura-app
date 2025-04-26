"use client"

import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Board } from "./board"
import { Button } from "@/components/ui/button"
import { CounterSection } from "./counter-section"

interface SummarizerInputBoardProps {
  text: string
  loading: boolean
  setText: (text: string) => void
  onSubmit: () => void
}

export const SummarizerInputBoard = ({
  text,
  setText,
  onSubmit,
  loading,
}: SummarizerInputBoardProps) => {
  return (
    <Board className="relative flex flex-col h-full">
      <div className="flex-1 overflow-hidden">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full min-h-[300px] h-full resize-none border-none outline-none p-6 overflow-y-scroll"
          placeholder="Enter your text here"
        />
      </div>

      <CounterSection text={text}>
        <Button
          onClick={onSubmit}
          className={cn(
            "bg-lemon text-black hover:bg-lemon/85",
            loading && "opacity-50 select-none"
          )}
          disabled={loading}
        >
          {loading ? "Summarizing..." : "Summarize"}
          {loading && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
        </Button>
      </CounterSection>
    </Board>
  )
}
