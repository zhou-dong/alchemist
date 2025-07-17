import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { motion } from 'framer-motion'
import { animatable, animate } from 'obelus'
import { useState } from 'react'

function Box({ position, color }: { position: [number, number, number], color: string }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

function AnimatedBox({ id, position, color }: { id: string, position: [number, number, number], color: string }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        width: '50px',
        height: '50px',
        background: color,
        left: `${position[0] * 100}px`,
        top: `${position[1] * 100}px`
      }}
      animate={{ x: position[0] * 100 + 200 }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
    />
  )
}

function App() {
  const [scene] = useState(() => {
    // Create a simple scene using your DSL
    const objects = [
      animatable('box1', { type: 'box', position: [0, 0, 0] }),
      animatable('box2', { type: 'box', position: [2, 0, 0] })
    ]

    const steps = [
      animate('box1', { duration: 1000, x: 2 }),
      animate('box2', { duration: 1000, y: 2 })
    ]

    return { objects, steps }
  })

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div style={{ padding: '20px', background: '#f0f0f0' }}>
        <h1>Obelus DSL + React Three Fiber + Framer Motion</h1>
        <p>Scene: {scene.objects.length} objects, {scene.steps.length} steps</p>
      </div>
      
      <Canvas camera={{ position: [5, 5, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        {/* Static boxes */}
        <Box position={[0, 0, 0]} color="red" />
        <Box position={[2, 0, 0]} color="blue" />
        
        <OrbitControls />
      </Canvas>
      
      {/* 2D animated elements using Framer Motion */}
      <div style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
        <AnimatedBox id="animated1" position={[0, 2, 0]} color="green" />
        <AnimatedBox id="animated2" position={[2, 2, 0]} color="orange" />
      </div>
    </div>
  )
}

export default App
