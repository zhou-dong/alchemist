import type { DualRenderer, DualScene } from 'obelus-three-render';
import { useRef, useCallback, useEffect } from 'react';
import * as THREE from 'three';

export function useThreeAnimation(
    renderer: DualRenderer,
    scene: DualScene,
    camera: THREE.Camera,
) {
    const animationFrameRef = useRef<number | null>(null);

    const animate = useCallback(() => {
        renderer.render(scene.threeScene, scene.css3dScene, camera as any);
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
        renderer.render(scene.threeScene, scene.css3dScene, camera as any);
    }, [scene, camera, renderer]);

    useEffect(() => stopAnimation, [stopAnimation]);

    return {
        startAnimation,
        stopAnimation,
        renderAnimationOnce,
    };
}
