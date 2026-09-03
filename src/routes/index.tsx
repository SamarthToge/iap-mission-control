import { createFileRoute, Link } from "@tanstack/react-router";
import { Panel, Stat, Gauge, Row, Check } from "@/components/ops/Panel";
import { Box } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HQ Overview — IAP Mission Control" },
      {
        name: "description",
        content:
          "Offline-first HQ overview for the Indian Antarctic Programme: station status, muster, supply days, cargo and active emergencies.",
      },
      { property: "og:title", content: "HQ Overview — IAP Mission Control" },
      {
        property: "og:description",
        content:
          "Edge-first command board for Bharati and Maitri stations: sync queue, muster, supplies, cargo, emergencies.",
      },
    ],
  }),
  component: Overview,
});

function Overview() {
  return (
    <div className="grid grid-cols-12 gap-4">
      {/* ── 3-D Monitor launch banner ── */}
      <div className="col-span-12">
        <Link
          to="/station-3d"
          className="flex items-center justify-between px-4 py-3 border border-ice/40 bg-panel2 hover:bg-ice/5 transition-colors group"
        >
          <span className="flex items-center gap-3">
            <Box size={14} className="text-ice shrink-0" />
            <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-ice">
              3-D Station Monitor — Bharati &amp; Maitri digital twin
            </span>
            <span className="hidden sm:inline font-mono text-[10px] tracking-[0.1em] text-inkmuted">
              · Buildings pulse red when health scores or energy metrics drop
            </span>
          </span>
          <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-inkmuted group-hover:text-ice transition-colors">
            Launch ↗
          </span>
        </Link>
      </div>

      <div className="col-span-12 md:col-span-6">
        <Panel
          title="Bharati · 70°S 11°E"
          meta={
            <span className="flex items-center gap-1.5 text-moss">
              <span className="size-1.5 rounded-full bg-moss telem" />
              Link up
            </span>
          }
        >
          <div className="grid grid-cols-3 gap-3">
            <Stat label="Muster" value="38" sub="/41" />
            <Stat label="Fuel ds" value="212" tone="ice" />
            <Stat label="Rations ds" value="148" />
          </div>
        </Panel>
      </div>

      <div className="col-span-12 md:col-span-6">
        <Panel
          title="Maitri · 74°S 163°E"
          meta={
            <span className="flex items-center gap-1.5 text-ice">
              <span className="size-1.5 rounded-full bg-ice telem" />
              Iridium only
            </span>
          }
        >
          <div className="grid grid-cols-3 gap-3">
            <Stat label="Muster" value="27" sub="/27" />
            <Stat label="Fuel ds" value="186" />
            <Stat label="Med ds" value="31" tone="rust" />
          </div>
        </Panel>
      </div>

      <div className="col-span-12 md:col-span-7">
        <div className="border border-rust/50 bg-panel2">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-rust/40">
            <span className="flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-rust">
              <span className="size-2 rounded-full bg-rust telem" />
              Active emergency · Maitri
            </span>
            <span className="font-mono text-[10px] tracking-[0.1em] text-inkmuted">
              EVAC-SOP-04 · T+00:12
            </span>
          </div>
          <div className="p-4">
            <p className="text-sm text-ink leading-snug">
              Crevasse fall, field party F-3, sector 7. Two personnel stable. HF relay active;
              Iridium SBD queued top-priority.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 font-mono text-[11px]">
              <Check state="done" label="Alert fired locally 00:00" />
              <Check state="done" label="Response team dispatched" />
              <Check state="active" label="Crevasse rig deployed" />
              <Check state="todo" label="Medical review (tele)" />
              <div className="col-span-2">
                <Check state="todo" label="Statutory incident report" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-12 md:col-span-5">
        <Panel title="Cargo in transit" meta="3 legs" className="h-full">
          <div className="divide-y divide-gold/12">
            <Row
              primary="C-8841 · MV Polar Dawn"
              secondary="Chennai → Bharati · AIS live"
              status="at sea"
              tone="ice"
            />
            <Row
              primary="C-8842 · IAF C-295"
              secondary="Goa → Maitri · DGCA"
              status="staged"
              tone="moss"
            />
            <Row
              primary="C-8839 · Cold chain"
              secondary="Samples · 2°C nominal"
              status="ETA 3d"
              tone="gold"
            />
          </div>
        </Panel>
      </div>

      <div className="col-span-12 md:col-span-7">
        <Panel title="Days-of-supply · Bharati" meta="burn-rate ledger">
          <div className="space-y-3">
            <Gauge label="Fuel (diesel)" value="212 d" pct={88} tone="ice" />
            <Gauge label="Rations" value="148 d" pct={62} tone="moss" />
            <Gauge label="Medical" value="31 d · reorder" pct={24} tone="rust" />
          </div>
        </Panel>
      </div>

      <div className="col-span-12 md:col-span-5">
        <Panel title="Personnel muster" meta="68 total" className="h-full">
          <div className="divide-y divide-gold/12 font-mono text-[11px]">
            <div className="py-2 flex items-center justify-between">
              <span className="text-ink">In station</span>
              <span className="text-moss">55</span>
            </div>
            <div className="py-2 flex items-center justify-between">
              <span className="text-ink">Field party F-3</span>
              <span className="text-goldlight">4</span>
            </div>
            <div className="py-2 flex items-center justify-between">
              <span className="text-ink">Aboard vessel</span>
              <span className="text-ice">8</span>
            </div>
            <div className="py-2 flex items-center justify-between">
              <span className="text-ink">Overdue check-in</span>
              <span className="text-rust">1</span>
            </div>
            <div className="py-2 flex items-center justify-between">
              <span className="text-inkmuted">Solo beyond radius</span>
              <span className="text-rust">0</span>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
