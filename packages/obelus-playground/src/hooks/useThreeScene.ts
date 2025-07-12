import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThreeRenderer } from './useThreeRenderer';

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

export function useThreeScene({
    width = window.innerWidth,
    height = window.innerHeight,
    alpha = true,
    antialias = true,
} = {}) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

    const camera = createOrthographicCamera(width, height);
    const scene = new THREE.Scene();

    const { startAnimation, stopAnimation, renderAnimationOnce } = useThreeRenderer(scene, camera, rendererRef)

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas === null) return;
        rendererRef.current = createWebGLRenderer(width, height, canvas);
    }, [width, height, alpha, antialias, canvasRef]);


    return {
        canvasRef,
        scene,
        startAnimation,
        stopAnimation,
        renderAnimationOnce
    };
};
