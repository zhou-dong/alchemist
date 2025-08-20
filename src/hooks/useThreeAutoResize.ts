import * as THREE from 'three';
import { useDebouncedElementResize } from './useDebouncedElementResize';
import type { DualRenderer, DualScene } from 'obelus-three-render';

export function useThreeAutoResize(
    containerRef: React.RefObject<HTMLElement | null>,
    renderer: DualRenderer,
    scene: DualScene,
    camera: THREE.Camera,
    delay: number = 300,
) {

    const resize = (size: { width: number; height: number }) => {
        const { width, height } = size;
        renderer.webglRenderer.setSize(width, height);
        renderer.webglRenderer.setPixelRatio(window.devicePixelRatio);
        renderer.css3dRenderer.setSize(width, height);

        if ('aspect' in camera) {
            (camera as THREE.PerspectiveCamera).aspect = width / height;
            (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
        }

        renderer.render(scene.threeScene, scene.css3dScene, camera as any);
    };

    useDebouncedElementResize(containerRef, resize, delay);
};
