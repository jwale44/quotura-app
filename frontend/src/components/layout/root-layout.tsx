import { QueryClientProvider } from "@tanstack/react-query"
import { ToastProvider } from "../toast"
import { queryClient } from "@/app/query-client"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>{children}</ToastProvider>
    </QueryClientProvider>
  )
}
