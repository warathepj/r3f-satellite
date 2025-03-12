import { useRef } from 'react'
import { ThreeElements } from '@react-three/fiber'
import { useSphere } from '@react-three/cannon'
import * as THREE from 'three'

type BulletProps = ThreeElements['mesh'] & {
  position?: [number, number, number]
  velocity?: [number, number, number]
  onCollide?: () => void
}

export function Bullet({ position = [0, 0, 0], velocity = [0, 5, -15], onCollide, ...props }: BulletProps) {
  const [ref] = useSphere(() => ({
    mass: 1,
    position: position,
    args: [0.2], // radius
    velocity: velocity,
    allowSleep: false,
    onCollide: (e) => {
      onCollide?.()
    },
  }))

  return (
    <mesh 
      ref={ref}
      position={position} 
      {...props}
    >
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshStandardMaterial color="yellow" />
    </mesh>
  )
}
