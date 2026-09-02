import { createFileRoute } from "@tanstack/react-router";
import { Panel, Row, Stat, Check } from "@/components/ops/Panel";

export const Route = createFileRoute("/expedition")({
  head: () => ({
    meta: [
      { title: "Expedition Planning — IAP Mission Control" },
      {
        name: "description",
        content:
          "Season planning for the Indian Antarctic Programme: team composition, itineraries, resource requests, risk register and multi-level approvals.",
      },
      { property: "og:title", content: "Expedition Planning — IAP Mission Control" },
      {
        property: "og:description",
        content:
          "Plan teams, schedules, resources and approvals for Antarctic expeditions from NCPOR.",
      },
    ],
  }),
  component: Expedition,
});

function Expedition() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 lg:col-span-7">
        <Panel title="Expedition 44 · Season 8" meta="winter ops">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Stat label="Team" value="68" />
            <Stat label="Legs" value="5" tone="ice" />
            <Stat label="Open requests" value="9" tone="gold" />
            <Stat label="Risk items" value="3" tone="rust" />
          </div>
        </Panel>
      </div>

      <div className="col-span-12 lg:col-span-5">
        <Panel title="Approval chain" meta="digital sign-off" className="h-full">
          <div className="grid grid-cols-1 gap-1.5 font-mono text-[11px]">
            <Check state="done" label="Team Leader · signed 14 Jun" />
            <Check state="done" label="NCPOR Director · signed 02 Jul" />
            <Check state="active" label="MoES clearance · in review" />
            <Check state="todo" label="Budget release" />
          </div>
        </Panel>
      </div>

      <div className="col-span-12 lg:col-span-7">
        <Panel title="Itinerary" meta="ship, station, field">
          <div className="divide-y divide-gold/12">
            <Row
              primary="Vessel departure · Goa"
              secondary="MV Polar Dawn"
              status="complete"
              tone="moss"
            />
            <Row
              primary="Bharati handover"
              secondary="Summer → winter party"
              status="complete"
              tone="moss"
            />
            <Row
              primary="Field traverse · sector 7"
              secondary="Weather window 4 d"
              status="active"
              tone="gold"
            />
            <Row
              primary="Maitri resupply"
              secondary="Air leg · IAF C-295"
              status="planned"
              tone="ice"
            />
            <Row primary="Return voyage" secondary="Mar 2026" status="planned" tone="ink" />
          </div>
        </Panel>
      </div>

      <div className="col-span-12 lg:col-span-5">
        <Panel title="Risk register" meta="feeds emergency module" className="h-full">
          <div className="divide-y divide-gold/12">
            <Row
              primary="Crevasse field · sector 7"
              secondary="Roped travel mandatory"
              status="high"
              tone="rust"
            />
            <Row
              primary="Blizzard window"
              secondary="Katabatic 60 kt forecast"
              status="medium"
              tone="gold"
            />
            <Row
              primary="Medical stock buffer"
              secondary="Below winter threshold"
              status="high"
              tone="rust"
            />
            <Row
              primary="Generator hall fuel line"
              secondary="Inspection due"
              status="low"
              tone="ice"
            />
          </div>
        </Panel>
      </div>

      <div className="col-span-12">
        <Panel title="Resource requests" meta="linked to inventory">
          <div className="divide-y divide-gold/12">
            <Row
              primary="Crevasse rescue kit ×2"
              secondary="Field ops · stock available"
              status="approved"
              tone="moss"
            />
            <Row
              primary="Trauma consumables"
              secondary="Medical · stock below buffer"
              status="escalated"
              tone="rust"
            />
            <Row
              primary="Ice core drill spares"
              secondary="Science · on C-8841"
              status="in transit"
              tone="ice"
            />
            <Row
              primary="Solar array controller"
              secondary="Engineering · quote stage"
              status="pending"
              tone="gold"
            />
          </div>
        </Panel>
      </div>
    </div>
  );
}
