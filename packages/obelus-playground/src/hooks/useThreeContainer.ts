import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function useThreeContainer(renderer: THREE.WebGLRenderer) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (containerRef.current !== null) {
            containerRef.current.appendChild(renderer.domElement);
        }
    }, [containerRef]);

    return {
        containerRef,
    };
};
