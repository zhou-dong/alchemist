import React from "react";
import * as THREE from 'three';
import { clearScene, registerOrbitControls } from '../../../commons/three';
import { Comparable } from "../../../data-structures/tree/heap/heap.interface";
import MinHeap from "../../../data-structures/tree/heap/min-heap";
import { State } from "./AlgoState";

export class HeapItem implements Comparable {
    word: string;
    count: number;

    constructor(word: string, count: number) {
        this.word = word;
        this.count = count;
    }

    compareTo(other: HeapItem): number {
        if (this.count !== other.count) {
            return this.count - other.count;
        }
        return (other.word > this.word) ? 1 : -1;
    }

    toString(): string {
        return this.word + ":" + this.count;
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
    map?: Map<string, number>,
    setMap: React.Dispatch<React.SetStateAction<Map<string, number> | undefined>>,
    words: string[],
    setWords: React.Dispatch<React.SetStateAction<string[]>>,
    wordsIndex: number,
    setWordsIndex: React.Dispatch<React.SetStateAction<number>>,
    heapItems: HeapItem[],
    setHeapItems: React.Dispatch<React.SetStateAction<HeapItem[]>>,
    heapItemsIndex: number,
    setHeapItemsIndex: React.Dispatch<React.SetStateAction<number>>,
    result: string[],
    setResult: React.Dispatch<React.SetStateAction<string[]>>,
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
    words: [],
    setWords: () => { },
    wordsIndex: 0,
    setWordsIndex: () => { },
    heapItems: [],
    setHeapItems: () => { },
    heapItemsIndex: -1,
    setHeapItemsIndex: () => { },
    result: [],
    setResult: () => { },
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
    const [map, setMap] = React.useState<Map<string, number>>();
    const [words, setWords] = React.useState<string[]>([]);
    const [wordsIndex, setWordsIndex] = React.useState(0);
    const [heapItems, setHeapItems] = React.useState<HeapItem[]>([]);
    const [heapItemsIndex, setHeapItemsIndex] = React.useState(-1);
    const [result, setResult] = React.useState<string[]>([]);

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
            k,
            setK,
            heap,
            setHeap,
            map,
            setMap,
            result,
            setResult,
            words,
            setWords,
            wordsIndex,
            setWordsIndex,
            heapItems,
            setHeapItems,
            heapItemsIndex,
            setHeapItemsIndex
        }}>
            {children}
            <div ref={ref}></div>
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
