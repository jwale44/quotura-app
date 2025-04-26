import Image from "next/image"

interface QuotoraLogoProps {
  width?: number
  height?: number
  alt?: string
}

export const QuotoraLogo = ({
  width = 200,
  height = 200,
  alt = "Quotora Logo",
}: QuotoraLogoProps) => {
  return (
    <Image
      src={"/images/quotura-logo.png"}
      alt={alt}
      width={width}
      height={height}
    />
  )
}
