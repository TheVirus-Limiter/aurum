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
    default: "Lumora Sleep, a sleep mask that acts",
    template: "%s, Lumora Sleep",
  },
  description:
    "Everything else tracks your sleep. Lumora changes it. A sleep mask that learns your night and wakes you at a lighter moment, with a gradual sunrise built in. Launching on Kickstarter.",
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
    title: "Everything else tracks your sleep. Lumora changes it.",
    description:
      "A sleep mask that learns your night and wakes you at the right moment, not the same moment.",
    images: [
      {
        url: "/og/og-home.png",
        width: 1200,
        height: 630,
        alt: "Lumora, a sleep mask that learns your night",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Everything else tracks your sleep. Lumora changes it.",
    description:
      "A sleep mask that learns your night and wakes you at the right moment, not the same moment.",
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
        "Lumora Sleep is building a smart sleep mask that acts on your sleep instead of only reporting on it, using onboard sensing to wake you at a lighter moment with a gradual sunrise.",
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
