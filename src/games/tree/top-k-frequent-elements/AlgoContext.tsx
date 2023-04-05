import React from "react";
import * as THREE from 'three';
import { clearScene, registerOrbitControls } from '../../../commons/three';
import MinHeap from "../../../data-structures/tree/heap/min-heap";
import { State } from "./AlgoState";

const AlgoContext = React.createContext<{
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    scene: THREE.Scene,
    animate: () => void,
    cancelAnimate: () => void,
    k: number,
    setK: React.Dispatch<React.SetStateAction<number>>,
    heap?: MinHeap<string>,
    setHeap: React.Dispatch<React.SetStateAction<MinHeap<string> | undefined>>,
    map?: Map<number, number>,
    setMap: React.Dispatch<React.SetStateAction<Map<number, number> | undefined>>,
    nums: number[],
    setNums: React.Dispatch<React.SetStateAction<number[]>>,
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    mapIndex: number,
    setMapIndex: React.Dispatch<React.SetStateAction<number>>,
    frequents: string[],
    setFrequents: React.Dispatch<React.SetStateAction<string[]>>,
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
    const [heap, setHeap] = React.useState<MinHeap<string>>();
    const [map, setMap] = React.useState<Map<number, number>>();
    const [nums, setNums] = React.useState<number[]>([]);
    const [index, setIndex] = React.useState(-1);
    const [mapIndex, setMapIndex] = React.useState(-1);
    const [frequents, setFrequents] = React.useState<string[]>([]);
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
