import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import { Bullet } from './components/Bullet'
import { useState, useCallback, useEffect } from 'react'

function App() {
  const [bullets, setBullets] = useState<{ id: number; position: [number, number, number] }[]>([])
  const [nextId, setNextId] = useState(0)

  const handleShoot = useCallback(() => {
    setBullets(prev => [...prev, { 
      id: nextId, 
      position: [0, 0, 0] 
    }])
    setNextId(prev => prev + 1)
  }, [nextId])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        handleShoot()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleShoot])

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [5, 5, 5], fov: 75 }}>
        <OrbitControls />
        <axesHelper args={[5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <Physics gravity={[0, -9.81, 0]}>
          {bullets.map(bullet => (
            <Bullet 
              key={bullet.id} 
              position={bullet.position}
              velocity={[0, 5, -15]}
            />
          ))}
          
          {/* Ground plane */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
            <planeGeometry args={[50, 50]} />
            <meshStandardMaterial color="gray" />
          </mesh>
        </Physics>
      </Canvas>
    </div>
  )
}

export default App
