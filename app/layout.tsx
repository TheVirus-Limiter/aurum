import type React from "react"
import type { Metadata, Viewport } from "next"
import { Fraunces, Inter } from "next/font/google"
import "./globals.css"
import SmoothScroll from "@/components/site/smooth-scroll"
import Grain from "@/components/site/grain"

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
})

const SITE_URL = "https://uselumora.co"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Lumora Sleep, the sleep mask that acts",
    template: "%s, Lumora Sleep",
  },
  description:
    "Everything else tracks your sleep. Lumora is meant to act on it. A sleep mask designed to wake you in your lightest sleep, inside a window you choose.",
  applicationName: "Lumora Sleep",
  keywords: [
    "Lumora",
    "Lumora Sleep",
    "smart sleep mask",
    "sunrise alarm mask",
    "smart alarm sleep mask",
    "wake light mask",
    "sleep mask alternative to sleep tracker",
    "sleep wellness",
  ],
  authors: [{ name: "Lumora Sleep" }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Lumora Sleep",
    title: "Everything else tracks your sleep. Lumora is meant to act on it.",
    description:
      "A sleep mask designed to wake you in your lightest sleep, inside a window you choose.",
    images: [
      {
        url: "/og/og-home.png",
        width: 1200,
        height: 630,
        alt: "Lumora, the sleep mask that acts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Everything else tracks your sleep. Lumora is meant to act on it.",
    description:
      "A sleep mask designed to wake you in your lightest sleep, inside a window you choose.",
    images: ["/og/og-home.png"],
  },
  icons: {
    icon: [{ url: "/images/lumora-logo.png", type: "image/png" }],
    apple: "/images/lumora-logo.png",
    shortcut: "/images/lumora-logo.png",
  },
  generator: "Next.js",
}

export const viewport: Viewport = {
  themeColor: "#08070c",
  colorScheme: "dark",
}

const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://uselumora.co/#organization",
      name: "Lumora Sleep",
      url: "https://uselumora.co",
      logo: "https://uselumora.co/images/lumora-logo.png",
      email: "hello@uselumora.co",
      description:
        "Lumora Sleep is developing a sleep mask designed to use motion and temperature sensing to wake the wearer during lighter sleep within a chosen window. The product is a prototype in development and is not for sale.",
      sameAs: [
        "https://www.instagram.com/lumorasleep",
        "https://www.linkedin.com/company/lumorasleep",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://uselumora.co/#website",
      url: "https://uselumora.co",
      name: "Lumora Sleep",
      publisher: { "@id": "https://uselumora.co/#organization" },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-base text-ink font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Grain />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
