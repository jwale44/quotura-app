import { SummarizeContentMode } from "../types";

export const BoardModes = ({
  activeMode,
  setActiveMode,
}: {
  activeMode: SummarizeContentMode
  setActiveMode: (mode: SummarizeContentMode) => void
}) => {
  const modes: { id: number; label: string; mode: SummarizeContentMode }[] = [
    {
      id: 1,
      label: "Paragraph",
      mode: SummarizeContentMode.PARAGRAPH,
    },
    {
      id: 2,
      label: "Bullet Points",
      mode: SummarizeContentMode.BULLET_POINTS,
    },
  ]

  return (
    <div className="w-full sm:w-auto flex flex-col sm:flex-row items-start sm:items-center grow">
      <p className="font-sans text-sm select-none font-medium">Modes:</p>

      <div className="ml-0 sm:ml-5 flex items-center gap-2 w-full sm:w-auto">
        {modes.map((mode) => (
          <ModeButton
            key={mode.id}
            mode={mode.mode}
            label={mode.label}
            onClick={setActiveMode}
            isSelected={mode.mode === activeMode}
          />
        ))}
      </div>
    </div>
  )
}

const ModeButton = ({
  mode,
  label,
  onClick,
  isSelected,
}: {
  mode: SummarizeContentMode
  label: string
  onClick: (text: SummarizeContentMode) => void
  isSelected: boolean
}) => {
  const handleClick = () => {
    onClick(mode)
  }

  return (
    <button
      onClick={handleClick}
      className={`w-1/2 sm:w-auto py-3 px-2 cursor-pointer border-b font-sans text-sm ${
        isSelected ? "border-emerald-500" : "border-transparent"
      }`}
    >
      <p>{label}</p>
    </button>
  )
}
