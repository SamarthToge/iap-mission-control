/**
 * EmergencyBeacon — a pulsing vertical beam that only renders when
 * activeEmergency === true. Shoots a red pillar of light upward to give
 * the operator an immediate spatial cue: "something is wrong here".
 */

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PALETTE } from "@/lib/station-data";

interface Props {
  active: boolean;
}

export function EmergencyBeacon({ active }: Props) {
  const pillarRef = useRef<THREE.Mesh>(null!);
  const ringRef   = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!active) return;
    const t = clock.elapsedTime;

    // Rapid pulse on the pillar
    if (pillarRef.current) {
      const mat = pillarRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.25 + 0.55 * (Math.sin(t * 7) * 0.5 + 0.5);
    }

    // Expanding ring
    if (ringRef.current) {
      const scale = 1 + 0.4 * (Math.sin(t * 4) * 0.5 + 0.5);
      ringRef.current.scale.set(scale, scale, scale);
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.6 - 0.5 * (Math.sin(t * 4) * 0.5 + 0.5);
    }
  });

  if (!active) return null;

  return (
    <group position={[0, 0, 0]}>
      {/* Vertical emergency pillar */}
      <mesh ref={pillarRef} position={[0, 4, 0]}>
        <cylinderGeometry args={[0.08, 0.5, 8, 8, 1, true]} />
        <meshBasicMaterial
          color={PALETTE.rust}
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Pulsing ground ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <ringGeometry args={[1.2, 1.5, 32]} />
        <meshBasicMaterial
          color={PALETTE.rust}
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
