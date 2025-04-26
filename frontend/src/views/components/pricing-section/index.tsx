"use client"

import { useState } from "react"
import { PriceColumn } from "./price-column"
import { Toggle, ToggleOptionsType } from "./toggle"

export const LandingPricingSection = () => {
  const [selected, setSelected] = useState<ToggleOptionsType>("monthly")

  return (
    <div className="mx-auto max-w-6xl px-2 py-4 md:px-4">
      <Toggle selected={selected} setSelected={setSelected} />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-3 lg:gap-8">
        <PriceColumn
          isVerifyingPayment={false}
          onModalPaymentSuccess={() => {}}
          activeId=""
          title="Free"
          price={0}
          statement="Perfect for students and casual users exploring AI-powered summaries and writing assistance."
          items={[
            {
              children: "20 Credits",
              checked: true,
            },
            {
              children: "Intelligent Summaries",
              checked: true,
            },
            {
              children: "Essay Generation",
              checked: false,
            },
            {
              children: "Length & Format Control",
              checked: false,
            },
            {
              children: "Tone Customization",
              checked: false,
            },
            {
              children: "Priority Support",
              checked: false,
            },
          ]}
        />
        <PriceColumn
          isVerifyingPayment={false}
          onModalPaymentSuccess={() => {}}
          activeId={""}
          title="Individual"
          price={selected === "monthly" ? 8100 : 5100}
          statement="For individuals who want smarter writing, faster — unlock full-length essays, structured summaries, and custom output controls."
          highlight
          items={[
            {
              children: "250 Credits",
              checked: true,
            },
            {
              children: "Intelligent Summaries",
              checked: true,
            },
            {
              children: "Essay Generation",
              checked: true,
            },
            {
              children: "Length & Format Control",
              checked: true,
            },
            {
              children: "Tone Customization",
              checked: true,
            },
            {
              children: "Priority Support",
              checked: true,
            },
          ]}
        />
        <PriceColumn
          isVerifyingPayment={false}
          onModalPaymentSuccess={() => {}}
          activeId={""}
          title="Teams"
          price={selected === "monthly" ? 14500 : 10000}
          statement="Built for teams and institutions needing scalable, consistent writing and summarization across users."
          items={[
            {
              children: "520 Summaries",
              checked: true,
            },
            {
              children: "Essay Generation",
              checked: true,
            },
            {
              children: "Length & Format Control",
              checked: true,
            },
            {
              children: "Tone Customization",
              checked: true,
            },
            {
              children: "Priority Support",
              checked: true,
            },
            {
              children: "Support for Teams",
              checked: true,
            },
          ]}
        />
      </div>
    </div>
  )
}
