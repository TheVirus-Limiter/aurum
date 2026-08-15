/**
 * Single source of truth for Lumora site copy and data.
 * House style: no em dashes, no en dashes. Use periods and commas.
 *
 * Positioning: every sleep product on the market tells you how badly you slept.
 * Lumora does something about it. The intelligence is the product, not an upsell.
 *
 * Claims discipline: general wellness language only. No diagnosing, treating,
 * sleep disorders, apnea, or clinical accuracy claims. Future tense for the
 * adaptive wake, because it ships at launch and is not shipping today.
 */

export const SITE = {
  name: "Lumora Sleep",
  tagline: "Everything else tracks your sleep. Lumora changes it.",
  url: "https://uselumora.co",
  email: "hello@uselumora.co",
  instagram: "https://www.instagram.com/lumorasleep?igsh=MWpwcHQxYXE5Z2hnYg==",
  instagramHandle: "@lumorasleep",
  linkedin: "https://www.linkedin.com/company/lumorasleep",

  // Waitlist delivery. Static-site friendly (no backend required).
  //  - "web3forms": free, 250 submissions/month. Paste a public access key
  //    from https://web3forms.com (takes 30 seconds, the key is safe to commit).
  //  - "sheets": store signups in a Google Sheet you own. Paste the deployed
  //    Google Apps Script web-app URL into sheetsEndpoint.
  //  - "formspree": the original (50/month). Used automatically as a fallback
  //    if web3forms is selected but no key is set yet.
  waitlist: {
    provider: "sheets" as "web3forms" | "sheets" | "formspree",
    web3formsKey: "",
    // Paste your deployed Google Apps Script web-app URL here (ends in /exec).
    // Until then, submissions fall back to Formspree so the form keeps working.
    sheetsEndpoint:
      "https://script.google.com/macros/s/AKfycbyIjS8WtfIrkECjTKRjlNBMPtG14v2o1VG3bySLjaSdYHwZup1RTuIIYWbilgrU7hP4/exec",
    formspreeEndpoint: "https://formspree.io/f/xdkogkpv",
  },
  // Social proof counter. Intentionally not displayed until the number is
  // meaningful. Flip showWaitlistCount to true once it is worth showing.
  waitlistCount: 30,
  showWaitlistCount: false,

  // Launch plan. Kickstarter first, retail after.
  kickstarterPrice: "$129",
  kickstarterRange: "$129 to $149",
  retailRange: "$179 to $199",

  tractionStudyUrl: "/downloads/LumoraCustomerDiscovery.pdf",
  heroImage: "/images/products/lumorahero.png",
} as const

export type IconKey =
  | "moon"
  | "thermometer"
  | "waves"
  | "sun"
  | "gem"
  | "volume"
  | "sparkles"
  | "shield"
  | "battery"
  | "sensor"

export type Product = {
  key: "lumora"
  name: string
  tag: string
  tagline: string
  price: string
  priceNote: string
  icon: IconKey
  description: string
  features: string[]
  image: string
  model?: string
  flagship?: boolean
}

/** One product. The intelligence is the headline, not a tier. */
export const products: Product[] = [
  {
    key: "lumora",
    name: "Lumora",
    tag: "The sleep mask that acts",
    tagline: "It learns your night and wakes you at the right moment.",
    price: SITE.kickstarterPrice,
    priceNote: `Kickstarter pricing, from ${SITE.kickstarterPrice}. Retail ${SITE.retailRange} after launch.`,
    icon: "moon",
    description:
      "A blackout mask with a small sensor pod inside it. Through the night it reads movement and temperature to understand where you are in your sleep, then wakes you at a lighter moment inside the window you choose, with a gradual warm sunrise instead of an alarm.",
    features: [
      "Reads movement and temperature through the night",
      "Wakes you at a lighter moment in your window",
      "Gradual warm sunrise built into the mask",
      "Passive cooling insert that resists overheating",
      "Washable fabric, removable pod",
    ],
    image: "/images/products/lumoraessence.png",
    model: "/models/LumoraEssence.glb",
  },
]

export const problems: { title: string; icon: IconKey; body: string }[] = [
  {
    title: "Your alarm does not care",
    icon: "sun",
    body: "It fires at 7:00 whether you are drifting near the surface or buried in your deepest sleep. Wake from the wrong place and the fog can follow you for hours.",
  },
  {
    title: "Trackers only report",
    icon: "sensor",
    body: "A ring or a watch hands you a score in the morning and leaves the rest to you. Knowing you slept badly does not change the night you already had.",
  },
  {
    title: "Overheating and a restless mind",
    icon: "thermometer",
    body: "Heat builds against your skin and small sounds keep the mind alert. The night feels longer, lighter, and far less restorative than it should.",
  },
]

/** How it works. This replaces the old three-pillar feature list. */
export const pillars: {
  index: string
  title: string
  tagline: string
  body: string
  icon: IconKey
}[] = [
  {
    index: "01",
    title: "It listens",
    tagline: "A sensor, not a survey.",
    icon: "sensor",
    body: "A small sensor in the mask reads movement and temperature through the night to understand where you are in your sleep.",
  },
  {
    index: "02",
    title: "It waits",
    tagline: "The right moment, not the same moment.",
    icon: "waves",
    body: "Instead of firing at a fixed time, it finds a lighter moment inside the window you set.",
  },
  {
    index: "03",
    title: "It wakes you there",
    tagline: "You surface instead of getting yanked out.",
    icon: "sun",
    body: "A gradual warm sunrise builds inside the mask, so you come up out of sleep rather than getting pulled out of it.",
  },
]

/** The architecture. Simple mask, smart removable pod. */
export const architecture: { title: string; body: string; icon: IconKey }[] = [
  {
    title: "The mask stays simple",
    body: "Washable fabric, a passive cooling insert, and a pocket. Nothing precious, nothing you have to baby.",
    icon: "moon",
  },
  {
    title: "The pod holds the intelligence",
    body: "All of the sensing lives in a small removable pod. Take it out before you wash the mask, and upgrade it later without replacing anything else.",
    icon: "sensor",
  },
]

/** Stops for the scroll-driven 3D tour. */
export const essenceCallouts: { label: string; text: string }[] = [
  { label: "Lumora", text: "A blackout mask with a sensor pod inside it. Turn it. Look closer." },
  { label: "It listens", text: "A small sensor reads movement and temperature to follow where you are in the night." },
  { label: "It waits", text: "No fixed alarm time. It looks for a lighter moment inside the window you set." },
  { label: "Sunrise wake", text: "A gradual warm light builds inside the mask, so you surface instead of being yanked out." },
  { label: "Removable pod", text: "The intelligence lifts out. The mask goes in the wash, and the pod upgrades later." },
]

export const stats: { value: string; label: string; detail: string }[] = [
  {
    value: "83%",
    label: "reported sleep difficulty",
    detail: "Across our interviews, the clear majority described sleep as a real and recurring problem.",
  },
  {
    value: "6 / 10",
    label: "average sleep score",
    detail: "People were not describing ideal rest. They were describing acceptable but frustrating nights.",
  },
]

export const faqs: { question: string; answer: string }[] = [
  {
    question: "What is Lumora?",
    answer:
      "Lumora is a sleep mask that acts on your sleep instead of just reporting on it. A small sensor pod inside the mask reads movement and temperature through the night, and at launch it will use that to wake you at a lighter moment inside the window you choose, with a gradual warm sunrise built into the mask.",
  },
  {
    question: "How is this different from Oura or a sleep tracker?",
    answer:
      "A tracker measures and reports. It hands you a score in the morning and leaves you to figure out what to do with it. Lumora acts on what it measures. It uses the sensing to change how your night ends, by finding a lighter moment to wake you instead of firing at a fixed time. That is the entire difference.",
  },
  {
    question: "How does the wake window work?",
    answer:
      "You set a window rather than a single time, for example between 6:30 and 7:00. Inside that window Lumora looks for a lighter moment to bring you up, and begins a gradual sunrise there. If it does not find one, it wakes you at the end of your window, so you are never late.",
  },
  {
    question: "How does it stay cool?",
    answer:
      "With a passive cooling insert. The material absorbs and releases heat as conditions shift, which helps the mask resist overheating through the night. There is no powered heating or cooling in the mask.",
  },
  {
    question: "Can I wash it?",
    answer:
      "Yes. The sensor pod lifts out of its pocket, and the fabric mask goes in the wash. Keeping the intelligence in a removable pod is also what lets you upgrade the electronics later without replacing the mask.",
  },
  {
    question: "When can I get one?",
    answer:
      "Lumora launches on Kickstarter, and the waitlist is how you hear first. Backers on day one get the lowest pricing we will offer, from $129, before retail pricing of $179 to $199.",
  },
]

export const founders: {
  name: string
  role: string
  bio: string
  image: string
  linkedin: string
}[] = [
  {
    name: "Rehan Raj",
    role: "Founder",
    bio: "Rehan is the founder of Lumora, where he leads product, engineering, and design. A student at Lutheran High School of San Antonio, he has launched startups and apps, trained through Harvard's Ventures Tech program and CS50, and pitched Lumora to a $1,000 win at Geekdom. He also founded The Uplift Project, raising more than $15,000 for families facing blood cancer with Blood Cancer United, and was named a Featured National Designer by Cooper Hewitt, Smithsonian Design Museum.",
    image: "/images/rehan.jpg",
    linkedin: "https://www.linkedin.com/in/rehanraj/",
  },
]

export const navLinks: { label: string; href: string }[] = [
  { label: "The problem", href: "#problem" },
  { label: "How it works", href: "#system" },
  { label: "The mask", href: "#collection" },
  { label: "FAQ", href: "#faq" },
]

export const whyJoin: { title: string; body: string; icon: IconKey }[] = [
  {
    title: "Lowest pricing, day one",
    body: `The waitlist hears first when the Kickstarter goes live, and day one backers get the lowest price we will offer, from ${SITE.kickstarterPrice}.`,
    icon: "gem",
  },
  {
    title: "First units off the line",
    body: "Early backers receive their Lumora ahead of retail, while the first production run is still going out.",
    icon: "sparkles",
  },
  {
    title: "Shape what ships",
    body: "The list is small enough that your answers actually move decisions, from wake windows to fit and fabric.",
    icon: "sensor",
  },
  {
    title: "No spam, no noise",
    body: "One email when the campaign launches, and occasional real progress from the build. Nothing else.",
    icon: "shield",
  },
]
