import { Canvas } from '@react-three/fiber';
import { OrbitControls, axesHelper } from '@react-three/drei';
import { Planet } from './components/Planet';
import { Satellite } from './components/Satellite';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <>
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
        <axesHelper args={[20]} />
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
  );
}



















