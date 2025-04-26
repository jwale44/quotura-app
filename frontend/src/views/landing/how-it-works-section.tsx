import { DefaultWidth } from "@/components/default-width"
import { CirclePlay } from "lucide-react"
import Image from "next/image"

export const LandingHowItWorksSection = () => {
  return (
    <section id="how-it-works" className="pt-16 sm:pt-32 bg-background-lemon pb-20">
      <DefaultWidth className="px-6 sm:px-10">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl sm:text-4xl font-semibold font-tenor text-center leading-normal">
            How It Works
          </h2>

          <div className="relative mt-6 group/how_it_works">
            <Image
              src="/images/landing/how-it-works.png"
              alt="How It Works"
              width={800}
              height={800}
              className="rounded-3xl border-2 group-hover/how_it_works:border border-border shadow-lg group-hover/how_it_works:shadow-sm scale-90  group-hover/how_it_works:scale-95 transition-all duration-300"
            />

            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <button className="cursor-pointer w-fit bg-background-lemon rounded-full p-2">
                <CirclePlay size={50} className="text-black" />
              </button>
            </div>
          </div>
        </div>
      </DefaultWidth>
    </section>
  )
}
