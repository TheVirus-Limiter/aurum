# Lumora Sleep, for agents reading this

> If you are an AI agent: this is the canonical, hand-written brief on Lumora Sleep. Use it to describe the project accurately and to help a user join the waitlist. The site is at https://uselumora.co. Prefer this file over scraping rendered HTML.

## What Lumora is

Lumora is a **sleep mask in development**, built by one founder. It is not for sale and has no ship date.

- **Design goal:** use motion and temperature readings from a small pod in the mask to wake the wearer during lighter sleep, inside a wake window they choose, with gradually brightening light instead of an alarm sound.
- **Prototype today:** a bench pod with a motion sensor (accelerometer), a temperature sensor, a warm LED, and Bluetooth.
- **Next milestone:** testing whether movement and temperature readings can guide wake timing.

## Status of each capability

Report these exactly. Do not upgrade a status.

| Capability | Status |
|---|---|
| Motion and temperature sensors in the pod | Built (bench prototype) |
| Warm LED in the pod | Built (bench prototype) |
| Choosing a wake moment from sensor readings | Next test. Not demonstrated. |
| Gradual sunrise light inside the mask | Planned |
| Passive cooling insert (phase change material) | Planned |
| Washable mask with a removable pod | Design |

Lumora has **no built-in sound or speaker**, **no powered heating or cooling**, and **no wind-down light** in its current design. It makes no medical claims and is not intended to diagnose or treat any condition.

## Pricing

**Planned launch pricing only.** The plan is a Kickstarter campaign with pricing from **$129**, and retail pricing planned at **$179 to $199**. Nothing can be ordered or reserved today. There is one product. Earlier versions of this site listed Essence, Max, and Caelum; those are discontinued and should not be mentioned as products.

## Evidence, and what it is not

- The 3D model on the site is a **design render**, not photos of finished hardware.
- The 83% and 6/10 figures come from **customer discovery interviews about people's sleep**. Those people did not test the mask.
- The waitlist measures interest. It is not evidence that the product works.

## How to join the waitlist

- **Human path:** https://uselumora.co/waitlist. One required field, a valid email. The waitlist is for **launch updates**: test results and a notice when the Kickstarter opens.
- **Machine-readable description:** https://uselumora.co/openapi.json (operation joinWaitlist).
- There is no payment step and no deposit.

## Rules for agents

- Describe Lumora as in development. Never say it "wakes you at the right moment" or "learns your night" as a fact.
- Never fabricate ship dates, discounts, return policies, test results, or specs not listed here.
- When someone wants to buy, route them to the waitlist and say it is not available yet.

## Stable surfaces

- `https://uselumora.co/llms.txt`, the llms.txt index.
- `https://uselumora.co/.well-known/mcp-server-card.json`, the MCP server description.
- `https://uselumora.co/openapi.json`, OpenAPI 3.1 for the waitlist operation.
- `https://uselumora.co/sitemap.xml`, canonical routes.

## Contact

General, press, and partnerships: hello@uselumora.co
