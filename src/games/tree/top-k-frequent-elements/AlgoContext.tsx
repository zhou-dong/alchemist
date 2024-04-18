import React from "react";
import * as THREE from 'three';
import { clearScene } from '../../../commons/three';
import { Comparable } from "../../../data-structures/tree/heap/heap.interface";
import MinHeap from "../../../data-structures/tree/heap/min-heap";
import { State } from "./AlgoState";

export class HeapItem implements Comparable {

    num: number;
    count: number;

    constructor(num: number, count: number) {
        this.num = num;
        this.count = count;
    }

    compareTo(other: HeapItem): number {
        return this.count - other.count;
    }

    toString(): string {
        return this.num + ":" + this.count;
    }
}

const AlgoContext = React.createContext<{
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    scene: THREE.Scene,
    animate: () => void,
    cancelAnimate: () => void,
    k: number,
    setK: React.Dispatch<React.SetStateAction<number>>,
    heap?: MinHeap<HeapItem>,
    setHeap: React.Dispatch<React.SetStateAction<MinHeap<HeapItem> | undefined>>,
    map?: Map<number, number>,
    setMap: React.Dispatch<React.SetStateAction<Map<number, number> | undefined>>,
    nums: number[],
    setNums: React.Dispatch<React.SetStateAction<number[]>>,
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    mapIndex: number,
    setMapIndex: React.Dispatch<React.SetStateAction<number>>,
    frequents: HeapItem[],
    setFrequents: React.Dispatch<React.SetStateAction<HeapItem[]>>,
    result: number[],
    setResult: React.Dispatch<React.SetStateAction<number[]>>
}>({
    state: State.Typing,
    setState: () => { },
    scene: new THREE.Scene(),
    animate: () => { },
    cancelAnimate: () => { },
    k: 0,
    setK: () => { },
    setHeap: () => { },
    setMap: () => { },
    nums: [],
    setNums: () => { },
    index: -1,
    setIndex: () => { },
    mapIndex: -1,
    setMapIndex: () => { },
    frequents: [],
    setFrequents: () => { },
    result: [],
    setResult: () => { }
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
    const [k, setK] = React.useState(0);
    const [heap, setHeap] = React.useState<MinHeap<HeapItem>>();
    const [map, setMap] = React.useState<Map<number, number>>();
    const [nums, setNums] = React.useState<number[]>([]);
    const [index, setIndex] = React.useState(-1);
    const [mapIndex, setMapIndex] = React.useState(-1);
    const [frequents, setFrequents] = React.useState<HeapItem[]>([]);
    const [result, setResult] = React.useState<number[]>([]);

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
            k,
            setK,
            heap,
            setHeap,
            map,
            setMap,
            nums,
            setNums,
            index,
            setIndex,
            mapIndex,
            setMapIndex,
            frequents,
            setFrequents,
            result,
            setResult
        }}>
            {children}
            <div ref={ref}></div>
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
