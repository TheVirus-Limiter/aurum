/**
 * Fixed film-grain overlay. This is the texture that makes the near-black
 * background read as cinematic rather than flat. Pure CSS/SVG, no asset.
 */
export default function Grain() {
  const noise = `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`,
  )}`

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] opacity-[0.05] mix-blend-soft-light"
      style={{
        backgroundImage: `url("${noise}")`,
        backgroundSize: "180px 180px",
      }}
    />
  )
}
