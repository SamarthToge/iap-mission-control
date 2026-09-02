import { createFileRoute } from "@tanstack/react-router";
import { Panel, Row, Check } from "@/components/ops/Panel";

export const Route = createFileRoute("/emergency")({
  head: () => ({
    meta: [
      { title: "Emergency Response — IAP Mission Control" },
      {
        name: "description",
        content:
          "Local-first alert engine, offline SOP checklists and incident logs for Antarctic stations — works with zero satellite connectivity.",
      },
      { property: "og:title", content: "Emergency Response — IAP Mission Control" },
      {
        property: "og:description",
        content:
          "Offline alert engine, SOP checklists, response teams and incident logging for IAP stations.",
      },
    ],
  }),
  component: Emergency,
});

function Emergency() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 lg:col-span-7">
        <div className="border border-rust/50 bg-panel2">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-rust/40">
            <span className="flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-rust">
              <span className="size-2 rounded-full bg-rust telem" />
              EMG-2418 · Crevasse fall · Maitri
            </span>
            <span className="font-mono text-[10px] tracking-[0.1em] text-inkmuted">
              EVAC-SOP-04 · T+00:12
            </span>
          </div>
          <div className="p-4">
            <p className="text-sm text-ink leading-snug">
              Field party F-3, sector 7. Two personnel stable, one immobilised. Alert raised by
              missed check-in rule at 00:00 local; siren and PA triggered on the edge node without
              satellite dependency.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 font-mono text-[11px]">
              <Check state="done" label="Alert fired locally 00:00" />
              <Check state="done" label="Response team dispatched" />
              <Check state="done" label="HF radio relay established" />
              <Check state="active" label="Crevasse rig deployed" />
              <Check state="todo" label="Medical review (tele)" />
              <Check state="todo" label="Statutory incident report" />
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-5">
        <Panel title="Alert channels" meta="priority queue" className="h-full">
          <div className="divide-y divide-gold/12">
            <Row
              primary="Station siren / PA"
              secondary="Edge node GPIO"
              status="firing"
              tone="rust"
            />
            <Row
              primary="HF radio bridge"
              secondary="Human-in-loop relay"
              status="open"
              tone="moss"
            />
            <Row
              primary="Iridium SBD burst"
              secondary="340 B payload queued"
              status="next pass"
              tone="gold"
            />
            <Row
              primary="VSAT bulk sync"
              secondary="Routine deltas held"
              status="deferred"
              tone="ink"
            />
          </div>
        </Panel>
      </div>

      <div className="col-span-12 lg:col-span-5">
        <Panel title="SOP library" meta="offline preloaded" className="h-full">
          <div className="divide-y divide-gold/12">
            <Row
              primary="EVAC-SOP-04"
              secondary="Crevasse fall & extraction"
              status="active"
              tone="rust"
            />
            <Row primary="MED-SOP-11" secondary="Trauma / hypothermia" status="ready" tone="ink" />
            <Row
              primary="FIRE-SOP-02"
              secondary="Structural fire, generator hall"
              status="ready"
              tone="ink"
            />
            <Row
              primary="SAR-SOP-07"
              secondary="Overdue field party search"
              status="ready"
              tone="ink"
            />
            <Row primary="CO-SOP-03" secondary="CO / gas detection" status="ready" tone="ink" />
          </div>
        </Panel>
      </div>

      <div className="col-span-12 lg:col-span-7">
        <Panel title="Incident log" meta="append-only · hash-chained">
          <div className="divide-y divide-gold/12">
            <Row
              primary="00:12 · Rig deployed, anchors set"
              secondary="Logged by S. Iyer"
              status="synced"
              tone="moss"
            />
            <Row
              primary="00:07 · Response team departed hut 2"
              secondary="Logged by Station Leader"
              status="synced"
              tone="moss"
            />
            <Row
              primary="00:03 · Vitals recorded, patient A stable"
              secondary="Store-and-forward telemedicine"
              status="queued"
              tone="gold"
            />
            <Row
              primary="00:00 · Missed check-in trigger"
              secondary="Automated · edge rule engine"
              status="synced"
              tone="moss"
            />
          </div>
        </Panel>
      </div>
    </div>
  );
}
