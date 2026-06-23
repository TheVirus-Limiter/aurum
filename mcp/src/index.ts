#!/usr/bin/env node
/**
 * Lumora Sleep MCP server (stdio, verb-first tools).
 * Run separately from the static site:  npm install && npm run build && npm start
 * Or reference via the server card's install command: npx -y @lumora/mcp-server
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"

const PRODUCTS = [
  {
    id: "essence",
    name: "Lumora Essence",
    price_usd: 89,
    type: "Smart sleep mask",
    description:
      "All-in-one smart sleep mask combining programmable light, immersive sound, and active temperature control in one wearable. The entry product.",
    features: ["Programmable light", "Immersive sound", "Active temperature control"],
  },
  {
    id: "max",
    name: "Lumora Max",
    price_usd: 249,
    type: "Smart sleep mask (flagship)",
    description:
      "Flagship mask: everything in Essence plus adaptive sleep sensing, highest-fidelity audio, the widest temperature range, automatic sunrise wake, longer battery, and premium materials.",
    features: [
      "Adaptive sleep sensing",
      "Spatial high fidelity audio",
      "Dual zone active cooling",
      "Automatic sunrise wake",
      "Multi night battery",
    ],
  },
  {
    id: "caelum",
    name: "Lumora Caelum",
    price_usd: 24,
    type: "Temperature inserts (accessory)",
    description:
      "Swappable phase change inserts that extend and tune the temperature control of the Essence and Max masks. An accessory, not a standalone mask.",
    features: ["Phase change inserts", "Swap in seconds", "Tuned for Essence and Max"],
  },
] as const

const WAITLIST_ENDPOINT =
  process.env.LUMORA_WAITLIST_ENDPOINT ?? "https://formspree.io/f/xdkogkpv"

const server = new McpServer({ name: "lumora-sleep", version: "1.0.0" })

server.registerTool(
  "get_products",
  {
    title: "Get products",
    description:
      "List all Lumora Sleep products (Essence $89, Max $249, Caelum $24) with prices and short descriptions.",
    inputSchema: {},
  },
  async () => ({
    content: [{ type: "text", text: JSON.stringify({ products: PRODUCTS }, null, 2) }],
  }),
)

server.registerTool(
  "get_product",
  {
    title: "Get product",
    description: "Get full details for one Lumora product by id (essence | max | caelum).",
    inputSchema: {
      product: z.enum(["essence", "max", "caelum"]).describe("Product id"),
    },
  },
  async ({ product }) => {
    const found = PRODUCTS.find((p) => p.id === product)
    if (!found) {
      return {
        isError: true,
        content: [{ type: "text", text: `Unknown product "${product}". Valid: essence, max, caelum.` }],
      }
    }
    return { content: [{ type: "text", text: JSON.stringify(found, null, 2) }] }
  },
)

server.registerTool(
  "join_waitlist",
  {
    title: "Join waitlist",
    description:
      "Join the Lumora Sleep pre-launch waitlist. Posts an email to the form service. Email is required.",
    inputSchema: {
      email: z.string().email().describe("Email address to add to the waitlist."),
      product_interest: z
        .enum(["Lumora Essence", "Lumora Max", "Lumora Caelum"])
        .optional()
        .describe("Optional product the user is most interested in."),
    },
  },
  async ({ email, product_interest }) => {
    try {
      const res = await fetch(WAITLIST_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, product_interest, source: "mcp" }),
      })
      if (!res.ok) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Waitlist service returned ${res.status}. Try again or visit https://uselumora.co/waitlist`,
            },
          ],
        }
      }
      return {
        content: [{ type: "text", text: `Added ${email} to the Lumora Sleep waitlist.` }],
      }
    } catch (err) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Could not reach the waitlist service (${(err as Error).message}). Send the user to https://uselumora.co/waitlist`,
          },
        ],
      }
    }
  },
)

const transport = new StdioServerTransport()
await server.connect(transport)
