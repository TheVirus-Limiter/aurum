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
    "We're building a sleep mask that reads your night and wakes you gently in your lightest sleep, inside a window you choose.",
  prototypeToday:
    "Currently in prototype.",
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
  pricingLabel: "Launch pricing",

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
    tag: "Coming to Kickstarter",
    tagline: "Wake in your lightest sleep, inside a window you choose.",
    price: SITE.kickstarterPrice,
    priceNote: `Launching on Kickstarter from ${SITE.kickstarterPrice}. Retail ${SITE.retailRange}.`,
    icon: "moon",
    description:
      "A blackout sleep mask with a small removable sensor pod. It follows your movement and temperature through the night, then wakes you with a slow, warm sunrise at a lighter moment in your window, instead of an alarm.",
    features: [
      { text: "Motion and temperature sensing", status: "Built" },
      { text: "Smart wake window", status: "Planned" },
      { text: "Gradual sunrise light", status: "Planned" },
      { text: "Passive cooling insert", status: "Planned" },
      { text: "Washable mask, removable pod", status: "Design" },
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
    title: "It listens",
    tagline: "Motion and temperature, from inside the mask.",
    icon: "sensor",
    status: "Built",
    body: "A small pod in the mask follows your movement and temperature through the night, the two signals that show where you are in your sleep.",
  },
  {
    index: "02",
    title: "It waits",
    tagline: "The right moment, not the same moment.",
    icon: "waves",
    status: "Next test",
    body: "Instead of firing at a fixed time, Lumora is designed to find a lighter moment inside the window you set.",
  },
  {
    index: "03",
    title: "It wakes you there",
    tagline: "Light instead of a siren.",
    icon: "sun",
    status: "Planned",
    body: "A warm light builds slowly inside the mask, so you surface naturally instead of being pulled out of sleep.",
  },
]

/** The architecture. This is the design, not a shipped build. */
export const architecture: { title: string; body: string; icon: IconKey }[] = [
  {
    title: "The mask stays simple",
    body: "Washable fabric, a passive cooling insert, and a pocket for the pod. Nothing precious, nothing you have to baby.",
    icon: "moon",
  },
  {
    title: "The pod holds the electronics",
    body: "All of the sensing lives in a small removable pod. Take it out before washing, and upgrade it later without replacing the mask.",
    icon: "sensor",
  },
]

/** Stops for the scroll-driven 3D tour. The model is a design render. */
export const essenceCallouts: { label: string; text: string }[] = [
  { label: "Lumora", text: "A blackout mask with a sensor pod inside. Turn it. Look closer." },
  { label: "It listens", text: "A small sensor follows your movement and temperature through the night." },
  { label: "It waits", text: "No fixed alarm. It looks for a lighter moment inside your window." },
  { label: "Sunrise wake", text: "A warm light builds slowly, so you surface instead of being yanked out." },
  { label: "Removable pod", text: "The electronics lift out, so the mask can be washed and the pod upgraded." },
]

/** From customer discovery interviews about people's sleep, not tests of the mask. */
export const stats: { value: string; label: string; detail: string }[] = [
  {
    value: "83%",
    label: "reported sleep difficulty",
    detail: "In our interviews about sleep, the clear majority described it as a real and recurring problem.",
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
      "Lumora is a sleep mask designed to act on your sleep, not just measure it. A small pod in the mask follows your movement and temperature through the night, and wakes you with a gradual warm light at a lighter moment inside the window you choose. It is currently in prototype.",
  },
  {
    question: "How is this different from Oura or a sleep tracker?",
    answer:
      "A tracker measures your night and reports on it in the morning. Lumora is designed to use what it measures to decide when to wake you, with light instead of sound. It is the difference between a report and a result.",
  },
  {
    question: "How does the wake window work?",
    answer:
      "You set a window, for example 6:30 to 7:00. Lumora looks for a lighter moment inside it and starts a gradual sunrise there. If the moment never comes, it wakes you at the end of your window, so you are never late.",
  },
  {
    question: "How does it stay cool?",
    answer:
      "With a passive cooling insert, a phase change material that absorbs and releases heat to keep the mask from overheating. No fans, no powered cooling.",
  },
  {
    question: "Can I wash it?",
    answer:
      "Yes. The pod lifts out of its pocket and the fabric mask goes in the wash. Keeping the electronics in a removable pod also means they can be upgraded later without replacing the mask.",
  },
  {
    question: "When can I get one?",
    answer:
      "Lumora launches on Kickstarter, from $129. Join the waitlist and you will hear the moment the campaign opens.",
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

/** Why sign up: launch news. */
export const whyJoin: { title: string; body: string; icon: IconKey }[] = [
  { title: "First to know", body: "One email the moment the Kickstarter opens, before it fills up.", icon: "sparkles" },
  { title: "Launch pricing", body: `Kickstarter pricing starts at ${SITE.kickstarterPrice}, below retail of ${SITE.retailRange}.`, icon: "gem" },
  { title: "Behind the build", body: "Occasional updates as Lumora moves from prototype to production.", icon: "sensor" },
  { title: "No noise", body: "Updates only, and not many of them.", icon: "shield" },
]
