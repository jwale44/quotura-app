"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DefaultWidth } from "@/components/default-width"

export const LandingHeroSection = () => {
  const scrollToSection = () => {
    const section = document.getElementById("how-it-works")
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="sm:min-h-screen pt-32 pb-28 sm:pb-0">
      <DefaultWidth className="px-6 sm:px-10">
        <div className="relative w-full">
          <div className="flex flex-col items-center justify-center py-4 max-w-[1000px] mx-auto">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold font-tenor text-center leading-normal">
              Write Smarter. Read Faster.
            </h1>

            <p className="text-sm sm:text-base text-center text-muted-foreground font-sans">
              Summarize essays or generate new ones instantly with Quotura AI.
            </p>
          </div>

          <div className="w-fit mx-auto flex flex-col items-center gap-4">
            <Image
              src="/images/landing/business-handshake-landing.png"
              alt="business handshake"
              width={250}
              height={250}
            />

            <Button
              className="mt-4 w-[220px] h-[55px] bg-lemon text-black hover:bg-lemon/85"
              onClick={scrollToSection}
            >
              <span className="font-sans">See How It Works</span>
            </Button>
          </div>
        </div>
      </DefaultWidth>
    </section>
  )
}
