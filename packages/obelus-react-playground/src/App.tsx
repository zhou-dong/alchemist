import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { type Animatable, animatable, animate, type StepScene } from 'obelus'
import { useState } from 'react'

type AnimatableMesh = Animatable<React.ComponentProps<'mesh'>>;

function Circle({ position, color }: { position: [number, number, number], color: string }) {
  return (
    <mesh position={position}>
      <circleGeometry args={[1, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
};

const stepScene: StepScene<JSX.Element> = {
  objects: [
    animatable('circle1', <Circle position={[0, 0, 0]} color="red" />),
    animatable('circle2', <Circle position={[2, 0, 0]} color="blue" />),
  ],
  steps: [
    animate('circle1', { position: [0, 0, 1] }, { duration: 1000 }),
    animate('circle2', { position: [0, 0, 1] }, { duration: 1000 }),
  ]
};





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
