import type { ReactNode } from "react";

export function Panel({
  title,
  meta,
  tone = "gold",
  children,
  className = "",
}: {
  title?: string;
  meta?: ReactNode;
  tone?: "gold" | "rust";
  children: ReactNode;
  className?: string;
}) {
  const border = tone === "rust" ? "border-rust/50" : "border-gold/25";
  const bg = tone === "rust" ? "bg-panel2" : "bg-panel";
  return (
    <section className={`border ${border} ${bg} ${className}`}>
      {title ? (
        <header className="flex items-center justify-between gap-3 px-4 pt-4">
          <h2 className="font-display text-lg text-goldlight leading-none">{title}</h2>
          {meta ? (
            <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-inkmuted">
              {meta}
            </span>
          ) : null}
        </header>
      ) : null}
      <div className="p-4">{children}</div>
    </section>
  );
}

export function Stat({
  label,
  value,
  sub,
  tone = "ink",
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: "ink" | "ice" | "rust" | "moss" | "gold";
}) {
  const toneClass = {
    ink: "text-ink",
    ice: "text-ice",
    rust: "text-rust",
    moss: "text-moss",
    gold: "text-goldlight",
  }[tone];
  const borderClass = tone === "rust" ? "border-rust/40" : "border-gold/15";
  return (
    <div className={`border ${borderClass} p-2.5 font-mono`}>
      <p className="text-inkmuted text-[9px] tracking-[0.1em] uppercase">{label}</p>
      <p className={`${toneClass} text-lg leading-none mt-1`}>
        {value}
        {sub ? <span className="text-inkmuted text-xs">{sub}</span> : null}
      </p>
    </div>
  );
}

export function Gauge({
  label,
  value,
  pct,
  tone = "ice",
}: {
  label: string;
  value: string;
  pct: number;
  tone?: "ice" | "moss" | "rust" | "gold";
}) {
  const bar = {
    ice: "bg-ice",
    moss: "bg-moss",
    rust: "bg-rust",
    gold: "bg-gold",
  }[tone];
  return (
    <div className="font-mono text-[11px]">
      <div className="flex items-center justify-between mb-1">
        <span className="text-ink">{label}</span>
        <span className={tone === "rust" ? "text-rust" : "text-inkmuted"}>{value}</span>
      </div>
      <div className="h-1.5 bg-ground border border-gold/15">
        <div className={`h-full ${bar}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function Row({
  primary,
  secondary,
  status,
  tone = "ink",
}: {
  primary: string;
  secondary?: string;
  status: string;
  tone?: "ink" | "ice" | "rust" | "moss" | "gold";
}) {
  const toneClass = {
    ink: "text-ink",
    ice: "text-ice",
    rust: "text-rust",
    moss: "text-moss",
    gold: "text-goldlight",
  }[tone];
  return (
    <div className="py-2 flex items-center justify-between gap-2 font-mono text-[11px]">
      <div>
        <p className="text-ink">{primary}</p>
        {secondary ? <p className="text-inkmuted text-[10px]">{secondary}</p> : null}
      </div>
      <span className={`${toneClass} shrink-0`}>{status}</span>
    </div>
  );
}

export function Check({ state, label }: { state: "done" | "active" | "todo"; label: string }) {
  if (state === "done") {
    return (
      <div className="flex items-center gap-2">
        <span className="size-3 border border-moss grid place-items-center text-moss text-[9px]">
          ✓
        </span>
        <span className="text-ink/90">{label}</span>
      </div>
    );
  }
  if (state === "active") {
    return (
      <div className="flex items-center gap-2">
        <span className="size-3 border border-gold grid place-items-center text-gold text-[9px]">
          ·
        </span>
        <span className="text-ink/90">{label}</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <span className="size-3 border border-inkmuted/60" />
      <span className="text-inkmuted">{label}</span>
    </div>
  );
}
