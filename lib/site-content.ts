/**
 * Single source of truth for Lumora site copy and data.
 * House style: no em dashes, no en dashes. Use periods and commas.
 *
 * Status discipline: Lumora is in development. Describe only built hardware in
 * the present tense. The wake window is a DESIGN GOAL until a test supports it.
 * A render, a planned feature, or the waitlist is evidence of design or demand,
 * never of performance. Every behavior below carries an explicit status.
 *
 * Claims: general wellness only. No diagnosing, treating, sleep disorders,
 * apnea, or clinical accuracy. No active heating or cooling. No built-in sound.
 */

export const SITE = {
  name: "Lumora Sleep",
  tagline: "Everything else tracks your sleep. Lumora is being built to act on it.",

  // Development stage. Reused by the hero, FAQ, and product card so they agree.
  stage: "In development",
  stageLine:
    "I'm building a sleep mask that aims to wake you during lighter sleep, within a window you choose.",
  prototypeToday:
    "Prototype today: a bench pod with a motion sensor, a temperature sensor, and a warm LED.",
  nextMilestone:
    "Next I'm testing whether movement and temperature readings can guide wake timing.",
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

  // Planned launch pricing. Nothing is for sale yet.
  kickstarterPrice: "$129",
  kickstarterRange: "$129 to $149",
  retailRange: "$179 to $199",
  pricingLabel: "Planned launch pricing",

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

/** Where each capability stands. Shown as a label wherever the claim appears. */
export type Status = "Built" | "Next test" | "Planned" | "Design"

export type Product = {
  key: "lumora"
  name: string
  tag: string
  tagline: string
  price: string
  priceNote: string
  icon: IconKey
  description: string
  features: { text: string; status: Status }[]
  image: string
  model?: string
  flagship?: boolean
}

/** One product, in development. Price is planned launch pricing, not a live offer. */
export const products: Product[] = [
  {
    key: "lumora",
    name: "Lumora",
    tag: "In development",
    tagline: "Designed to wake you during lighter sleep, within a window you choose.",
    price: SITE.kickstarterPrice,
    priceNote: `${SITE.pricingLabel}: from ${SITE.kickstarterPrice} on Kickstarter, with retail planned at ${SITE.retailRange}. Not available to order yet.`,
    icon: "moon",
    description:
      "A blackout sleep mask with a small removable pod. The prototype pod has a motion sensor, a temperature sensor, and a warm LED. The design goal is to use those readings to wake you during lighter sleep, inside a window you set, with gradually brightening light instead of an alarm sound.",
    features: [
      { text: "Motion and temperature sensors in the pod", status: "Built" },
      { text: "Warm LED in the pod", status: "Built" },
      { text: "Choosing a wake moment from those readings", status: "Next test" },
      { text: "Gradual sunrise inside the mask", status: "Planned" },
      { text: "Passive cooling insert", status: "Planned" },
      { text: "Washable mask with a removable pod", status: "Design" },
    ],
    image: "/images/products/lumoraessence.png",
    model: "/models/LumoraEssence.glb",
  },
]

export const problems: { title: string; icon: IconKey; body: string }[] = [
  {
    title: "Your alarm does not care",
    icon: "sun",
    body: "It fires at 7:00 whether you are drifting near the surface or deep asleep. Wake from the wrong place and the fog can follow you for hours.",
  },
  {
    title: "Trackers mostly report",
    icon: "sensor",
    body: "A ring or a watch hands you a score in the morning and leaves the rest to you. Knowing you slept badly does not change the night you already had.",
  },
  {
    title: "Overheating and a restless mind",
    icon: "thermometer",
    body: "Heat builds against your skin and small sounds keep the mind alert. The night feels longer, lighter, and far less restorative than it should.",
  },
]

/** How it works, as a development sequence. Status is shown on every step. */
export const pillars: {
  index: string
  title: string
  tagline: string
  body: string
  icon: IconKey
  status: Status
}[] = [
  {
    index: "01",
    title: "Sense",
    tagline: "Motion and temperature, from inside the mask.",
    icon: "sensor",
    status: "Built",
    body: "The prototype pod has a motion sensor and a temperature sensor, the two signals the wake window is meant to rely on.",
  },
  {
    index: "02",
    title: "Pick a moment",
    tagline: "The design goal.",
    icon: "waves",
    status: "Next test",
    body: "Inside the window you set, the goal is to find a stretch where movement and temperature suggest lighter sleep. Whether those readings can guide wake timing is the next thing I'm testing.",
  },
  {
    index: "03",
    title: "Wake with light",
    tagline: "Light instead of a siren.",
    icon: "sun",
    status: "Planned",
    body: "The pod already has a warm LED. The plan is for it to brighten gradually inside the mask, so you wake to light rather than an alarm sound.",
  },
]

/** The architecture. This is the design, not a shipped build. */
export const architecture: { title: string; body: string; icon: IconKey }[] = [
  {
    title: "The mask stays simple",
    body: "The plan is washable fabric, a passive cooling insert, and a pocket for the pod. Nothing precious, nothing you have to baby.",
    icon: "moon",
  },
  {
    title: "The pod holds the electronics",
    body: "All of the sensing lives in a small removable pod. The design lets you take it out before washing the mask, and upgrade it later without replacing anything else.",
    icon: "sensor",
  },
]

/** Stops for the scroll-driven 3D tour. The model is a design render. */
export const essenceCallouts: { label: string; text: string }[] = [
  { label: "Lumora", text: "A design render of the mask in development. Turn it. Look closer." },
  { label: "Sensing, built", text: "The prototype pod has a motion sensor and a temperature sensor." },
  { label: "Wake window, next test", text: "The goal is a lighter moment inside the window you set. That is what I'm testing next." },
  { label: "Sunrise wake, planned", text: "A warm light in the pod is meant to brighten gradually, so you wake to light." },
  { label: "Removable pod, design", text: "The electronics are designed to lift out, so the mask can be washed and the pod upgraded." },
]

/** From customer discovery interviews about people's sleep, not tests of the mask. */
export const stats: { value: string; label: string; detail: string }[] = [
  {
    value: "83%",
    label: "reported sleep difficulty",
    detail: "Across my interviews about people's sleep, the clear majority described it as a real and recurring problem.",
  },
  {
    value: "6 / 10",
    label: "average self-rated sleep",
    detail: "People were not describing ideal rest. They were describing acceptable but frustrating nights.",
  },
]

export const faqs: { question: string; answer: string }[] = [
  {
    question: "What is Lumora?",
    answer:
      "Lumora is a sleep mask I'm developing. The prototype pod has a motion sensor, a temperature sensor, and a warm LED. The design goal is to use movement and temperature to wake you during lighter sleep, inside a window you choose. That wake behavior has not been tested yet.",
  },
  {
    question: "What works today?",
    answer:
      "The pod's sensors and warm LED are built on the bench. Next I'm testing whether movement and temperature readings can guide wake timing. Until a test supports it, the wake window is a design goal, not a feature.",
  },
  {
    question: "How is this different from Oura or a sleep tracker?",
    answer:
      "A tracker measures your sleep and reports on it in the morning. Lumora is designed to use what it measures to choose when to wake you. Some smart alarm apps try something similar from a phone on the mattress. The idea I'm testing is whether a sensor in the mask, plus light instead of sound, can do it better.",
  },
  {
    question: "How would the wake window work?",
    answer:
      "You would set a window, for example 6:30 to 7:00. The goal is for Lumora to pick a lighter moment inside it and start a gradual light there, and to wake you at the end of the window if it finds none. This is the design, and it has not been tested yet.",
  },
  {
    question: "How would it stay cool?",
    answer:
      "The plan is a passive cooling insert, a phase change material that absorbs and releases heat. There is no powered heating or cooling in the design.",
  },
  {
    question: "Can I wash it?",
    answer:
      "That is the design. The pod lifts out of a pocket and the fabric mask goes in the wash, which is also what would let the electronics be upgraded later without replacing the mask.",
  },
  {
    question: "When can I get one?",
    answer:
      "Not yet. The plan is to launch on Kickstarter, with planned pricing from $129 and retail planned at $179 to $199. The waitlist is for launch updates: you hear when a test finishes and when the campaign opens.",
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

/** Why sign up: launch updates. Nothing here promises product or delivery. */
export const whyJoin: { title: string; body: string; icon: IconKey }[] = [
  {
    title: "Launch updates",
    body: "One email when the Kickstarter opens, so you hear about it before it fills up.",
    icon: "sparkles",
  },
  {
    title: "Test results",
    body: "Short notes when a prototype test finishes, including the ones that do not go well.",
    icon: "sensor",
  },
  {
    title: "Planned launch pricing",
    body: `Planned Kickstarter pricing starts at ${SITE.kickstarterPrice}, below the planned retail price of ${SITE.retailRange}.`,
    icon: "gem",
  },
  {
    title: "No noise",
    body: "Updates only, and not many of them.",
    icon: "shield",
  },
]
