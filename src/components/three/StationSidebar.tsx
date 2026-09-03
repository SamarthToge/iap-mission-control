/**
 * StationSidebar — the 2-D data overlay beside the 3-D canvas.
 *
 * Shows:
 *  - Station selector tabs
 *  - Station vitals (link, muster, supply days)
 *  - Selected building detail panel
 *  - Emergency alert panel (when active)
 *  - Building index (click to select from list)
 */

import type { BuildingData, StationData } from "@/lib/station-data";

const TONE = {
  critical: { text: "#c15a44", border: "rgba(193,90,68,0.4)", label: "CRITICAL" },
  warn:     { text: "#c6a15a", border: "rgba(198,161,90,0.4)", label: "WARN" },
  ok:       { text: "#6f9a76", border: "rgba(111,154,118,0.4)", label: "OK" },
} as const;

interface Props {
  stations: StationData[];
  activeStation: StationData;
  onStationChange: (id: string) => void;
  selectedBuilding: BuildingData | null;
  onBuildingSelect: (id: string | null) => void;
}

function HealthBar({ pct, tone }: { pct: number; tone: "ok" | "warn" | "critical" }) {
  const colors = { ok: "#6f9a76", warn: "#c6a15a", critical: "#c15a44" };
  return (
    <div style={{ height: 4, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(198,161,90,0.15)", marginTop: 4 }}>
      <div style={{ height: "100%", width: `${pct}%`, background: colors[tone], transition: "width 0.6s" }} />
    </div>
  );
}

function Stat({ label, value, tone = "ink" }: { label: string; value: string; tone?: "ink" | "ice" | "rust" | "moss" | "gold" }) {
  const colors = { ink: "#d9dde4", ice: "#9cc6dc", rust: "#c15a44", moss: "#6f9a76", gold: "#e7d3a0" };
  return (
    <div style={{ border: "1px solid rgba(198,161,90,0.15)", padding: "8px 10px" }}>
      <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 8, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8b93a1", marginBottom: 4 }}>{label}</div>
      <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 15, color: colors[tone] }}>{value}</div>
    </div>
  );
}

export function StationSidebar({
  stations,
  activeStation,
  onStationChange,
  selectedBuilding,
  onBuildingSelect,
}: Props) {
  const linkColors: Record<string, string> = { vsat: "#9cc6dc", iridium: "#c6a15a", offline: "#c15a44" };
  const linkLabels: Record<string, string> = { vsat: "VSAT up", iridium: "Iridium only", offline: "Link down" };

  return (
    <div
      style={{
        width: 280,
        flexShrink: 0,
        background: "#161c27",
        border: "1px solid rgba(198,161,90,0.2)",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        fontFamily: "IBM Plex Sans, sans-serif",
        fontSize: 12,
        color: "#d9dde4",
      }}
    >
      {/* ── Station selector tabs ── */}
      <div style={{ display: "flex", borderBottom: "1px solid rgba(198,161,90,0.2)" }}>
        {stations.map((s) => {
          const active = s.id === activeStation.id;
          return (
            <button
              key={s.id}
              onClick={() => onStationChange(s.id)}
              style={{
                flex: 1,
                padding: "10px 6px",
                background: active ? "rgba(198,161,90,0.08)" : "transparent",
                color: active ? "#e7d3a0" : "#8b93a1",
                fontFamily: "IBM Plex Mono, monospace",
                fontSize: 10,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
                borderBottom: active ? "2px solid #c6a15a" : "2px solid transparent",
              }}
            >
              {s.name}
            </button>
          );
        })}
      </div>

      {/* ── Station vitals ── */}
      <div style={{ padding: "14px 12px", borderBottom: "1px solid rgba(198,161,90,0.15)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "#8b93a1" }}>
            {activeStation.coords}
          </span>
          <span style={{
            display: "flex", alignItems: "center", gap: 5,
            fontFamily: "IBM Plex Mono, monospace", fontSize: 9,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: linkColors[activeStation.link],
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: linkColors[activeStation.link],
              animation: "pulse-telem 2.4s ease-in-out infinite",
            }} />
            {linkLabels[activeStation.link]}
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
          <Stat label="Muster" value={`${activeStation.muster}/${activeStation.musterTotal}`}
            tone={activeStation.overdueCheckin > 0 ? "rust" : "moss"} />
          <Stat label="Fuel d" value={`${activeStation.fuelDays}`}
            tone={activeStation.fuelPct < 35 ? "rust" : activeStation.fuelPct < 60 ? "gold" : "ice"} />
          <Stat label="Med d" value={`${activeStation.medDays}`}
            tone={activeStation.medDays < 40 ? "rust" : activeStation.medDays < 80 ? "gold" : "moss"} />
        </div>

        {/* Supply bars */}
        <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            { label: "Fuel", pct: activeStation.fuelPct, days: activeStation.fuelDays },
            { label: "Rations", pct: activeStation.rationPct, days: activeStation.rationDays },
            { label: "Medical", pct: activeStation.medPct, days: activeStation.medDays },
          ].map(({ label, pct, days }) => (
            <div key={label}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2, fontFamily: "IBM Plex Mono, monospace", fontSize: 9, color: "#8b93a1", letterSpacing: "0.08em" }}>
                <span>{label}</span>
                <span>{days} d · {pct}%</span>
              </div>
              <HealthBar
                pct={pct}
                tone={pct < 35 ? "critical" : pct < 60 ? "warn" : "ok"}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Active emergency panel ── */}
      {activeStation.activeEmergency && (
        <div style={{
          margin: "12px 12px 0",
          padding: "10px 12px",
          border: "1px solid rgba(193,90,68,0.45)",
          background: "rgba(193,90,68,0.06)",
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            fontFamily: "IBM Plex Mono, monospace", fontSize: 9,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: "#c15a44", marginBottom: 8,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#c15a44", animation: "pulse-telem 0.8s ease-in-out infinite" }} />
            Active Emergency
          </div>
          <p style={{ fontSize: 11, lineHeight: 1.5, color: "#d9dde4", margin: 0 }}>
            {activeStation.emergencyDesc}
          </p>
        </div>
      )}

      {/* ── Selected building detail ── */}
      {selectedBuilding ? (
        <div style={{ margin: "12px 12px 0", padding: "10px 12px", border: `1px solid ${TONE[selectedBuilding.alertLevel].border}`, background: "rgba(22,28,39,0.7)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: TONE[selectedBuilding.alertLevel].text }}>
              {TONE[selectedBuilding.alertLevel].label} · {selectedBuilding.health}%
            </span>
            <button
              onClick={() => onBuildingSelect(null)}
              style={{ background: "none", border: "none", color: "#8b93a1", cursor: "pointer", fontSize: 14, lineHeight: 1, padding: 0 }}
            >
              ×
            </button>
          </div>
          <h3 style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: 17, color: "#e7d3a0", margin: "0 0 6px" }}>
            {selectedBuilding.label}
          </h3>
          <p style={{ fontSize: 11, lineHeight: 1.55, color: "#8b93a1", margin: 0 }}>
            {selectedBuilding.desc}
          </p>
          {/* Health bar */}
          <div style={{ marginTop: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "IBM Plex Mono, monospace", fontSize: 9, color: "#8b93a1", marginBottom: 3 }}>
              <span>Health score</span><span>{selectedBuilding.health} / 100</span>
            </div>
            <HealthBar pct={selectedBuilding.health} tone={selectedBuilding.alertLevel} />
          </div>
        </div>
      ) : (
        <div style={{ margin: "12px 12px 0", padding: "8px 12px", border: "1px solid rgba(198,161,90,0.12)", background: "rgba(22,28,39,0.4)" }}>
          <p style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8b93a1", margin: 0 }}>
            Click a building to inspect
          </p>
        </div>
      )}

      {/* ── Building index ── */}
      <div style={{ margin: "12px 12px", borderTop: "1px solid rgba(198,161,90,0.15)", paddingTop: 10 }}>
        <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "#8b93a1", marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
          <span>Buildings</span>
          <span style={{ color: "#c6a15a" }}>{activeStation.buildings.length}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {activeStation.buildings.map((b) => {
            const t = TONE[b.alertLevel];
            const isSelected = selectedBuilding?.id === b.id;
            return (
              <button
                key={b.id}
                onClick={() => onBuildingSelect(isSelected ? null : b.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "6px 8px",
                  background: isSelected ? "rgba(198,161,90,0.08)" : "transparent",
                  border: isSelected ? "1px solid rgba(198,161,90,0.3)" : "1px solid transparent",
                  borderLeft: `2px solid ${t.text}`,
                  cursor: "pointer",
                  textAlign: "left",
                  width: "100%",
                }}
              >
                <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 10, color: isSelected ? "#e7d3a0" : "#d9dde4" }}>
                  {b.label}
                </span>
                <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: 9, color: t.text }}>
                  {b.health}%
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
