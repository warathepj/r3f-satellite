import { useRef } from 'react'
import { ThreeElements } from '@react-three/fiber'
import { useBox } from '@react-three/cannon'

type EnemyProps = ThreeElements['mesh'] & {
  position?: [number, number, number]
  size?: [number, number, number]
  onHit?: () => void
}

export function Enemy({ 
  position = [0, 0, 0], 
  size = [1, 1, 1], 
  onHit,
  ...props 
}: EnemyProps) {
  const [ref] = useBox(() => ({
    mass: 0, // Set mass to 0 to make it static
    position: position,
    args: size,
    type: "Static", // Make it a static body
    onCollide: (e) => {
      onHit?.()
    },
  }))

  return (
    <mesh 
      ref={ref}
      position={position} 
      {...props}
    >
      <boxGeometry args={size} />
      <meshStandardMaterial color="#ff4444" />
    </mesh>
  )
}