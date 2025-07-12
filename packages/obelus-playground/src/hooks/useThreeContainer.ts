import React from 'react';
import { useEffect } from 'react';
import * as THREE from 'three';

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

export function createWebGLRenderer(
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

export function useThreeContainer(
    renderer: THREE.WebGLRenderer
) {
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (containerRef.current !== null) {
            containerRef.current.appendChild(renderer.domElement);
        }
    }, [containerRef]);

    return {
        containerRef,
    };
};
