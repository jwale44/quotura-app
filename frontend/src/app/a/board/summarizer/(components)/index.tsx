"use client"

import { useState } from "react"
import { BoardMenu } from "./board-menu"
import { useToastCotext } from "../../../../../components/toast"
import { SummarizeContentLength, SummarizeContentMode } from "../types"
import { wordCounter } from "@/utils/word-counter"
import { SummarizerInputBoard } from "./input-board"
import { SummarizerOutputBoard } from "./output-board"
import { usePostSummarizeContent } from "../(hooks)"
import { AxiosError } from "axios"
import { useQueryClient } from "@tanstack/react-query"

export const SummarizerBoard = () => {
  const queryClient = useQueryClient()
  const [activeMode, setActiveMode] = useState<SummarizeContentMode>(
    SummarizeContentMode.PARAGRAPH
  )
  const [text, setText] = useState("")
  const [length, setLength] = useState<SummarizeContentLength>(
    SummarizeContentLength.SHORT
  )
  const { mutateAsync: summarizeContent, isPending } = usePostSummarizeContent()

  const [summary, setSummary] = useState<string | null>(null)
  const { setNotification } = useToastCotext()

  const handleSubmit = async () => {
    try {
      if (wordCounter(text) < 50) {
        setNotification({
          message: "Enter a longer message",
          type: "error",
        })
        return
      }

      const content = text.trim().replace(/\n/g, "\\n")

      const response = await summarizeContent({
        length,
        body: content,
        mode: activeMode,
      })
      setSummary(response.summary)
      await queryClient.invalidateQueries({ queryKey: ["user-credits"] })
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 403) {
          setNotification({
            message: "You have exceeded your usage limit",
            type: "error",
          })
          return
        }
      }
      setNotification({
        message: "Error summarizing content",
        type: "error",
      })
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="w-full bg-white rounded-lg shadow-sm border border-lemon overflow-hidden">
        <BoardMenu
          activeMode={activeMode}
          setActiveMode={setActiveMode}
          length={length}
          setLength={setLength}
        />
        <div className="xl:h-[400px] w-full flex flex-col xl:flex-row justify-between">
          <SummarizerInputBoard
            text={text}
            setText={setText}
            onSubmit={handleSubmit}
            loading={isPending}
          />

          <SummarizerOutputBoard summary={summary} />
        </div>
      </div>
    </div>
  )
}
