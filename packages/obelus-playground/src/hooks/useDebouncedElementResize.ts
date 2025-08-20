import { useEffect, useRef } from 'react';

export function useDebouncedElementResize(
    containerRef: React.RefObject<HTMLElement | null>,
    onResize: (size: { width: number; height: number }) => void,
    delay: number = 300,
) {

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (typeof onResize !== 'function') return;

        const container = containerRef.current;
        if (container === null) return;

        const handleResize = () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                onResize({
                    width: container.clientWidth,
                    height: container.clientHeight,
                });
            }, delay);
        };

        const observer = new ResizeObserver(handleResize);
        observer.observe(container);

        return () => {
            observer.disconnect();
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [containerRef, onResize, delay]);

};
