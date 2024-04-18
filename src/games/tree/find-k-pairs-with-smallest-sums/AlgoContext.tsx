import React from "react";
import * as THREE from 'three';
import { clearScene } from '../../../commons/three';
import { Comparable } from "../../../data-structures/tree/heap/heap.interface";
import MinHeap from "../../../data-structures/tree/heap/min-heap";
import { State } from "./AlgoState";

export interface Position {
    x: number;
    y: number;
}

export class HeapItem implements Comparable {
    x: number; // index in nums1
    y: number; // index in nums2
    a: number; // value in nums1
    b: number; // value in nums2

    constructor(x: number, y: number, a: number, b: number) {
        this.x = x;
        this.y = y;
        this.a = a;
        this.b = b;
    }

    compareTo(other: HeapItem): number {
        return (this.a + this.b) - (other.a + other.b);
    }

    toString(): string {
        return `[${this.a},${this.b}]`;
    }
}

const AlgoContext = React.createContext<{
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    scene: THREE.Scene,
    animate: () => void,
    cancelAnimate: () => void,
    minHeap?: MinHeap<HeapItem>,
    setMinHeap: React.Dispatch<React.SetStateAction<MinHeap<HeapItem> | undefined>>,
    k: number,
    setK: React.Dispatch<React.SetStateAction<number>>,
    current: Position,
    setCurrent: React.Dispatch<React.SetStateAction<Position>>,
    nums1: number[],
    setNums1: React.Dispatch<React.SetStateAction<number[]>>,
    nums2: number[],
    setNums2: React.Dispatch<React.SetStateAction<number[]>>,
    results: number[][],
    setResults: React.Dispatch<React.SetStateAction<number[][]>>,
    seen?: Set<string>,
    setSeen: React.Dispatch<React.SetStateAction<Set<string> | undefined>>
}>({
    state: State.Typing,
    setState: () => { },
    scene: new THREE.Scene(),
    animate: () => { },
    cancelAnimate: () => { },
    setMinHeap: () => { },
    k: 0,
    setK: () => { },
    current: { x: 0, y: 0 },
    setCurrent: () => { },
    nums1: [],
    setNums1: () => { },
    nums2: [],
    setNums2: () => { },
    results: [],
    setResults: () => { },
    setSeen: () => { }
});

let animationFrameId = -1;

export const AlgoContextProvider: React.FC<{
    children: React.ReactNode,
    renderer: THREE.Renderer,
    camera: THREE.Camera,
    scene: THREE.Scene,
}> = ({ children, renderer, camera, scene }) => {

    camera.position.z = 20;
    const [state, setState] = React.useState(State.Typing);
    const [minHeap, setMinHeap] = React.useState<MinHeap<HeapItem>>();
    const [results, setResults] = React.useState<number[][]>([]);
    const [k, setK] = React.useState(0);
    const [current, setCurrent] = React.useState<Position>({ x: 0, y: 0 });
    const [nums1, setNums1] = React.useState<number[]>([]);
    const [nums2, setNums2] = React.useState<number[]>([]);
    const [seen, setSeen] = React.useState<Set<string>>();

    function animate() {
        animationFrameId = requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    function cancelAnimate() {
        cancelAnimationFrame(animationFrameId);
    }

    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const init = () => {
            clearScene(scene);
            renderer.render(scene, camera);
        }
        if (ref && ref.current) {
            init();
            ref.current.appendChild(renderer.domElement);
        }
    }, [ref, renderer, scene, camera]);

    return (
        <AlgoContext.Provider value={{
            state,
            setState,
            scene,
            animate,
            cancelAnimate,
            minHeap,
            setMinHeap,
            k,
            setK,
            current,
            setCurrent,
            results,
            setResults,
            nums1,
            setNums1,
            nums2,
            setNums2,
            seen,
            setSeen
        }}>
            {children}
            <div ref={ref}></div>
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
