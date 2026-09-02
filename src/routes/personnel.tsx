import { createFileRoute } from "@tanstack/react-router";
import { Panel, Stat, Row } from "@/components/ops/Panel";

export const Route = createFileRoute("/personnel")({
  head: () => ({
    meta: [
      { title: "Personnel Movement — IAP Mission Control" },
      {
        name: "description",
        content:
          "Digital muster, field-party check-ins, buddy-system enforcement and certification expiry tracking across IAP stations and vessels.",
      },
      { property: "og:title", content: "Personnel Movement — IAP Mission Control" },
      {
        property: "og:description",
        content:
          "Track every person across station, ship and field camp with offline muster and health/certification status.",
      },
    ],
  }),
  component: Personnel,
});

function Personnel() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12">
        <Panel title="Muster board" meta="68 personnel · season 8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <Stat label="In station" value="55" tone="moss" />
            <Stat label="Field party" value="4" tone="gold" />
            <Stat label="Aboard vessel" value="8" tone="ice" />
            <Stat label="Overdue" value="1" tone="rust" />
            <Stat label="Solo beyond radius" value="0" tone="rust" />
          </div>
        </Panel>
      </div>

      <div className="col-span-12 lg:col-span-7">
        <Panel title="Movement log" meta="last transitions">
          <div className="divide-y divide-gold/12">
            <Row
              primary="D. Raman"
              secondary="Ice core camp → overdue window"
              status="overdue 19m"
              tone="rust"
            />
            <Row
              primary="Field party F-3 (4)"
              secondary="Maitri hut 2 → sector 7"
              status="departed 21:04"
              tone="gold"
            />
            <Row
              primary="A. Bose"
              secondary="MV Polar Dawn → Bharati"
              status="checked in"
              tone="moss"
            />
            <Row
              primary="K. Menon"
              secondary="Lab B → main block"
              status="checked in"
              tone="moss"
            />
            <Row
              primary="Team 2 (6)"
              secondary="Bharati → weather mast"
              status="returned"
              tone="ice"
            />
          </div>
        </Panel>
      </div>

      <div className="col-span-12 lg:col-span-5">
        <Panel title="Certifications & fitness" meta="expiry watch" className="h-full">
          <div className="divide-y divide-gold/12">
            <Row
              primary="Crevasse rescue"
              secondary="3 personnel expiring"
              status="41 d"
              tone="rust"
            />
            <Row
              primary="Fire fighting"
              secondary="Station-wide refresher"
              status="88 d"
              tone="gold"
            />
            <Row primary="Polar medicine" secondary="Medical officer" status="212 d" tone="moss" />
            <Row
              primary="Medical fitness review"
              secondary="Winter party"
              status="cleared"
              tone="moss"
            />
          </div>
        </Panel>
      </div>

      {/* Buddy-system check-in monitor */}
      <div className="col-span-12">
        <Panel title="Buddy-system monitor" meta="field parties · 2-person rule">
          <div className="divide-y divide-gold/12">
            <Row
              primary="D. Raman ↔ K. Nair"
              secondary="Ice core camp · pair F-4 · last ping 21:51"
              status="overdue 19m"
              tone="rust"
            />
            <Row
              primary="A. Singh ↔ P. Verma"
              secondary="Sector 7 · pair F-3A · check-in window open"
              status="due in 6m"
              tone="gold"
            />
            <Row
              primary="S. Iyer ↔ M. Das"
              secondary="Weather mast · B-team · 22:08"
              status="checked in"
              tone="moss"
            />
            <Row
              primary="T. Reddy ↔ C. Roy"
              secondary="Crevasse field · F-3B · 22:05"
              status="checked in"
              tone="moss"
            />
            <Row
              primary="A. Bose ↔ K. Menon"
              secondary="Station interior · exempted (building radius)"
              status="exempt"
              tone="ink"
            />
          </div>
        </Panel>
      </div>

      <div className="col-span-12">
        <Panel title="Next-of-kin portal" meta="read-only · no precise location">
          <p className="text-sm text-ink/85 leading-snug max-w-3xl">
            Families see a last-known-safe status only, refreshed on each successful uplink. Health
            records and field coordinates are withheld under DPDP 2023 handling rules and never
            leave the encrypted station store unredacted.
          </p>
          <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
            <Stat label="Statuses published" value="67" tone="moss" />
            <Stat label="Withheld (active event)" value="1" tone="rust" />
            <Stat label="Last publish" value="02:11" tone="ice" />
            <Stat label="Viewer accounts" value="132" />
          </div>
        </Panel>
      </div>
    </div>
  );
}
