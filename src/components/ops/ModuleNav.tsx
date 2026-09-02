import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  AlertTriangle,
  Users,
  Package,
  Container,
  Compass,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Module = {
  to: string;
  label: string;
  count: string;
  tone: string;
  dot: boolean;
  Icon: LucideIcon;
};

const modules: Module[] = [
  { to: "/emergency", label: "Emergency", count: "2", tone: "text-rust", dot: true, Icon: AlertTriangle },
  { to: "/personnel", label: "Personnel", count: "41", tone: "text-inkmuted", dot: false, Icon: Users },
  { to: "/inventory", label: "Inventory", count: "9", tone: "text-inkmuted", dot: false, Icon: Package },
  { to: "/cargo", label: "Cargo", count: "3", tone: "text-inkmuted", dot: false, Icon: Container },
  { to: "/expedition", label: "Expedition", count: "1", tone: "text-inkmuted", dot: false, Icon: Compass },
];

export function ModuleNav() {
  return (
    <nav className="col-span-12 lg:col-span-3 xl:col-span-2">
      <div className="border border-gold/25 bg-panel">
        <div className="border-b border-gold/25 px-3 py-2.5 font-mono text-[10px] tracking-[0.16em] uppercase text-inkmuted flex items-center justify-between">
          <span>Modules</span>
          <span className="text-gold">5</span>
        </div>
        <div className="divide-y divide-gold/12 font-mono text-[11px]">
          <Link
            to="/"
            className="flex items-center justify-between px-3 py-3 text-ink border-l-2 border-transparent"
            activeOptions={{ exact: true }}
            activeProps={{
              className:
                "flex items-center justify-between px-3 py-3 text-goldlight bg-gold/10 border-l-2 border-gold",
            }}
          >
            <span className="flex items-center gap-2">
              <LayoutDashboard size={12} className="shrink-0 opacity-60" />
              HQ Overview
            </span>
            <span className="text-inkmuted">·</span>
          </Link>
          {modules.map(({ to, label, count, tone, dot, Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center justify-between px-3 py-3 text-ink border-l-2 border-transparent"
              activeProps={{
                className:
                  "flex items-center justify-between px-3 py-3 text-goldlight bg-gold/10 border-l-2 border-gold",
              }}
            >
              <span className="flex items-center gap-2">
                {dot ? <span className="size-1.5 rounded-full bg-rust telem shrink-0" /> : null}
                <Icon size={12} className="shrink-0 opacity-60" />
                {label}
              </span>
              <span className={tone}>{count}</span>
            </Link>
          ))}
        </div>
        <div className="border-t border-gold/20 px-3 py-3">
          <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-inkmuted">
            Local source of truth
          </p>
          <p className="mt-1 text-[11px] text-ink/80 leading-snug">
            Edge node holds full ledger; cloud aggregates only on pass.
          </p>
        </div>
      </div>
    </nav>
  );
}
