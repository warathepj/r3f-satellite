import { useRef } from 'react';
import { ThreeElements, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import type { Group } from 'three';

type SatelliteProps = ThreeElements['group'] & {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  orbitRadius?: number;
  orbitSpeed?: number;
}

export function Satellite({ 
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  orbitRadius = 43,
  orbitSpeed = 0.5,
  ...props 
}: SatelliteProps) {
  const groupRef = useRef<Group>(null);
  const orbitAngleRef = useRef(0);
  const gltf = useLoader(GLTFLoader, '/satellite/scene.gltf');

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Update orbit angle
      orbitAngleRef.current += delta * orbitSpeed;
      
      // Calculate new position in orbit around Y axis
      const x = Math.cos(orbitAngleRef.current) * orbitRadius;
      const z = Math.sin(orbitAngleRef.current) * orbitRadius;
      
      // Update position
      groupRef.current.position.x = x;
      groupRef.current.position.z = z;
      
      // Add rotation animation
      groupRef.current.rotation.x += delta * 0.2;
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={[scale, scale, scale]}
      {...props}
    >
      <primitive object={gltf.scene} />
    </group>
  );
}






















