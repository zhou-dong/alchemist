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
    k: number,
    setK: React.Dispatch<React.SetStateAction<number>>,
    heap?: MinHeap<number>,
    setHeap: React.Dispatch<React.SetStateAction<MinHeap<number> | undefined>>,
    kthLargestValue?: number | undefined,
    setKthLargestValue: React.Dispatch<React.SetStateAction<number | undefined>>
}>({
    state: State.Typing,
    setState: () => { },
    scene: new THREE.Scene(),
    animate: () => { },
    cancelAnimate: () => { },
    k: 0,
    setK: () => { },
    setHeap: () => { },
    setKthLargestValue: () => { }
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
    const [kthLargestValue, setKthLargestValue] = React.useState<number>();

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
            kthLargestValue,
            setKthLargestValue
        }}>
            {children}
            <div ref={ref}></div>
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
