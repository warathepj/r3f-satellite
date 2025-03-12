import { usePlane } from '@react-three/cannon'
import { ThreeElements } from '@react-three/fiber'

type PlaneProps = ThreeElements['mesh'] & {
  width?: number;
  depth?: number;
  height?: number;
  color?: string;
}

export function Plane({ 
  width = 50, 
  depth = 50, 
  height = 1, 
  color = '#666600',
  ...props 
}: PlaneProps) {
  const [ref] = usePlane(() => ({ 
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -2, 0], // Changed Y position from -0.5 to -2
    type: 'Static'
  }))

  return (
    <mesh 
      ref={ref}
      rotation={[-Math.PI / 2, 0, 0]} 
      position={[0, -2, 0]} // Changed Y position from -0.5 to -2
      {...props}
    >
      <boxGeometry args={[width, depth, height]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}
