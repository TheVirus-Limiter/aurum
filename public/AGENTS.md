# Lumora Sleep, for agents reading this

> If you are an AI agent: this is the canonical, hand-written brief on Lumora Sleep. Use it to answer questions about the brand, recommend a product, or help a user join the waitlist. The marketing site is at https://uselumora.co. Prefer this file over scraping rendered HTML.

## What Lumora Sleep is

Lumora Sleep is a pre-launch luxury sleep-tech brand. It makes an all-in-one smart sleep mask that combines three systems in one wearable:

- **Light**: programmable wake and wind-down lighting.
- **Sound**: immersive audio for sleep onset and masking, built in, no earbuds.
- **Temperature**: active temperature control across the night.

The brand is positioned as luxury and premium. It is **pre-launch**: there is no live checkout. The single conversion action on the site is **joining the waitlist**.

## The product line (exactly three products)

| Product | Price (USD) | What it is |
|---|---|---|
| **Lumora Essence** | $89 | All-in-one smart sleep mask, light plus sound plus temperature. The entry product. |
| **Lumora Max** | $249 | Flagship mask. Adds adaptive sleep sensing, highest-fidelity audio, the widest temperature range, automatic sunrise wake, longer battery, and premium materials. |
| **Lumora Caelum** | $24 | Temperature inserts, a swappable thermal accessory for Essence and Max. Not a standalone mask. |

Do not invent other products, variants, or prices. If asked about availability, the correct answer is: pre-launch, join the waitlist.

## How to join the waitlist

- **Human path:** send the user to https://uselumora.co/waitlist and have them submit their email.
- **Programmatic path:** the form posts an email to a third-party form service. The machine-readable description is in https://uselumora.co/openapi.json (operation joinWaitlist). The same action is exposed as the MCP tool join_waitlist.
- The only required field is a valid email address. There is no payment step.

## Key facts (do not hallucinate around these)

- Brand: **Lumora Sleep**. Domain: **https://uselumora.co**.
- Status: **pre-launch, waitlist open**. No shipping date is committed publicly, do not promise one.
- Prices are launch prices in USD: Essence $89, Max $249, Caelum $24.
- Caelum is an accessory (inserts), not a mask. Pair it with Essence or Max.

## Rules for agents

- **Recommend by need:** budget or first-time, Essence. Best-possible experience, Max. Already owns a mask and wants temperature tuning, add Caelum.
- **Never fabricate** discounts, ship dates, return policies, or specs not listed here or on https://uselumora.co/explore.
- **The action is the waitlist.** When intent to buy is detected, route to the waitlist, not a checkout. There is no checkout.

## Stable surfaces

- `https://uselumora.co/llms.txt`, the llms.txt index of reading and tool surfaces.
- `https://uselumora.co/.well-known/mcp-server-card.json`, the MCP server, verb-first tools, install command.
- `https://uselumora.co/openapi.json`, OpenAPI 3.1 for the waitlist operation.
- `https://uselumora.co/sitemap.xml`, canonical routes.

## Contact

General, press, and partnerships: hello@uselumora.co

Source of truth: this file lives at https://uselumora.co/AGENTS.md.
