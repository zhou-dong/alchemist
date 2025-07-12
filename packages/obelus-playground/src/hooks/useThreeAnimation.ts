import { useRef, useCallback, useEffect } from 'react';
import * as THREE from 'three';

export function useThreeAnimation(
    scene: THREE.Scene,
    camera: THREE.Camera,
    renderer: THREE.Renderer
) {
    const animationFrameRef = useRef<number | null>(null);

    const animate = useCallback(() => {
        renderer.render(scene, camera);
        animationFrameRef.current = requestAnimationFrame(animate);
    }, [scene, camera, renderer]);

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
        renderer.render(scene, camera);
    }, [scene, camera, renderer]);

    useEffect(() => stopAnimation, [stopAnimation]);

    return {
        startAnimation,
        stopAnimation,
        renderAnimationOnce
    };
}
