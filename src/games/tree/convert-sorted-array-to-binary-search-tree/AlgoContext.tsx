import React from "react";
import * as THREE from 'three';
import { clearScene } from '../../../commons/three';
import { InputOutput } from "./algo";
import { State } from "./AlgoState";
import TreeNode from "../../../data-structures/tree/nodes/v1/node";

const defaultInputOutput: InputOutput = { input: [], steps: [], xAxis: [] };

const AlgoContext = React.createContext<{
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    scene: THREE.Scene,
    animate: () => void,
    cancelAnimate: () => void,
    inputOutput: InputOutput,
    setInputOutput: React.Dispatch<React.SetStateAction<InputOutput>>,
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    map: Map<number, TreeNode<string>>,
    setMap: React.Dispatch<React.SetStateAction<Map<number, TreeNode<string>>>>,
}>({
    state: State.Typing,
    setState: () => { },
    scene: new THREE.Scene(),
    animate: () => { },
    cancelAnimate: () => { },
    inputOutput: defaultInputOutput,
    setInputOutput: () => { },
    index: 0,
    setIndex: () => { },
    map: new Map(),
    setMap: () => { }
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
    const [inputOutput, setInputOutput] = React.useState<InputOutput>(defaultInputOutput);
    const [index, setIndex] = React.useState(0);
    const [map, setMap] = React.useState<Map<number, TreeNode<string>>>(new Map());

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
            inputOutput,
            setInputOutput,
            index,
            setIndex,
            map,
            setMap
        }}>
            {children}
            <div ref={ref}></div>
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
