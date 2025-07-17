import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, MeshStandardMaterial } from 'three';
import gsap from 'gsap';

const GSAPMeshExample = () => {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<MeshStandardMaterial>(null);

  useEffect(() => {
    if (meshRef.current) {
      // 1. Transform Properties
      gsap.to(meshRef.current.position, {
        x: 3,
        y: 2,
        z: 0,
        duration: 2,
        ease: 'power2.out'
      });

      // 2. Scale Animation
      gsap.to(meshRef.current.scale, {
        x: 1.5,
        y: 1.5,
        z: 1.5,
        duration: 1.5,
        delay: 0.5
      });

      // 3. Rotation Animation
      gsap.to(meshRef.current.rotation, {
        y: Math.PI * 2, // Full rotation
        duration: 3,
        ease: 'power2.inOut'
      });

      // 4. Material Color Animation
      if (materialRef.current) {
        gsap.to(materialRef.current, {
          color: 0x00ff00, // Green
          duration: 2,
          delay: 1
        });
      }

      // 5. Complex Animation with onUpdate
      gsap.to({}, {
        duration: 4,
        onUpdate: function() {
          if (meshRef.current) {
            const progress = this.progress();
            meshRef.current.position.y = Math.sin(progress * Math.PI * 4) * 2;
          }
        }
      });
    }
  }, []);

  // Continuous animation
  useFrame((state) => {
    if (meshRef.current) {
      // Add subtle floating motion
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 2) * 0.001;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        ref={materialRef}
        color="red" 
        transparent 
        opacity={0.8}
      />
    </mesh>
  );
};

export default GSAPMeshExample; 