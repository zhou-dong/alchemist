import { useEffect, useRef } from 'react';
import { DualRenderer } from 'obelus-three-render';

export function useThreeContainer(dualRenderer: DualRenderer) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (containerRef.current !== null) {
            containerRef.current.appendChild(dualRenderer.webglRenderer.domElement);
            containerRef.current.appendChild(dualRenderer.css3dRenderer.domElement);
        }
    }, [containerRef]);

    return { containerRef };
};
