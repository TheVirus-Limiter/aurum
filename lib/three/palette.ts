import * as THREE from "three"

export const IRIS = new THREE.Color("#8b7cff")
export const IRIS_SOFT = new THREE.Color("#a99aff")
export const IRIS_DEEP = new THREE.Color("#5b3fb0")
export const BG = new THREE.Color("#08070c")

/** Soft round sprite, generated on a canvas so particles read as dust, not squares. */
export function makeSoftCircleTexture(color = "#a99aff") {
  if (typeof document === "undefined") return null
  const s = 64
  const c = document.createElement("canvas")
  c.width = c.height = s
  const ctx = c.getContext("2d")!
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2)
  g.addColorStop(0, color)
  g.addColorStop(0.35, color)
  g.addColorStop(1, "rgba(0,0,0,0)")
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.arc(s / 2, s / 2, s / 2, 0, Math.PI * 2)
  ctx.fill()
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

/** Letter-spaced wordmark texture (transparent bg) for decals on the mask. */
export function makeLabelTexture(text: string, color = "#cdbfff", tracking = 0.5) {
  if (typeof document === "undefined") return null
  const w = 512
  const h = 128
  const c = document.createElement("canvas")
  c.width = w
  c.height = h
  const ctx = c.getContext("2d")!
  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = color
  ctx.font = "600 54px Inter, system-ui, sans-serif"
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  // manual letter spacing
  const spaced = text.split("").join(" ")
  ctx.letterSpacing = `${tracking * 40}px`
  ctx.fillText(spaced, w / 2, h / 2)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  return tex
}

/** Small OLED-style display texture for the mask screens. */
export function makeScreenTexture(time: string, label: string) {
  if (typeof document === "undefined") return null
  const w = 256
  const h = 160
  const c = document.createElement("canvas")
  c.width = w
  c.height = h
  const ctx = c.getContext("2d")!
  ctx.fillStyle = "#08070c"
  ctx.fillRect(0, 0, w, h)
  // time
  ctx.fillStyle = "#ece9ff"
  ctx.font = "600 64px Inter, system-ui, sans-serif"
  ctx.textBaseline = "alphabetic"
  ctx.textAlign = "left"
  ctx.fillText(time, 20, 86)
  ctx.fillStyle = "#8b7cff"
  ctx.font = "600 22px Inter, system-ui, sans-serif"
  ctx.fillText("AM", 20 + ctx.measureText(time).width + 28, 86)
  // label
  ctx.fillStyle = "#9b95b8"
  ctx.font = "500 20px Inter, system-ui, sans-serif"
  ctx.letterSpacing = "2px"
  ctx.fillText(label, 20, 126)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  return tex
}

/** Radial glow disc for volumetric-feeling light behind the product. */
export function makeGlowTexture(inner = "#8b7cff", mid = "#5b3fb0") {
  if (typeof document === "undefined") return null
  const s = 256
  const c = document.createElement("canvas")
  c.width = c.height = s
  const ctx = c.getContext("2d")!
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2)
  g.addColorStop(0, inner)
  g.addColorStop(0.4, mid)
  g.addColorStop(1, "rgba(0,0,0,0)")
  ctx.fillStyle = g
  ctx.fillRect(0, 0, s, s)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

/** Soft wake-light gradient, bright along the bottom and fading up. */
export function makeWakeLightTexture(color = "#a99aff") {
  if (typeof document === "undefined") return null
  const w = 256
  const h = 256
  const c = document.createElement("canvas")
  c.width = w
  c.height = h
  const ctx = c.getContext("2d")!
  const g = ctx.createRadialGradient(w / 2, h * 0.92, 0, w / 2, h * 0.92, h * 0.8)
  g.addColorStop(0, color)
  g.addColorStop(0.4, "rgba(169,154,255,0.5)")
  g.addColorStop(1, "rgba(0,0,0,0)")
  ctx.fillStyle = g
  ctx.fillRect(0, 0, w, h)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}
