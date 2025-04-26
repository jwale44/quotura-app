import { Slider } from "@/components/ui/slider"
import { SummarizeContentLength } from "../types"

interface BoardLengthSelectProps {
  length: SummarizeContentLength
  setLength: (length: SummarizeContentLength) => void
}

export const BoardLengthSelect = ({
  length,
  setLength,
}: BoardLengthSelectProps) => {
  const handleChange = (value: number[]) => {
    const sliderValue = value[0]
    const newLength = getSliderValue(sliderValue)
    setLength(newLength)
  }

  const getSliderValue = (numLength: number) => {
    switch (numLength) {
      case 0:
        return SummarizeContentLength.VERY_SHORT
      case 25:
        return SummarizeContentLength.SHORT
      case 50:
        return SummarizeContentLength.AVERAGE
      case 75:
        return SummarizeContentLength.LONG
      default:
        return SummarizeContentLength.AVERAGE
    }
  }

  const getSliderValueFromLength = (length: SummarizeContentLength) => {
    switch (length) {
      case SummarizeContentLength.VERY_SHORT:
        return 0
      case SummarizeContentLength.SHORT:
        return 25
      case SummarizeContentLength.AVERAGE:
        return 50
      case SummarizeContentLength.LONG:
        return 75
    }
  }
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between grow max-w-[450px] xl:max-w-none w-full xl:w-auto">
      <p className="whitespace-nowrap font-sans text-sm select-none font-medium">
        Summary Length:
      </p>

      <div className="sm:ml-3 w-full flex items-center justify-center gap-2.5 mt-3 sm:mt-0">
        <small className="text-xs font-sans">Short</small>
        <Slider
          defaultValue={[getSliderValueFromLength(length)]}
          value={[getSliderValueFromLength(length)]}
          max={75}
          min={0}
          step={25}
          onValueChange={handleChange}
        />
        <small className="text-xs font-sans">Long</small>
      </div>
    </div>
  )
}