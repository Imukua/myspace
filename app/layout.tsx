import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/context/theme-context"

export const metadata: Metadata = {
  title: "Ian Mukua",
  description: "A terminal-inspired personal portfolio website",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-mono bg-black text-white"> <ThemeProvider>{children}</ThemeProvider></body>
    </html>
  )
}
