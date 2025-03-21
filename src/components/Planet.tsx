import { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useNavigate } from 'react-router-dom';
import { Html } from '@react-three/drei';
import type { Mesh } from 'three';

export function Planet() {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const texture = useLoader(TextureLoader, '/surface.png');

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotate the earth around its Y axis
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <mesh 
      ref={meshRef}
      onClick={(e) => {
        e.stopPropagation();
        navigate('/about');
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {hovered && (
        <Html position={[0, 8, 0]} center>
          <div style={{
            color: '#00ffff',
            fontSize: '24px',
            fontFamily: "'Orbitron', sans-serif",
            textShadow: '0 0 10px rgba(0, 255, 255, 0.7)',
            whiteSpace: 'nowrap',
            pointerEvents: 'none'
          }}>
            Click Me!!!
          </div>
        </Html>
      )}
      <sphereGeometry args={[10, 32, 32]} />
      <meshStandardMaterial 
        map={texture}
        metalness={0.4}
        roughness={0.7}
      />
    </mesh>
  );
}













