/**
 * CommsAntenna — 3-D representation of the station comms mast.
 * Colour reflects link status: VSAT (ice), Iridium-only (amber), offline (rust).
 * A rotating "scan ring" at the base pulses to indicate active telemetry.
 */

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import type { LinkStatus } from "@/lib/station-data";
import { PALETTE } from "@/lib/station-data";

interface Props {
  link: LinkStatus;
  position?: [number, number, number];
}

function linkColor(link: LinkStatus): string {
  if (link === "vsat") return PALETTE.ice;
  if (link === "iridium") return PALETTE.gold;
  return PALETTE.rust;
}

function linkLabel(link: LinkStatus): string {
  if (link === "vsat") return "VSAT UP";
  if (link === "iridium") return "IRIDIUM ONLY";
  return "LINK DOWN";
}

export function CommsAntenna({ link, position = [0, 0, 0] }: Props) {
  const ringRef = useRef<THREE.Mesh>(null!);
  const beamRef = useRef<THREE.Mesh>(null!);
  const color = linkColor(link);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    // Rotate scan ring
    if (ringRef.current) {
      ringRef.current.rotation.y = t * (link === "vsat" ? 1.2 : link === "iridium" ? 0.5 : 0.15);
    }

    // Pulse the signal beam
    if (beamRef.current) {
      const mat = beamRef.current.material as THREE.MeshBasicMaterial;
      const pulse = Math.sin(t * (link === "vsat" ? 3 : 1.5)) * 0.5 + 0.5;
      mat.opacity = 0.08 + 0.18 * pulse;
    }
  });

  return (
    <group position={position}>
      {/* Mast pole */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.06, 0.1, 3.0, 8]} />
        <meshStandardMaterial color="#2a3344" roughness={0.6} metalness={0.7} />
      </mesh>

      {/* Cross-arm */}
      <mesh position={[0, 2.8, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, 1.2, 6]} />
        <meshStandardMaterial color="#2a3344" roughness={0.6} metalness={0.7} />
      </mesh>

      {/* Signal bead at top */}
      <mesh position={[0, 3.05, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={link === "vsat" ? 2.5 : 1.2}
          roughness={0.2}
          metalness={0.5}
        />
      </mesh>

      {/* Rotating scan ring */}
      <mesh ref={ringRef} position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.6, 0.72, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>

      {/* Expanding signal cone (upward beam) */}
      <mesh ref={beamRef} position={[0, 1.8, 0]}>
        <coneGeometry args={[0.5, 2.6, 16, 1, true]} />
        <meshBasicMaterial color={color} transparent opacity={0.12} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      {/* Status label */}
      <Html center position={[0, 3.6, 0]} distanceFactor={12} style={{ pointerEvents: "none" }}>
        <div
          style={{
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: "9px",
            color,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            opacity: 0.85,
          }}
        >
          {linkLabel(link)}
        </div>
      </Html>
    </group>
  );
}
