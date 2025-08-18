import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Aurum Sleep - Redefine Rest",
  description: "The world's first luxury sleep mask that harmonizes temperature, sound, and light.",
  generator: "v0.app", icons: {
    icon: [
      { url: "https://thevirus-limiter.github.io/filestorage/aurumsleep.png", type: "image/png", sizes: "32x32" },
      { url: "https://thevirus-limiter.github.io/filestorage/aurumsleep.png", type: "image/png", sizes: "16x16" },
    ],
    apple: "https://thevirus-limiter.github.io/filestorage/aurumsleep.png",
    shortcut: "https://thevirus-limiter.github.io/filestorage/aurumsleep.png",
  },
}



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="dark">{children}</body>
    </html>
  )
}
