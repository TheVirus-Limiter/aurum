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
    id: "lumora",
    name: "Lumora",
    stage: "In development. Not for sale.",
    planned_launch_price_usd: 129,
    planned_retail_price_usd: "179 to 199",
    type: "Sleep mask",
    description:
      "A sleep mask in development. Design goal: use motion and temperature readings from a pod in the mask to wake the wearer during lighter sleep, inside a chosen window, with gradually brightening light. The wake window has not been tested yet.",
    capabilities: [
      { capability: "Motion and temperature sensors in the pod", status: "Built (bench prototype)" },
      { capability: "Warm LED in the pod", status: "Built (bench prototype)" },
      { capability: "Choosing a wake moment from sensor readings", status: "Next test" },
      { capability: "Gradual sunrise light inside the mask", status: "Planned" },
      { capability: "Passive cooling insert", status: "Planned" },
      { capability: "Washable mask with removable pod", status: "Design" },
    ],
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
      "Return the Lumora product, in development, with each capability labeled by status and planned launch pricing.",
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
    description: "Get full details for the Lumora product by id (lumora).",
    inputSchema: {
      product: z.enum(["lumora"]).describe("Product id"),
    },
  },
  async ({ product }) => {
    const found = PRODUCTS.find((p) => p.id === product)
    if (!found) {
      return {
        isError: true,
        content: [{ type: "text", text: `Unknown product "${product}". Valid: lumora.` }],
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
      "Join the Lumora Sleep waitlist for launch updates. Lumora is in development and not for sale. Email is required.",
    inputSchema: {
      email: z.string().email().describe("Email address to add to the waitlist."),
      describes_you: z.string().optional().describe("Optional answer to the segmentation question."),
    },
  },
  async ({ email, describes_you }) => {
    try {
      const res = await fetch(WAITLIST_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, describes_you, source: "mcp" }),
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
        content: [{ type: "text", text: `Added ${email} to the Lumora Sleep waitlist for launch updates.` }],
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
