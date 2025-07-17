import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

// Define type alias for animated mesh component
type AnimatedMesh = React.ComponentProps<'mesh'>;

const PureMeshExample = () => {
    const meshRef = useRef<Mesh>(null!);

    // Optional: Add some animation using useFrame
    useFrame((state) => {
        if (meshRef.current) {
            // Rotate the mesh
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.5;
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
        </mesh>
    );
};

export default PureMeshExample; 