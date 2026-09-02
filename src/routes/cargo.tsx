import { createFileRoute } from "@tanstack/react-router";
import { Panel, Row, Stat, Check } from "@/components/ops/Panel";

export const Route = createFileRoute("/cargo")({
  head: () => ({
    meta: [
      { title: "Cargo Tracking — IAP Mission Control" },
      {
        name: "description",
        content:
          "Chain-of-custody tracking from Indian port to Antarctic station: shipment legs, RFID scan events, customs and cold-chain alerts.",
      },
      { property: "og:title", content: "Cargo Tracking — IAP Mission Control" },
      {
        property: "og:description",
        content:
          "Consignments, scan events and manifest reconciliation across ship, air and station handover.",
      },
    ],
  }),
  component: Cargo,
});

function Cargo() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 lg:col-span-7">
        <Panel title="Consignments" meta="3 legs in transit">
          <div className="divide-y divide-gold/12">
            <Row
              primary="C-8841 · MV Polar Dawn"
              secondary="Chennai → Bharati · AIS live"
              status="at sea"
              tone="ice"
            />
            <Row
              primary="C-8842 · IAF C-295"
              secondary="Goa → Maitri · DGCA cleared"
              status="staged"
              tone="moss"
            />
            <Row
              primary="C-8839 · Cold chain"
              secondary="Samples · 2°C nominal"
              status="ETA 3d"
              tone="gold"
            />
            <Row
              primary="C-8836 · Fuel drums ×220"
              secondary="Delivered · store 1"
              status="received"
              tone="moss"
            />
          </div>
        </Panel>
      </div>

      <div className="col-span-12 lg:col-span-5">
        <Panel title="Cold chain" meta="sensor breach watch" className="h-full">
          <div className="grid grid-cols-2 gap-3">
            <Stat label="Loggers active" value="14" tone="ice" />
            <Stat label="Breaches 24h" value="1" tone="rust" />
            <Stat label="Mean temp" value="2.1°C" tone="moss" />
            <Stat label="Offline buffered" value="6h" tone="gold" />
          </div>
          <p className="mt-3 text-[11px] text-ink/80 leading-snug">
            Breach alerts raise locally at the station gateway even when the link is down, then jump
            the sync queue behind emergency traffic.
          </p>
        </Panel>
      </div>

      <div className="col-span-12 lg:col-span-7">
        <Panel title="Scan events · C-8841" meta="chain of custody">
          <div className="divide-y divide-gold/12">
            <Row
              primary="Loaded · Chennai port"
              secondary="RFID gate 3 · 412 items"
              status="verified"
              tone="moss"
            />
            <Row primary="Customs cleared" secondary="Docs CD-1182" status="verified" tone="moss" />
            <Row
              primary="Ship manifest sealed"
              secondary="Hold 2 · master signoff"
              status="verified"
              tone="moss"
            />
            <Row
              primary="Station unload"
              secondary="Pending ice conditions"
              status="awaiting"
              tone="gold"
            />
          </div>
        </Panel>
      </div>

      <div className="col-span-12 lg:col-span-5">
        <Panel title="Reconciliation" meta="manifest vs scanned" className="h-full">
          <div className="grid grid-cols-1 gap-1.5 font-mono text-[11px]">
            <Check state="done" label="Manifest imported · 412 items" />
            <Check state="done" label="Loading scans matched · 412" />
            <Check state="active" label="Receipt scans in progress · 188" />
            <Check state="todo" label="Discrepancy review & signoff" />
          </div>
        </Panel>
      </div>
    </div>
  );
}
