import { useRef, useCallback, useEffect } from 'react';
import * as THREE from 'three';

export function useThreeRenderer(
    scene: THREE.Scene,
    camera: THREE.Camera,
    rendererRef: React.RefObject<THREE.WebGLRenderer | null>
) {
    const animationFrameRef = useRef<number | null>(null);

    const animate = useCallback(() => {
        animationFrameRef.current = requestAnimationFrame(animate);

        if (animationFrameRef.current % 10 === 0) {
            // console.log('animat...', frameRef.current);
            // console.log('objects', scene.children.map(ch => [ch.id, ch.uuid]));
            console.log('position', scene.children.map(ch => ({ ...ch.position }))[0]);
        }

        rendererRef.current?.render(scene, camera);
    }, [scene, camera, rendererRef]);

    const startAnimation = useCallback(() => {
        if (animationFrameRef.current === null) {
            animate();
        }
    }, [animate]);

    const stopAnimation = useCallback(() => {
        if (animationFrameRef.current !== null) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }
    }, []);

    const renderAnimationOnce = useCallback(() => {
        rendererRef.current?.render(scene, camera);
    }, [scene, camera, rendererRef]);

    useEffect(() => stop, [stop]);

    return { startAnimation, stopAnimation, renderAnimationOnce };
}
