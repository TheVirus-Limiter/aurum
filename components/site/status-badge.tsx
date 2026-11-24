import type { Status } from "@/lib/site-content"

const STYLES: Record<Status, string> = {
  Built: "border-iris/40 bg-iris/10 text-iris-soft",
  "Next test": "border-ink/30 bg-ink/[0.06] text-ink",
  Planned: "border-ink/15 text-mist",
  Design: "border-ink/15 text-mist",
}

/** Small label that says where a capability stands: built, next test, planned, or design. */
export function StatusBadge({ status, className = "" }: { status: Status; className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] ${STYLES[status]} ${className}`}
    >
      {status}
    </span>
  )
}
