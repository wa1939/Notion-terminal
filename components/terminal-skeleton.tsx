export function SkeletonLine({
  width = "100%",
  className = "",
}: {
  width?: string
  className?: string
}) {
  return (
    <div
      className={`h-3 rounded bg-[var(--term-line)] animate-pulse ${className}`}
      style={{ width }}
    />
  )
}

export function SkeletonBlock({
  height = "120px",
  className = "",
}: {
  height?: string
  className?: string
}) {
  return (
    <div
      className={`rounded bg-[var(--term-line)] animate-pulse ${className}`}
      style={{ height }}
    />
  )
}

export function TerminalLoadingIndicator({
  text = "loading",
}: {
  text?: string
}) {
  return (
    <div className="flex items-center gap-2 text-[var(--term-gray)] text-sm font-mono">
      <span className="text-[var(--term-green)]">$</span>
      <span className="animate-pulse">{text}...</span>
    </div>
  )
}
