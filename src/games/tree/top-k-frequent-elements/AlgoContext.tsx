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
    heap?: MinHeap<number>,
    setHeap: React.Dispatch<React.SetStateAction<MinHeap<number> | undefined>>,
    topElements: number[],
    setTopElements: React.Dispatch<React.SetStateAction<number[]>>,
    map?: Map<number, number>,
    setMap: React.Dispatch<React.SetStateAction<Map<number, number> | undefined>>,
    nums: number[],
    setNums: React.Dispatch<React.SetStateAction<number[]>>,
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>
}>({
    state: State.Typing,
    setState: () => { },
    scene: new THREE.Scene(),
    animate: () => { },
    cancelAnimate: () => { },
    k: 0,
    setK: () => { },
    setHeap: () => { },
    topElements: [],
    setTopElements: () => { },
    setMap: () => { },
    nums: [],
    setNums: () => { },
    index: -1,
    setIndex: () => { }
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
    const [heap, setHeap] = React.useState<MinHeap<number>>();
    const [topElements, setTopElements] = React.useState<number[]>([]);
    const [map, setMap] = React.useState<Map<number, number>>();
    const [nums, setNums] = React.useState<number[]>([]);
    const [index, setIndex] = React.useState(-1);

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
            topElements,
            setTopElements,
            map,
            setMap,
            nums,
            setNums,
            index,
            setIndex
        }}>
            {children}
            <div ref={ref}></div>
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
