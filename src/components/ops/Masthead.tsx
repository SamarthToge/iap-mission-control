import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ShieldCheck, Wifi } from "lucide-react";

export function Masthead({ subtitle }: { subtitle: ReactNode }) {
  return (
    <div className="border-b border-gold/20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 py-4 flex items-end justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="grid place-items-center size-11 border border-gold/50">
            <span className="grid place-items-center size-8 border border-gold/40 font-display text-gold text-lg leading-none">
              IAP
            </span>
          </Link>
          <div>
            <h1 className="font-display text-goldlight text-2xl sm:text-3xl leading-none text-balance">
              Indian Antarctic Programme — Mission Control
            </h1>
            <p className="mt-1.5 font-mono text-[10px] tracking-[0.16em] uppercase text-inkmuted">
              {subtitle}
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3 font-mono text-[10px] tracking-[0.12em] uppercase text-inkmuted">
          <span className="flex items-center gap-1.5 border border-gold/25 px-2.5 py-1">
            <ShieldCheck size={11} className="text-moss shrink-0" />
            Op offline-safe
          </span>
          <span className="flex items-center gap-1.5 border border-gold/25 px-2.5 py-1 text-ice">
            <Wifi size={11} className="shrink-0" />
            Local node · full CRUD
          </span>
        </div>
      </div>
    </div>
  );
}
