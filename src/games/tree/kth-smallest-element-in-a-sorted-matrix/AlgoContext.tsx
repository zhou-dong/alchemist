import React from "react";
import * as THREE from 'three';
import { clearScene, registerOrbitControls } from '../../../commons/three';
import { Comparable } from "../../../data-structures/tree/heap/heap.interface";
import MinHeap from "../../../data-structures/tree/heap/min-heap";
import { State } from "./AlgoState";

export interface Position {
    row: number;
    col: number
}

export class HeapItem implements Comparable {
    val: number;
    row: number;
    col: number;

    constructor(val: number, row: number, col: number) {
        this.val = val;
        this.row = row;
        this.col = col;
    }

    compareTo(other: HeapItem): number {
        return this.val - other.val;
    }

    toString(): string {
        return this.val + "";
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
    matrix: number[][],
    setMatrix: React.Dispatch<React.SetStateAction<number[][]>>,
    current: Position,
    setCurrent: React.Dispatch<React.SetStateAction<Position>>,
    result?: number,
    setResult: React.Dispatch<React.SetStateAction<number | undefined>>,
    completed: Position[],
    setCompleted: React.Dispatch<React.SetStateAction<Position[]>>
}>({
    state: State.Typing,
    setState: () => { },
    scene: new THREE.Scene(),
    animate: () => { },
    cancelAnimate: () => { },
    setMinHeap: () => { },
    k: 0,
    setK: () => { },
    matrix: [],
    setMatrix: () => { },
    current: { row: 0, col: 0 },
    setCurrent: () => { },
    setResult: () => { },
    completed: [],
    setCompleted: () => { }
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
    const [result, setResult] = React.useState<number>();
    const [k, setK] = React.useState(0);
    const [matrix, setMatrix] = React.useState<number[][]>([]);
    const [current, setCurrent] = React.useState<Position>({ row: 0, col: 0 });
    const [completed, setCompleted] = React.useState<Position[]>([]);

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
            registerOrbitControls(camera, renderer, scene);
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
            matrix,
            setMatrix,
            current,
            setCurrent,
            result,
            setResult,
            completed,
            setCompleted
        }}>
            {children}
            <div ref={ref}></div>
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
