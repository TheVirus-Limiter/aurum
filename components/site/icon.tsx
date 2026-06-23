import {
  MoonStar,
  Thermometer,
  Waves,
  Sun,
  Gem,
  Volume2,
  Sparkles,
  ShieldCheck,
  BatteryCharging,
  Radar,
  type LucideProps,
} from "lucide-react"
import type { IconKey } from "@/lib/site-content"

const MAP = {
  moon: MoonStar,
  thermometer: Thermometer,
  waves: Waves,
  sun: Sun,
  gem: Gem,
  volume: Volume2,
  sparkles: Sparkles,
  shield: ShieldCheck,
  battery: BatteryCharging,
  sensor: Radar,
} as const

export function Icon({ name, ...props }: { name: IconKey } & LucideProps) {
  const Cmp = MAP[name]
  return <Cmp {...props} />
}
