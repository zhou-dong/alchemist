import React from "react";
import * as THREE from 'three';
import { clearScene, registerOrbitControls } from '../../../commons/three';
import { Comparable } from "../../../data-structures/tree/heap/heap.interface";
import MinHeap from "../../../data-structures/tree/heap/min-heap";
import { State } from "./AlgoState";

export class ListNode implements Comparable {
    key: number; // use for react display
    val: number;
    next?: ListNode;

    constructor(key: number, val: number) {
        this.key = key;
        this.val = val;
    }

    compareTo(other: ListNode): number {
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
    key: number,
    setKey: React.Dispatch<React.SetStateAction<number>>,
    lists: ListNode[],
    setLists: React.Dispatch<React.SetStateAction<ListNode[]>>,
    minHeap?: MinHeap<ListNode>,
    setMinHeap: React.Dispatch<React.SetStateAction<MinHeap<ListNode> | undefined>>,
    results: number[],
    setResults: React.Dispatch<React.SetStateAction<number[]>>,
    finishedKeys: number[],
    setFinishedKeys: React.Dispatch<React.SetStateAction<number[]>>
}>({
    state: State.Typing,
    setState: () => { },
    scene: new THREE.Scene(),
    animate: () => { },
    cancelAnimate: () => { },
    key: -1,
    setKey: () => { },
    lists: [],
    setLists: () => { },
    setMinHeap: () => { },
    results: [],
    setResults: () => { },
    finishedKeys: [],
    setFinishedKeys: () => { }
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
    const [minHeap, setMinHeap] = React.useState<MinHeap<ListNode>>();
    const [results, setResults] = React.useState<number[]>([]);
    const [lists, setLists] = React.useState<ListNode[]>([]);
    const [key, setKey] = React.useState(-1);
    const [finishedKeys, setFinishedKeys] = React.useState<number[]>([]);

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
            lists,
            setLists,
            minHeap,
            setMinHeap,
            results,
            setResults,
            key,
            setKey,
            finishedKeys,
            setFinishedKeys
        }}>
            {children}
            <div ref={ref}></div>
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
