import * as THREE from 'three';
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
import { DualRenderer, DualScene } from 'obelus-three-render';

export function createOrthographicCamera(
    width: number,
    height: number,
    {
        near = 0.1,
        far = 1000,
        z = 500,
        zoom = 1,
    } = {}
): THREE.OrthographicCamera {
    const left = -width / 2;
    const right = width / 2;
    const top = height / 2;
    const bottom = -height / 2;

    const camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
    camera.position.z = z;
    camera.zoom = zoom;
    camera.updateProjectionMatrix();

    return camera;
};

function createWebglRenderer(
    width: number,
    height: number,
    {
        alpha = true,
        antialias = true,
    } = {}
): THREE.WebGLRenderer {
    const renderer = new THREE.WebGLRenderer({ alpha, antialias });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    return renderer;
};

function createCss3dRenderer(
    width: number,
    height: number,
) {
    const renderer = new CSS3DRenderer();
    renderer.setSize(width, height);
    return renderer;
};

export function createDualRenderer(
    width: number,
    height: number,
) {
    const webglRenderer = createWebglRenderer(width, height);
    const css3dRenderer = createCss3dRenderer(width, height);
    return new DualRenderer(webglRenderer as any, css3dRenderer as any);
};

export function useDualRenderer(
    width: number = window.innerWidth,
    height: number = window.innerHeight,
) {
    const renderer = createDualRenderer(width, height);
    const camera = createOrthographicCamera(width, height);
    return { renderer, camera };
};

export interface UseDualRendererProps {
    renderer: DualRenderer;
    scene: DualScene;
    camera: THREE.Camera;
};
