/**
 * Single source of truth for Lumora site copy and data.
 * House style: no em dashes, no en dashes. Use periods and commas.
 */

export const SITE = {
  name: "Lumora Sleep",
  tagline: "Redefine Rest.",
  url: "https://uselumora.co",
  email: "hello@uselumora.co",
  instagram: "https://www.instagram.com/lumorasleep?igsh=MWpwcHQxYXE5Z2hnYg==",
  instagramHandle: "@lumorasleep",

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
  // Editable founding-cohort counter shown as social proof. Set to the real
  // number before launch.
  waitlistCount: 30,

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
  key: "essence" | "max" | "caelum"
  name: string
  tag: string
  tagline: string
  price: string
  icon: IconKey
  description: string
  features: string[]
  image: string
  model?: string
  flagship?: boolean
}

export const products: Product[] = [
  {
    key: "essence",
    name: "Lumora Essence",
    tag: "The all-in-one mask",
    tagline: "Three systems. One ritual.",
    price: "$89",
    icon: "moon",
    description:
      "Our signature mask. Gentle light, immersive sound, and active temperature, woven into one weightless wearable that belongs in a ritual, not a medicine cabinet.",
    features: [
      "Programmable light for wind down and wake",
      "Immersive sound without earbuds",
      "Active temperature control",
    ],
    image: "/images/products/lumoraessence.png",
    model: "/models/LumoraEssence.glb",
  },
  {
    key: "max",
    name: "Lumora Max",
    tag: "The flagship",
    tagline: "The full expression of rest.",
    price: "$249",
    icon: "gem",
    description:
      "Everything in Essence, taken further. The widest temperature range, the highest fidelity sound, and an adaptive layer that learns your night and refines it over time.",
    features: [
      "Adaptive sleep sensing",
      "Spatial high fidelity audio",
      "Dual zone active cooling and warmth",
      "Automatic sunrise wake",
      "Multi night battery",
      "Mulberry silk and alloy build",
    ],
    image: "/images/products/lumoramax.png",
    model: "/models/LumoraMax.glb",
    flagship: true,
  },
  {
    key: "caelum",
    name: "Lumora Caelum",
    tag: "Temperature inserts",
    tagline: "Thermal balance, refined.",
    price: "$24",
    icon: "thermometer",
    description:
      "Swappable phase change inserts that extend and tune the temperature of your mask, so overheating never gets the chance to pull you out of deep rest.",
    features: [
      "Phase change temperature control",
      "Swap in seconds",
      "Tuned for Essence and Max",
    ],
    image: "/images/products/caelum.png",
  },
]

export const problems: { title: string; icon: IconKey; body: string }[] = [
  {
    title: "Overheating",
    icon: "thermometer",
    body: "Temperature spikes quietly pull the body out of deeper rest. The night feels longer, lighter, and far less restorative than it should.",
  },
  {
    title: "A restless mind",
    icon: "waves",
    body: "Even when the room looks quiet, the mind often is not. Small sounds, phone habits, and unfinished thoughts keep you alert when you want to drift.",
  },
  {
    title: "Harsh mornings",
    icon: "sun",
    body: "Most mornings begin with an abrupt alarm that feels like interruption, not recovery. That first moment sets the tone for the entire day.",
  },
]

/** The three systems built into the Essence mask. */
export const pillars: {
  index: string
  title: string
  tagline: string
  body: string
  icon: IconKey
}[] = [
  {
    index: "01",
    title: "Light",
    tagline: "Wake with light, not shock.",
    icon: "sun",
    body: "Programmable light guides you down at night and lifts you out of sleep with a gradual dawn, so mornings begin gently instead of all at once.",
  },
  {
    index: "02",
    title: "Sound",
    tagline: "Sound that quiets the mind.",
    icon: "volume",
    body: "Immersive soundscapes and guided wind down are built in, with no earbuds and no hardware pressed against your face. Just calm, on demand.",
  },
  {
    index: "03",
    title: "Temperature",
    tagline: "Cool and stable, all night.",
    icon: "thermometer",
    body: "Active temperature holds the mask environment steady through the night, so the overheating that fragments sleep never gets started.",
  },
]

/** Stops for the scroll-driven 3D Essence tour. */
export const essenceCallouts: { label: string; text: string }[] = [
  { label: "Lumora Essence", text: "Three systems woven into one weightless mask. Turn it. Look closer." },
  { label: "Adaptive light", text: "A gradual dawn wakes you gently, and a soft wind down light helps you fall." },
  { label: "Immersive sound", text: "Calming soundscapes built into the band. No earbuds, no hardware on the eyes." },
  { label: "Active temperature", text: "A cool, stable climate held against your skin from the moment you lie down." },
  { label: "At a glance", text: "Alarm, battery, and gentle controls, right where your hand expects them." },
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
  {
    value: "$950B",
    label: "projected sleep market by 2032",
    detail: "The category keeps growing as people invest in recovery, focus, and daily performance.",
  },
]

export const faqs: { question: string; answer: string }[] = [
  {
    question: "What is Lumora?",
    answer:
      "Lumora is a luxury sleep mask that brings light, sound, and temperature together in one wearable. Instead of stacking a wake light, a sound app, and a fan, Lumora builds all three into a single, refined ritual of rest.",
  },
  {
    question: "What makes the Essence mask different from a normal sleep mask?",
    answer:
      "Essence is not just a light blocker. It is an all-in-one system with programmable light, immersive sound, and active temperature control, wrapped in a premium blackout mask with a mulberry silk exterior and a structured, low pressure shape.",
  },
  {
    question: "What is the difference between Essence and Max?",
    answer:
      "Essence is the all-in-one mask with light, sound, and temperature at $89. Max is the flagship at $249. It adds adaptive sleep sensing, the widest temperature range, the highest fidelity sound, automatic sunrise wake, and premium materials.",
  },
  {
    question: "How does Caelum keep things cool?",
    answer:
      "Caelum is a set of swappable phase change inserts. Phase change material absorbs and releases heat as conditions shift, which reduces overheating and keeps the mask environment more stable across the night. It is tuned for both Essence and Max.",
  },
  {
    question: "Is the sound built into the mask?",
    answer:
      "Yes. Light, sound, and temperature are all built into the mask itself, so there are no earbuds and no extra hardware pressed against your face. It keeps the experience light, comfortable, and simple to live with.",
  },
  {
    question: "When can I get one?",
    answer:
      "Lumora is pre launch. The single best thing you can do is join the waitlist. Founding members get first access and founding pricing that we will not offer again.",
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
    role: "Chief Executive Officer",
    bio: "Rehan is the founder and Chief Executive Officer of Lumora, leading product, brand, and growth. A student at Lutheran High School of San Antonio, he has launched startups and apps, trained through Harvard's Ventures Tech program and CS50, and pitched Lumora to a $1,000 win at Geekdom. He also founded The Uplift Project, raising more than $15,000 for families facing blood cancer with Blood Cancer United, and was named a Featured National Designer by Cooper Hewitt, Smithsonian Design Museum.",
    image: "/images/rehan.jpg",
    linkedin: "https://www.linkedin.com/in/rehanraj/",
  },
  {
    name: "Ben Storandt",
    role: "Chief Operating Officer",
    bio: "Ben is the Chief Operating Officer of Lumora, turning ideas into shipped detail and keeping the team moving. A senior at Lutheran High School of San Antonio, he captains both robotics and soccer, serves as Student Council Treasurer and a National Honor Society member, and competes across several sports. He is also part of The Uplift Project, the student campaign that has raised more than $15,000 for families facing blood cancer.",
    image: "/images/ben-storandt.png",
    linkedin: "https://www.linkedin.com/in/benjamin-storandt-64429b404/",
  },
]

export const navLinks: { label: string; href: string }[] = [
  { label: "The System", href: "#system" },
  { label: "Essence", href: "#essence" },
  { label: "The Lineup", href: "#collection" },
  { label: "Signals", href: "#signals" },
  { label: "FAQ", href: "#faq" },
]

export const whyJoin: { title: string; body: string; icon: IconKey }[] = [
  {
    title: "Founding pricing, for life",
    body: "The price you join at is the price you keep. Founding members never pay launch markup.",
    icon: "gem",
  },
  {
    title: "First access, before anyone",
    body: "Founders receive their Lumora ahead of public launch, while the first run is still warm.",
    icon: "sparkles",
  },
  {
    title: "Shape the product",
    body: "A small founding circle helps us decide what ships next. Your night informs the design.",
    icon: "sensor",
  },
  {
    title: "Members only releases",
    body: "Quiet drops, new inserts, and limited materials, offered to the list before the public.",
    icon: "shield",
  },
]
