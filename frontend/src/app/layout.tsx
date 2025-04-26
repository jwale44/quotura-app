import type { Metadata } from "next"
import { Geist, Tenor_Sans } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { default as SubRootLayout } from "@/components/layout/root-layout"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const tenorSans = Tenor_Sans({
  variable: "--font-tenor-sans",
  subsets: ["latin"],
  weight: ["400"],
})

export const metadata: Metadata = {
  title: "Quotura",
  description: "AI Summarizer and Essay Generator",
  icons: {
    icon: "/icon.png",
    shortcut: "/shortcut-icon.png",
    apple: "/apple-icon.png",
    other: {
      rel: "apple-touch-icon",
      url: "/apple-touch-icon.png",
    },
  },
  openGraph: {
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Quotura - AI Summarizer and Essay Generator",
      },
    ],
    type: "website",
  },
  applicationName: "Quotura",
  appleWebApp: {
    title: "Quotura",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quotura",
    description: "AI Summarizer and Essay Generator",
    images: ["https://quotura.vercel.app/og-image.png"],
    creator: "@onesiukanah",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
      signInFallbackRedirectUrl={"/a/board"}
      signUpFallbackRedirectUrl={"/"}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${tenorSans.variable} antialiased`}
        >
          <SubRootLayout>
            {children}
            <div id="clerk-captcha" />
          </SubRootLayout>
        </body>
      </html>
    </ClerkProvider>
  )
}
