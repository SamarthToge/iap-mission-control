import { Wifi, Radio, RefreshCw } from "lucide-react";

export function SyncStrip() {
  return (
    <div className="border-b border-gold/20 bg-panel2/40">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4 py-2 font-mono text-[10px] tracking-[0.14em] uppercase">
          <div className="flex items-center gap-5">
            <span className="text-inkmuted">NCPOR · MoES · IAP OPS</span>
            <span className="hidden sm:flex items-center gap-1.5 text-ice">
              <span className="size-1.5 rounded-full bg-ice telem" />
              <Wifi size={10} className="shrink-0" />
              VSAT 46kbps
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-moss">
              <span className="size-1.5 rounded-full bg-moss" />
              <Radio size={10} className="shrink-0" />
              Iridium SBD · idle
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden lg:inline text-inkmuted">
              Uplink 02:14:09 IST · node Bharati-EDGE-01
            </span>
            <span className="flex items-center gap-1.5 text-goldlight">
              <span className="size-1.5 rounded-full bg-gold telem" />
              <RefreshCw size={9} className="shrink-0 animate-spin [animation-duration:3s]" />
              SYNCING
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-gold/15 py-1.5 font-mono text-[10px] tracking-[0.1em]">
          <span className="text-inkmuted">
            QUEUED-DELTA · 1,284 records / 312 KB · compressed Δ
          </span>
          <div className="hidden sm:flex items-center gap-3 text-[10px]">
            <span className="text-inkmuted">
              EMG <b className="text-rust">2</b>
            </span>
            <span className="text-inkmuted">
              SAFETY <b className="text-ice">7</b>
            </span>
            <span className="text-inkmuted">
              CARGO+INV <b className="text-ink">1,241</b>
            </span>
            <span className="text-inkmuted">
              MEDIA <b className="text-inkmuted">34</b>
            </span>
            <span className="text-goldlight">ETA 02:16</span>
          </div>
        </div>
      </div>
    </div>
  );
}
