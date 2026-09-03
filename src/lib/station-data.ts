/**
 * Shared station telemetry data — single source of truth used by both
 * the flat 2-D dashboard (index.tsx) and the 3-D spatial view (station-3d.tsx).
 *
 * In a real deployment this would come from your sync-agent REST / GraphQL
 * endpoint; for the SIH demo it is static-but-realistic mock data.
 */

export type LinkStatus = "vsat" | "iridium" | "offline";
export type AlertLevel = "ok" | "warn" | "critical";

export interface BuildingData {
  id: string;
  label: string;
  /** Short description shown in the 3-D tooltip */
  desc: string;
  /** 0–100 health score driving colour + pulse rate */
  health: number;
  alertLevel: AlertLevel;
  /** grid position in the 3-D layout [x, z] */
  pos: [number, number];
  /** relative height multiplier */
  height: number;
}

export interface StationData {
  id: string;
  name: string;
  coords: string;
  link: LinkStatus;
  muster: number;
  musterTotal: number;
  overdueCheckin: number;
  activeEmergency: boolean;
  emergencyDesc?: string;
  fuelDays: number;
  rationDays: number;
  medDays: number;
  fuelPct: number;
  rationPct: number;
  medPct: number;
  buildings: BuildingData[];
}

// ─── health helpers ────────────────────────────────────────────────────────────
function level(h: number): AlertLevel {
  return h < 35 ? "critical" : h < 60 ? "warn" : "ok";
}

// ─── Bharati Station (70°S 11°E) ──────────────────────────────────────────────
const BHARATI: StationData = {
  id: "bharati",
  name: "Bharati",
  coords: "70°S 11°E",
  link: "vsat",
  muster: 38,
  musterTotal: 41,
  overdueCheckin: 0,
  activeEmergency: false,
  fuelDays: 212,
  rationDays: 148,
  medDays: 82,
  fuelPct: 88,
  rationPct: 62,
  medPct: 55,
  buildings: [
    { id: "bh-main",  label: "Main Habitat",   desc: "Living quarters, comms centre, ops room",    health: 91, alertLevel: level(91), pos: [0, 0],     height: 1.6 },
    { id: "bh-gen",   label: "Generator Hall", desc: "Diesel gensets, UPS, power distribution",   health: 88, alertLevel: level(88), pos: [-3.5, 0],  height: 1.1 },
    { id: "bh-fuel",  label: "Fuel Store",     desc: "Diesel reserves — 212 days remaining",      health: 88, alertLevel: level(88), pos: [-3.5, 2.5],height: 0.8 },
    { id: "bh-lab",   label: "Science Lab",    desc: "Atmospheric, glaciological research",        health: 79, alertLevel: level(79), pos: [3.2, -1],  height: 1.0 },
    { id: "bh-med",   label: "Medical Bay",    desc: "Station clinic — supplies 82 days",         health: 55, alertLevel: level(55), pos: [3.2, 1.8], height: 0.9 },
    { id: "bh-stor",  label: "Dry Stores",     desc: "Rations, spares, PPE — 148 days",           health: 62, alertLevel: level(62), pos: [0, 2.8],   height: 0.8 },
    { id: "bh-comms", label: "VSAT Tower",     desc: "VSAT link UP · 46 kbps",                    health: 94, alertLevel: level(94), pos: [-1.2, -2.8],height: 2.2 },
    { id: "bh-vehi",  label: "Vehicle Bay",    desc: "Snow-cats, skidoos, field transport",       health: 73, alertLevel: level(73), pos: [1.8, -3],   height: 0.9 },
  ],
};

// ─── Maitri Station (74°S 163°E) ─────────────────────────────────────────────
const MAITRI: StationData = {
  id: "maitri",
  name: "Maitri",
  coords: "74°S 163°E",
  link: "iridium",
  muster: 27,
  musterTotal: 27,
  overdueCheckin: 1,
  activeEmergency: true,
  emergencyDesc: "Crevasse fall — field party F-3, sector 7. Two stable. EVAC-SOP-04 T+00:12.",
  fuelDays: 186,
  rationDays: 121,
  medDays: 31,
  fuelPct: 77,
  rationPct: 50,
  medPct: 24,
  buildings: [
    { id: "mt-main",  label: "Main Habitat",   desc: "Living quarters · 1 overdue check-in",      health: 68, alertLevel: level(68), pos: [0, 0],     height: 1.5 },
    { id: "mt-gen",   label: "Generator Hall", desc: "Diesel gensets, power dist",                health: 81, alertLevel: level(81), pos: [-3.2, 0],  height: 1.0 },
    { id: "mt-fuel",  label: "Fuel Store",     desc: "Diesel reserves — 186 days remaining",     health: 77, alertLevel: level(77), pos: [-3.2, 2.5],height: 0.8 },
    { id: "mt-lab",   label: "Science Lab",    desc: "Ice core, geological sampling",             health: 74, alertLevel: level(74), pos: [3, -1],    height: 1.0 },
    { id: "mt-med",   label: "Medical Bay",    desc: "⚠ REORDER — only 31 days of supplies",     health: 24, alertLevel: level(24), pos: [3, 1.8],   height: 0.9 },
    { id: "mt-stor",  label: "Dry Stores",     desc: "Rations, spares — 121 days",               health: 50, alertLevel: level(50), pos: [0, 2.8],   height: 0.8 },
    { id: "mt-emg",   label: "Emergency Ops",  desc: "🔴 ACTIVE: EVAC-SOP-04 · crevasse fall",   health: 12, alertLevel: level(12), pos: [1.5, -1.5],height: 1.1 },
    { id: "mt-comms", label: "Iridium Mast",   desc: "VSAT DOWN — Iridium SBD only",             health: 42, alertLevel: level(42), pos: [-1, -2.8], height: 2.0 },
  ],
};

export const STATIONS: StationData[] = [BHARATI, MAITRI];

// ─── colour palette (mirrors CSS tokens) ──────────────────────────────────────
export const PALETTE = {
  ground:    "#10141c",
  panel:     "#161c27",
  gold:      "#c6a15a",
  goldlight: "#e7d3a0",
  ice:       "#9cc6dc",
  rust:      "#c15a44",
  moss:      "#6f9a76",
  ink:       "#d9dde4",
  inkmuted:  "#8b93a1",
} as const;
