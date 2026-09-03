/**
 * BuildingBlock — a single pulsing 3-D box representing one station building.
 *
 * Behaviour:
 *  - health 0-34  → rust red,  fast intense pulse  (~3× per sec)
 *  - health 35-59 → amber,     slow glow           (~1× per sec)
 *  - health 60-100→ moss green, barely perceptible shimmer
 *
 * Clicking a block fires onSelect so the sidebar can show details.
 */

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import type { BuildingData } from "@/lib/station-data";
import { PALETTE } from "@/lib/station-data";

interface Props {
  data: BuildingData;
  selected: boolean;
  onSelect: (id: string) => void;
}

function healthColor(h: number): string {
  if (h < 35) return PALETTE.rust;
  if (h < 60) return PALETTE.gold;
  return PALETTE.moss;
}

function pulseSpeed(h: number): number {
  if (h < 35) return 6.0;   // fast emergency pulse
  if (h < 60) return 1.8;   // medium amber glow
  return 0.6;                // slow healthy shimmer
}

function maxEmissive(h: number): number {
  if (h < 35) return 2.2;
  if (h < 60) return 0.7;
  return 0.22;
}

export function BuildingBlock({ data, selected, onSelect }: Props) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  const color = healthColor(data.health);
  const speed = pulseSpeed(data.health);
  const maxEm = maxEmissive(data.health);

  const W = 1.8;
  const D = 1.8;
  const H = data.height * 2.2;

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    const t = clock.elapsedTime;
    // Pulse: sinusoidal emissive intensity
    const pulse = (Math.sin(t * speed) * 0.5 + 0.5);
    mat.emissiveIntensity = hovered || selected
      ? maxEm * 1.4
      : maxEm * (0.25 + 0.75 * pulse);

    // Hover: slight scale-up
    const target = hovered || selected ? 1.04 : 1.0;
    meshRef.current.scale.lerp(new THREE.Vector3(target, 1, target), 0.12);
  });

  return (
    <group position={[data.pos[0], H / 2, data.pos[1]]}>
      {/* Main building mesh */}
      <RoundedBox
        ref={meshRef}
        args={[W, H, D]}
        radius={0.04}
        smoothness={2}
        onClick={(e) => { e.stopPropagation(); onSelect(data.id); }}
        onPointerEnter={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
        onPointerLeave={() => { setHovered(false); document.body.style.cursor = "default"; }}
      >
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.55}
          metalness={0.4}
          transparent
          opacity={0.88}
        />
      </RoundedBox>

      {/* Accent edge lines on top */}
      <lineSegments position={[0, H / 2 + 0.02, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(W + 0.02, 0.04, D + 0.02)]} />
        <lineBasicMaterial color={color} transparent opacity={0.6} />
      </lineSegments>

      {/* Ground footprint glow plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -H / 2 + 0.01, 0]}>
        <planeGeometry args={[W + 0.4, D + 0.4]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={data.health < 35 ? 0.18 : 0.07}
          depthWrite={false}
        />
      </mesh>

      {/* Floating label — always visible, tooltip on hover/select */}
      {(hovered || selected) && (
        <Html
          center
          position={[0, H / 2 + 0.55, 0]}
          distanceFactor={10}
          style={{ pointerEvents: "none" }}
        >
          <div
            style={{
              background: "rgba(22,28,39,0.92)",
              border: `1px solid ${color}60`,
              padding: "6px 10px",
              fontFamily: "IBM Plex Mono, monospace",
              fontSize: "10px",
              color: "#d9dde4",
              whiteSpace: "nowrap",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            <div style={{ color, marginBottom: 3, fontSize: 9, letterSpacing: "0.14em" }}>
              {data.alertLevel === "critical" ? "⬛ CRITICAL" : data.alertLevel === "warn" ? "◈ WARN" : "◉ OK"}{" "}
              · {data.health}%
            </div>
            <div style={{ color: "#e7d3a0", marginBottom: 2 }}>{data.label}</div>
            <div style={{ color: "#8b93a1", fontSize: 9, textTransform: "none", letterSpacing: "0.04em", maxWidth: 200, whiteSpace: "normal" }}>
              {data.desc}
            </div>
          </div>
        </Html>
      )}

      {/* Small name tag when not hovered */}
      {!hovered && !selected && (
        <Html
          center
          position={[0, H / 2 + 0.35, 0]}
          distanceFactor={14}
          style={{ pointerEvents: "none" }}
        >
          <div
            style={{
              fontFamily: "IBM Plex Mono, monospace",
              fontSize: "8px",
              color: color,
              whiteSpace: "nowrap",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              opacity: 0.75,
            }}
          >
            {data.label}
          </div>
        </Html>
      )}
    </group>
  );
}
