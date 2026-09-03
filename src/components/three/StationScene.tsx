/**
 * StationScene — the full R3F Canvas scene for one Antarctic station.
 *
 * Contains:
 *  - Environment lighting (polar-night ambience)
 *  - GroundPlane
 *  - BuildingBlock for each building
 *  - CommsAntenna wired to link status
 *  - EmergencyBeacon (only when activeEmergency)
 *  - OrbitControls with restricted polar angle (no underground view)
 *  - Camera auto-positioning per station
 */

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Preload } from "@react-three/drei";
import type { StationData } from "@/lib/station-data";
import { BuildingBlock } from "./BuildingBlock";
import { GroundPlane } from "./GroundPlane";
import { CommsAntenna } from "./CommsAntenna";
import { EmergencyBeacon } from "./EmergencyBeacon";

interface Props {
  station: StationData;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

function SceneContent({ station, selectedId, onSelect }: Props) {
  return (
    <>
      {/* Lighting rig — deep polar night ambiance */}
      <ambientLight intensity={0.18} color="#2a3a55" />
      <directionalLight
        position={[6, 10, 4]}
        intensity={0.9}
        color="#c6a15a"
        castShadow
      />
      <directionalLight position={[-8, 4, -4]} intensity={0.3} color="#9cc6dc" />
      <pointLight position={[0, 8, 0]} intensity={0.5} color="#1c2331" />

      {/* Background star field */}
      <Stars
        radius={60}
        depth={50}
        count={1800}
        factor={3}
        saturation={0.2}
        fade
        speed={0.3}
      />

      {/* Ground */}
      <GroundPlane size={20} />

      {/* Buildings */}
      {station.buildings.map((b) => (
        <BuildingBlock
          key={b.id}
          data={b}
          selected={selectedId === b.id}
          onSelect={(id) => onSelect(selectedId === id ? null : id)}
        />
      ))}

      {/* Comms antenna — placed at centre-front */}
      <CommsAntenna link={station.link} position={[0, 0, -6]} />

      {/* Emergency beacon — hovers over station centre */}
      <EmergencyBeacon active={station.activeEmergency} />

      {/* Orbit controls */}
      <OrbitControls
        enablePan={false}
        minPolarAngle={0.25}
        maxPolarAngle={Math.PI / 2.1}
        minDistance={7}
        maxDistance={26}
        autoRotate={!selectedId}
        autoRotateSpeed={0.35}
        target={[0, 1, 0]}
      />

      <Preload all />
    </>
  );
}

function FallbackLoader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#161c27" />
    </mesh>
  );
}

export function StationScene({ station, selectedId, onSelect }: Props) {
  return (
    <Canvas
      camera={{ position: [12, 10, 14], fov: 48 }}
      gl={{ antialias: true, alpha: false }}
      shadows
      style={{ background: "#10141c" }}
      onClick={(e) => {
        // Click on empty canvas deselects
        if ((e.target as HTMLElement).tagName === "CANVAS") onSelect(null);
      }}
    >
      <Suspense fallback={<FallbackLoader />}>
        <SceneContent station={station} selectedId={selectedId} onSelect={onSelect} />
      </Suspense>
    </Canvas>
  );
}
