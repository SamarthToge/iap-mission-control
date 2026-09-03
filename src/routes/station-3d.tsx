/**
 * /station-3d — 3D Spatial Station Monitor
 *
 * Full-screen immersive view for Goa HQ operators:
 * - Left sidebar: station selector, supply vitals, building index
 * - Right: React Three Fiber canvas with pulsing 3-D buildings, comms
 *   antenna, emergency beacon, star field, and orbit controls.
 *
 * Buildings pulse RED when health < 35, AMBER when < 60, GREEN when healthy.
 * Emergency beacon activates a vertical rust-red pillar over the station.
 */

import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { LayoutDashboard, Maximize2 } from "lucide-react";
import { STATIONS } from "@/lib/station-data";
import type { BuildingData, StationData } from "@/lib/station-data";
import { StationScene } from "@/components/three/StationScene";
import { StationSidebar } from "@/components/three/StationSidebar";

export const Route = createFileRoute("/station-3d")({
  head: () => ({
    meta: [
      { title: "3-D Station Monitor — IAP Mission Control" },
      {
        name: "description",
        content:
          "Immersive 3-D digital twin of Bharati and Maitri Antarctic stations. Buildings pulse red on critical health or energy metrics.",
      },
      { property: "og:title", content: "3-D Station Monitor — IAP Mission Control" },
    ],
  }),
  component: StationMonitor3D,
});

function StationMonitor3D() {
  const [activeStationId, setActiveStationId] = useState<string>(STATIONS[0]!.id);
  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(null);

  // Safe: state always holds a valid station id from STATIONS
  const activeStation: StationData = STATIONS.find((s) => s.id === activeStationId)!;

  const selectedBuilding: BuildingData | null = selectedBuildingId
    ? (activeStation.buildings.find((b) => b.id === selectedBuildingId) ?? null)
    : null;

  function handleStationChange(id: string) {
    setActiveStationId(id);
    setSelectedBuildingId(null);
  }

  const linkColors: Record<string, string> = {
    vsat: "#9cc6dc",
    iridium: "#c6a15a",
    offline: "#c15a44",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        background: "#10141c",
        fontFamily: "IBM Plex Sans, sans-serif",
      }}
    >
      {/* ── Top bar ── */}
      <div
        style={{
          borderBottom: "1px solid rgba(198,161,90,0.2)",
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(22,28,39,0.85)",
          backdropFilter: "blur(6px)",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Back to dashboard */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "IBM Plex Mono, monospace",
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#8b93a1",
              textDecoration: "none",
              padding: "4px 8px",
              border: "1px solid rgba(198,161,90,0.2)",
            }}
          >
            <LayoutDashboard size={10} />
            HQ Overview
          </Link>

          <div
            style={{
              fontFamily: "Cormorant Garamond, Georgia, serif",
              fontSize: 18,
              color: "#e7d3a0",
              lineHeight: 1,
            }}
          >
            {activeStation.name} · 3-D Station Monitor
          </div>

          <span
            style={{
              fontFamily: "IBM Plex Mono, monospace",
              fontSize: 9,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#8b93a1",
            }}
          >
            {activeStation.coords}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Link status pill */}
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontFamily: "IBM Plex Mono, monospace",
              fontSize: 9,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: linkColors[activeStation.link],
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: linkColors[activeStation.link],
                display: "inline-block",
                animation: "pulse-telem 2.4s ease-in-out infinite",
              }}
            />
            {activeStation.link === "vsat"
              ? "VSAT up"
              : activeStation.link === "iridium"
                ? "Iridium only"
                : "Link down"}
          </span>

          {/* Emergency indicator */}
          {activeStation.activeEmergency && (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "IBM Plex Mono, monospace",
                fontSize: 9,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#c15a44",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#c15a44",
                  display: "inline-block",
                  animation: "pulse-telem 0.8s ease-in-out infinite",
                }}
              />
              Active Emergency
            </span>
          )}

          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontFamily: "IBM Plex Mono, monospace",
              fontSize: 9,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#8b93a1",
            }}
          >
            <Maximize2 size={10} />
            Drag · Scroll · Click
          </span>
        </div>
      </div>

      {/* ── Main body: sidebar + canvas ── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Sidebar */}
        <StationSidebar
          stations={STATIONS}
          activeStation={activeStation}
          onStationChange={handleStationChange}
          selectedBuilding={selectedBuilding}
          onBuildingSelect={setSelectedBuildingId}
        />

        {/* 3-D Canvas */}
        <div style={{ flex: 1, position: "relative" }}>
          <StationScene
            station={activeStation}
            selectedId={selectedBuildingId}
            onSelect={setSelectedBuildingId}
          />

          {/* Bottom-right legend */}
          <div
            style={{
              position: "absolute",
              bottom: 16,
              right: 16,
              background: "rgba(22,28,39,0.82)",
              border: "1px solid rgba(198,161,90,0.2)",
              padding: "8px 12px",
              fontFamily: "IBM Plex Mono, monospace",
              fontSize: 9,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              display: "flex",
              flexDirection: "column",
              gap: 5,
              backdropFilter: "blur(4px)",
            }}
          >
            <span style={{ color: "#8b93a1", marginBottom: 2 }}>Health legend</span>
            {[
              { color: "#6f9a76", label: "OK  (≥ 60%)" },
              { color: "#c6a15a", label: "WARN (35–59%)" },
              { color: "#c15a44", label: "CRITICAL (< 35%)" },
            ].map(({ color, label }) => (
              <span
                key={label}
                style={{ display: "flex", alignItems: "center", gap: 6, color: "#d9dde4" }}
              >
                <span
                  style={{ width: 8, height: 8, background: color, display: "inline-block" }}
                />
                {label}
              </span>
            ))}
          </div>

          {/* Top-right badge */}
          <div
            style={{
              position: "absolute",
              top: 12,
              right: 16,
              background: "rgba(22,28,39,0.75)",
              border: "1px solid rgba(198,161,90,0.2)",
              padding: "4px 10px",
              fontFamily: "IBM Plex Mono, monospace",
              fontSize: 9,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#8b93a1",
            }}
          >
            {activeStation.buildings.length} structures · digital twin
          </div>
        </div>
      </div>
    </div>
  );
}
