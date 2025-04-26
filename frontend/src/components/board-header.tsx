interface BoardHeaderProps {
  title: string
}

export const BoardHeader = ({ title }: BoardHeaderProps) => {
  return (
    <div className="w-full flex items-center justify-center py-6 px-4">
      <h1 className="font-tenor text-lg font-semibold">{title}</h1>
    </div>
  )
}
