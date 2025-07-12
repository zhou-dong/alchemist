import { useRef, useCallback, useEffect } from 'react';
import * as THREE from 'three';

export function useThreeAnimation(
    scene: THREE.Scene,
    camera: THREE.Camera,
    rendererRef: React.RefObject<THREE.WebGLRenderer | null>
) {
    const animationFrameRef = useRef<number | null>(null);

    const animate = useCallback(() => {
        animationFrameRef.current = requestAnimationFrame(animate);
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
