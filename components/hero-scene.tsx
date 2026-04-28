"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function OrbitalMesh() {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (!mesh.current || !material.current) return;
    mesh.current.rotation.y += 0.006;
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
    material.current.emissiveIntensity = 0.35 + Math.sin(state.clock.elapsedTime) * 0.1;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.5}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshStandardMaterial
          ref={material}
          color="#0e7490"
          emissive="#22d3ee"
          roughness={0.32}
          metalness={0.55}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const points = useMemo(() => {
    const total = 140;
    const positions = new Float32Array(total * 3);

    for (let i = 0; i < total; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 8;
      positions[i3 + 1] = (Math.random() - 0.5) * 8;
      positions[i3 + 2] = (Math.random() - 0.5) * 8;
    }

    return positions;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#67e8f9" sizeAttenuation transparent opacity={0.6} />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }} dpr={[1, 1.6]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.7} />
        <directionalLight intensity={1.1} position={[2, 2, 3]} />
        <OrbitalMesh />
        <Particles />
      </Suspense>
    </Canvas>
  );
}
