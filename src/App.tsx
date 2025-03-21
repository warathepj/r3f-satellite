import { Routes, Route } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Planet } from './components/Planet';
import { Satellite } from './components/Satellite';
import { Footer } from './components/Footer';
import { About } from './pages/About';

export default function App() {
  return (
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/" element={
        <>
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url(/bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: -1
          }} />
          <h1 style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '3rem',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #00ffff, #ff00ff)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            textShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
            zIndex: 1000,
            margin: 0,
            padding: '0.5em',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            animation: 'glow 2s ease-in-out infinite alternate',
          }}>
            Apex Horizon
          </h1>
          <style>
            {`
              @keyframes glow {
                from {
                  filter: drop-shadow(0 0 20px rgba(0, 255, 255, 0.5));
                }
                to {
                  filter: drop-shadow(0 0 30px rgba(255, 0, 255, 0.5));
                }
              }
            `}
          </style>
          <Canvas
            camera={{
              position: [0, 0, 50],
              fov: 45,
              near: 0.1,
              far: 1000
            }}
          >
            <ambientLight intensity={2.6} />
            <directionalLight 
              position={[10, 5, 5]} 
              intensity={2.5}
              castShadow
            />
            <pointLight 
              position={[-10, -10, -10]} 
              intensity={1.0} 
            />
            <pointLight 
              position={[10, -10, 10]} 
              intensity={0.8} 
            />
            <spotLight
              position={[-50, 30, 0]}
              angle={0.3}
              penumbra={1}
              intensity={1.0}
            />
            <Planet />
            <Satellite scale={0.5} orbitRadius={30} />
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={20}
              maxDistance={100}
              minPolarAngle={0}
              maxPolarAngle={Math.PI}
              dampingFactor={0.05}
              rotateSpeed={0.5}
              zoomSpeed={0.5}
              panSpeed={0.5}
              enableDamping={true}
            />
          </Canvas>
          <Footer />
        </>
      } />
    </Routes>
  );
}
























