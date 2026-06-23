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
    default: "Lumora Sleep, Redefine Rest",
    template: "%s, Lumora Sleep",
  },
  description:
    "Lumora Sleep makes an all in one luxury sleep mask that brings gentle light, immersive sound, and active temperature control into a single wearable. Join the pre launch waitlist.",
  applicationName: "Lumora Sleep",
  keywords: [
    "Lumora",
    "Lumora Sleep",
    "luxury sleep mask",
    "smart sleep mask",
    "sleep mask with sound",
    "temperature sleep mask",
    "wake light mask",
    "sleep wellness",
  ],
  authors: [{ name: "Lumora Sleep" }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Lumora Sleep",
    title: "Lumora Sleep, Redefine Rest",
    description:
      "An all in one luxury sleep mask. Light, sound, and temperature in a single wearable.",
    images: [
      {
        url: "/images/products/lumorahero.png",
        width: 1200,
        height: 630,
        alt: "Lumora Essence sleep mask",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumora Sleep, Redefine Rest",
    description:
      "An all in one luxury sleep mask. Light, sound, and temperature in a single wearable.",
    images: ["/images/products/lumorahero.png"],
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
        "Lumora Sleep is a luxury sleep-tech brand building an all-in-one smart sleep mask that combines light, sound, and temperature control.",
      sameAs: ["https://www.instagram.com/lumorasleep"],
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
