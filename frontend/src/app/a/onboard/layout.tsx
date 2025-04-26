import { OnboardContextProvider } from "./onboard-context"

export default function OnboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <OnboardContextProvider>{children}</OnboardContextProvider>
}
