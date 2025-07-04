import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function createOrthographicCamera(
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

function createWebGLRenderer(
    width: number,
    height: number,
    canvas: HTMLCanvasElement,
    {
        alpha = true,
        antialias = true,
    } = {}
): THREE.WebGLRenderer {
    const renderer = new THREE.WebGLRenderer({ canvas, alpha, antialias });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    return renderer;
};

export function useThreeRenderer({
    width = window.innerWidth,
    height = window.innerHeight,
    alpha = true,
    antialias = true,
} = {}) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const frameRef = useRef<number | null>(null);

    const camera = createOrthographicCamera(width, height);
    const scene = new THREE.Scene();

    const animate = () => {
        frameRef.current = requestAnimationFrame(animate);

        if (frameRef.current % 10 === 0) {
            // console.log('animat...', frameRef.current);
            // console.log('objects', scene.children.map(ch => [ch.id, ch.uuid]));
            console.log('position', scene.children.map(ch => ({ ...ch.position }))[0]);
        }

        rendererRef.current?.render(scene, camera);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        rendererRef.current = createWebGLRenderer(width, height, canvas);
    }, [width, height, alpha, antialias, canvasRef]);

    const start = () => {
        if (!rendererRef.current) return;

        console.log('staring');

        if (frameRef.current === null) {

            console.log('started');
            animate();
        };
    };

    const stop = () => {

        console.log('stop...');

        if (frameRef.current !== null) {

            cancelAnimationFrame(frameRef.current);

            console.log('stopped', frameRef.current);

            frameRef.current = null;
        }
    };

    return {
        canvasRef,
        scene,
        camera,
        start,
        stop
    };
};
