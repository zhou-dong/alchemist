import React from "react";
import * as THREE from 'three';
import { clearScene } from '../../../commons/three';
import { State } from "./AlgoState";
import DualHeap from "./DualHeap";
import { Step } from "./algo";

const AlgoContext = React.createContext<{
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    scene: THREE.Scene,
    animate: () => void,
    cancelAnimate: () => void,
    k: number,
    setK: React.Dispatch<React.SetStateAction<number>>,
    nums: number[],
    setNums: React.Dispatch<React.SetStateAction<number[]>>,
    result: number[],
    setResult: React.Dispatch<React.SetStateAction<number[]>>,
    dualHeap?: DualHeap,
    setDualHeap: React.Dispatch<React.SetStateAction<DualHeap | undefined>>,
    steps: Step[],
    setSteps: React.Dispatch<React.SetStateAction<Step[]>>,
    stepIndex: number,
    setStepIndex: React.Dispatch<React.SetStateAction<number>>
}>({
    state: State.Typing,
    setState: () => { },
    scene: new THREE.Scene(),
    animate: () => { },
    cancelAnimate: () => { },
    k: 0,
    setK: () => { },
    nums: [],
    setNums: () => { },
    result: [],
    setResult: () => { },
    setDualHeap: () => { },
    steps: [],
    setSteps: () => { },
    stepIndex: 0,
    setStepIndex: () => { }
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
    const [nums, setNums] = React.useState<number[]>([]);
    const [k, setK] = React.useState(0);
    const [dualHeap, setDualHeap] = React.useState<DualHeap>();
    const [result, setResult] = React.useState<number[]>([]);
    const [steps, setSteps] = React.useState<Step[]>([]);
    const [stepIndex, setStepIndex] = React.useState(0);

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
            nums,
            setNums,
            result,
            setResult,
            dualHeap,
            setDualHeap,
            steps,
            setSteps,
            stepIndex,
            setStepIndex
        }}>
            {children}
            <div ref={ref}></div>
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
