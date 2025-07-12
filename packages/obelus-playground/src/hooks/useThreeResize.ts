import * as THREE from 'three';
import { useDebouncedElementResize } from './useDebouncedElementResize';

export function useThreeResize(
    containerRef: React.RefObject<HTMLElement | null>,
    delay: number = 300,
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.Camera
) {

    const resize = (size: { width: number; height: number }) => {
        const { width, height } = size;
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);

        if ('aspect' in camera) {
            (camera as THREE.PerspectiveCamera).aspect = width / height;
            (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
        }

        renderer.render(scene, camera);
    };

    useDebouncedElementResize(containerRef, resize, delay);

}
