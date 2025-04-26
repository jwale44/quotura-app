"use client"

import { BoardModes } from "./board-modes"
import { SummarizeContentMode, SummarizeContentLength } from "../types"
import { BoardLengthSelect } from "./board-length-select"

interface BoardMenuProps {
  activeMode: SummarizeContentMode
  setActiveMode: (mode: SummarizeContentMode) => void
  length: SummarizeContentLength
  setLength: (length: SummarizeContentLength) => void
}

export const BoardMenu = ({
  activeMode,
  setActiveMode,
  length,
  setLength,
}: BoardMenuProps) => {
  return (
    <div className="w-full flex flex-col-reverse xl:flex-row items-start xl:items-center justify-between px-5 pt-5 xl:pt-3 border-b border-lemon gap-y-6">
      <BoardModes activeMode={activeMode} setActiveMode={setActiveMode} />
      <BoardLengthSelect length={length} setLength={setLength} />
    </div>
  )
}

