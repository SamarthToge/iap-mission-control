/**
 * GroundPlane — the ice/tundra ground under the 3-D station.
 * Uses a subtle grid overlay to suggest an engineering/satellite-view aesthetic.
 */

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PALETTE } from "@/lib/station-data";

interface Props {
  size?: number;
}

export function GroundPlane({ size = 18 }: Props) {
  const gridRef = useRef<THREE.GridHelper>(null!);

  useFrame(({ clock }) => {
    // Very slow drift on grid opacity — gives a living "scan" feel
    if (gridRef.current) {
      const mat = gridRef.current.material as THREE.Material;
      (mat as THREE.LineBasicMaterial).opacity =
        0.12 + 0.04 * Math.sin(clock.elapsedTime * 0.4);
    }
  });

  return (
    <group>
      {/* Base tundra plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial color={PALETTE.ground} roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Tactical grid */}
      <gridHelper
        ref={gridRef}
        args={[size, 20, PALETTE.gold, PALETTE.gold]}
        position={[0, 0.0, 0]}
      />

      {/* Outer boundary frame */}
      <lineSegments position={[0, 0.02, 0]}>
        <edgesGeometry
          args={[new THREE.BoxGeometry(size - 0.1, 0.01, size - 0.1)]}
        />
        <lineBasicMaterial color={PALETTE.gold} transparent opacity={0.25} />
      </lineSegments>
    </group>
  );
}
