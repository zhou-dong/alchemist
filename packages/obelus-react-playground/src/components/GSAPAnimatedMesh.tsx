import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import gsap from 'gsap';

// Define the API interface
export interface GSAPMeshAPI {
  animateTo: (props: any) => void;
  rotate: (duration?: number) => void;
  bounce: () => void;
  reset: () => void;
}

interface GSAPAnimatedMeshProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
}

const GSAPAnimatedMesh = forwardRef<GSAPMeshAPI, GSAPAnimatedMeshProps>(
  ({ position = [0, 0, 0], scale = 1, color = 'red' }, ref) => {
    const meshRef = useRef<Mesh>(null);

    // Expose animation methods to parent
    useImperativeHandle(ref, () => ({
      animateTo: (props: any) => {
        if (meshRef.current) {
          gsap.to(meshRef.current.position, {
            x: props.x ?? meshRef.current.position.x,
            y: props.y ?? meshRef.current.position.y,
            z: props.z ?? meshRef.current.position.z,
            duration: props.duration ?? 1,
            ease: props.ease ?? 'power2.out'
          });

          if (props.scale) {
            gsap.to(meshRef.current.scale, {
              x: props.scale,
              y: props.scale,
              z: props.scale,
              duration: props.duration ?? 1,
              ease: props.ease ?? 'power2.out'
            });
          }
        }
      },
      rotate: (duration = 2) => {
        if (meshRef.current) {
          gsap.to(meshRef.current.rotation, {
            y: meshRef.current.rotation.y + Math.PI * 2,
            duration,
            ease: 'power2.inOut',
            repeat: -1
          });
        }
      },
      bounce: () => {
        if (meshRef.current) {
          gsap.to(meshRef.current.position, {
            y: 2,
            duration: 0.5,
            ease: 'bounce.out',
            yoyo: true,
            repeat: 1
          });
        }
      },
      reset: () => {
        if (meshRef.current) {
          gsap.killTweensOf(meshRef.current.position);
          gsap.killTweensOf(meshRef.current.rotation);
          gsap.killTweensOf(meshRef.current.scale);
          
          gsap.set(meshRef.current.position, { x: 0, y: 0, z: 0 });
          gsap.set(meshRef.current.rotation, { x: 0, y: 0, z: 0 });
          gsap.set(meshRef.current.scale, { x: 1, y: 1, z: 1 });
        }
      }
    }), []);

    // Optional: Add some continuous animation
    useFrame((state) => {
      if (meshRef.current) {
        // Add a gentle floating motion
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      }
    });

    return (
      <mesh ref={meshRef} position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
    );
  }
);

GSAPAnimatedMesh.displayName = 'GSAPAnimatedMesh';

export default GSAPAnimatedMesh; 