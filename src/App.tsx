import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import { Bullet } from './components/Bullet'
import { Plane } from './components/Plane'
import { Enemy } from './components/Enemy'
import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [bullets, setBullets] = useState<{ id: number; position: [number, number, number] }[]>([])
  const [nextId, setNextId] = useState(0)
  const [cooldown, setCooldown] = useState(0)
  const [enemies, setEnemies] = useState<{ id: number; position: [number, number, number] }[]>([
    { id: 1, position: [0, -1, -10] },    // y = -1 because enemy is 1 unit tall and plane is at y=-2
    { id: 2, position: [-2, -1, -10] },   // So bottom of enemy (at -2) will touch plane
    { id: 3, position: [2, -1, -10] },
  ])
  const lastShotTime = useRef(0)
  const SHOT_DELAY = 2000

  const handleShoot = useCallback(() => {
    const currentTime = Date.now()
    if (currentTime - lastShotTime.current >= SHOT_DELAY) {
      setBullets(prev => [...prev, { 
        id: nextId, 
        position: [0, 0, 0] 
      }])
      setNextId(prev => prev + 1)
      lastShotTime.current = currentTime
    }
  }, [nextId])

  const handleBulletCollide = useCallback((bulletId: number) => {
    setBullets(prev => prev.filter(bullet => bullet.id !== bulletId))
  }, [])

  const handleEnemyHit = useCallback((enemyId: number) => {
    setEnemies(prev => prev.filter(enemy => enemy.id !== enemyId))
  }, [])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        handleShoot()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleShoot])

  useEffect(() => {
    const updateCooldown = () => {
      const currentTime = Date.now()
      const timeElapsed = currentTime - lastShotTime.current
      const remainingCooldown = Math.max(0, SHOT_DELAY - timeElapsed)
      setCooldown(remainingCooldown)
      requestAnimationFrame(updateCooldown)
    }

    const animationFrame = requestAnimationFrame(updateCooldown)
    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'white',
        fontSize: '20px',
        zIndex: 1000,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '10px',
        borderRadius: '5px'
      }}>
        <div>Cooldown: {cooldown.toFixed(0)}ms</div>
        <div>Enemies: {enemies.length}</div>
      </div>

      <Canvas camera={{ position: [5, 5, 5], fov: 75 }}>
        <OrbitControls />
        <axesHelper args={[5]} />
        
        <ambientLight intensity={2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, 10, -10]} intensity={1} />
        
        <Physics gravity={[0, -9.81, 0]}>
          {bullets.map(bullet => (
            <Bullet 
              key={bullet.id} 
              position={bullet.position}
              velocity={[0, 5, -15]}
              onCollide={() => handleBulletCollide(bullet.id)}
            />
          ))}
          {enemies.map(enemy => (
            <Enemy
              key={enemy.id}
              position={enemy.position}
              size={[1, 1, 1]}
              onHit={() => handleEnemyHit(enemy.id)}
            />
          ))}
          <Plane />
        </Physics>
      </Canvas>
    </div>
  )
}

export default App
