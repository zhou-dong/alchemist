import React from "react";
import * as THREE from 'three';
import { clearScene } from '../../../commons/three';
import MinHeap from "../../../data-structures/tree/heap/min-heap";
import { State } from "./AlgoState";

const AlgoContext = React.createContext<{
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    scene: THREE.Scene,
    animate: () => void,
    cancelAnimate: () => void,
    n?: number,
    setN: React.Dispatch<React.SetStateAction<number | undefined>>,
    minHeap?: MinHeap<number>,
    setMinHeap: React.Dispatch<React.SetStateAction<MinHeap<number> | undefined>>,
    result?: number,
    setResult: React.Dispatch<React.SetStateAction<number | undefined>>,
    seen?: Set<number>,
    setSeen: React.Dispatch<React.SetStateAction<Set<number> | undefined>>,
    factorIndex?: number,
    setFactorIndex: React.Dispatch<React.SetStateAction<number | undefined>>,
    tip?: string,
    setTip: React.Dispatch<React.SetStateAction<string | undefined>>
}>({
    state: State.Typing,
    setState: () => { },
    scene: new THREE.Scene(),
    animate: () => { },
    cancelAnimate: () => { },
    setMinHeap: () => { },
    n: 0,
    setN: () => { },
    setResult: () => { },
    setSeen: () => { },
    setFactorIndex: () => { },
    setTip: () => { }
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
    const [n, setN] = React.useState<number>();
    const [minHeap, setMinHeap] = React.useState<MinHeap<number>>();
    const [result, setResult] = React.useState<number>();
    const [seen, setSeen] = React.useState<Set<number>>();
    const [factorIndex, setFactorIndex] = React.useState<number>();
    const [tip, setTip] = React.useState<string>();

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
            n,
            setN,
            minHeap,
            setMinHeap,
            result,
            setResult,
            seen,
            setSeen,
            factorIndex,
            setFactorIndex,
            tip,
            setTip
        }}>
            {children}
            <div ref={ref}></div>
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
