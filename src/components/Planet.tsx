import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import type { Mesh } from 'three';

export function Planet() {
  const meshRef = useRef<Mesh>(null);
  const texture = useLoader(TextureLoader, '/surface.png');

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotate the earth around its Y axis
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[10, 32, 32]} />
      <meshStandardMaterial 
        map={texture}
        metalness={0.4}
        roughness={0.7}
      />
    </mesh>
  );
}













