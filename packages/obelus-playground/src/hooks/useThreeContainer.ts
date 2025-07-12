import React from 'react';
import { useEffect } from 'react';
import * as THREE from 'three';

export function useThreeContainer(renderer: THREE.WebGLRenderer) {
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
