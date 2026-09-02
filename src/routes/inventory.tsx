import { createFileRoute } from "@tanstack/react-router";
import { Panel, Gauge, Row, Stat } from "@/components/ops/Panel";

export const Route = createFileRoute("/inventory")({
  head: () => ({
    meta: [
      { title: "Inventory Stores — IAP Mission Control" },
      {
        name: "description",
        content:
          "Event-sourced stock ledgers for fuel, rations, spares and medical supplies with winter-buffer and burn-rate projections.",
      },
      { property: "og:title", content: "Inventory Stores — IAP Mission Control" },
      {
        property: "og:description",
        content:
          "Append-only stock transactions, expiry batches and reorder triggers that merge losslessly after offline periods.",
      },
    ],
  }),
  component: Inventory,
});

function Inventory() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 lg:col-span-7">
        <Panel title="Days-of-supply · Bharati" meta="burn-rate ledger">
          <div className="space-y-3">
            <Gauge label="Fuel (diesel)" value="212 d" pct={88} tone="ice" />
            <Gauge label="Rations" value="148 d" pct={62} tone="moss" />
            <Gauge label="Medical" value="31 d · reorder" pct={24} tone="rust" />
            <Gauge label="Spares (mech)" value="96 d" pct={44} tone="gold" />
          </div>
        </Panel>
      </div>

      <div className="col-span-12 lg:col-span-5">
        <Panel title="Winter buffer" meta="9-month isolation" className="h-full">
          <div className="grid grid-cols-2 gap-3">
            <Stat label="Buffer met" value="6" tone="moss" />
            <Stat label="At risk" value="2" tone="gold" />
            <Stat label="Breached" value="1" tone="rust" />
            <Stat label="Reorder drafts" value="4" tone="ice" />
          </div>
          <p className="mt-3 text-[11px] text-ink/80 leading-snug">
            Buffer calculator projects consumption to first resupply window and flags any line that
            cannot survive the dark season.
          </p>
        </Panel>
      </div>

      <div className="col-span-12 lg:col-span-7">
        <Panel title="Stock transactions" meta="append-only ledger">
          <div className="divide-y divide-gold/12">
            <Row
              primary="ISSUE · Diesel 400 L"
              secondary="Generator hall · scanned"
              status="+ledger"
              tone="ice"
            />
            <Row
              primary="RECEIPT · Trauma kit ×4"
              secondary="From C-8839"
              status="+ledger"
              tone="moss"
            />
            <Row
              primary="ISSUE · Rations pack ×12"
              secondary="Field party F-3"
              status="+ledger"
              tone="ink"
            />
            <Row
              primary="RETURN · Crevasse rig"
              secondary="Store 1 · rack B"
              status="+ledger"
              tone="ink"
            />
            <Row
              primary="ADJUST · Reagents batch R-19"
              secondary="Expiry write-off"
              status="+ledger"
              tone="rust"
            />
          </div>
        </Panel>
      </div>

      <div className="col-span-12 lg:col-span-5">
        <Panel title="Expiry batches" meta="next 120 days" className="h-full">
          <div className="divide-y divide-gold/12">
            <Row primary="Antibiotics B-221" secondary="Medical store" status="18 d" tone="rust" />
            <Row primary="Dairy powder D-08" secondary="Cold store" status="47 d" tone="gold" />
            <Row primary="Reagents R-24" secondary="Lab B" status="83 d" tone="ice" />
            <Row primary="Ration pack P-77" secondary="Warehouse 2" status="119 d" tone="moss" />
          </div>
        </Panel>
      </div>
    </div>
  );
}
