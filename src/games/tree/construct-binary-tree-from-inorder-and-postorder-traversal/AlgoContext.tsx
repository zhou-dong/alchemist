import React from "react";
import * as THREE from 'three';
import { clearScene, registerOrbitControls } from '../../../commons/three';
import { State } from "./AlgoState";
import { InputOutput } from "./algo";
import TreeNode from "../../../data-structures/tree/node";

const defaultInputOutput: InputOutput = { postorder: [], inorder: [], steps: [], xAxis: [], tree: [] };

const AlgoContext = React.createContext<{
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    duration: number,
    scene: THREE.Scene,
    animate: () => void,
    cancelAnimate: () => void,
    inputOutput: InputOutput,
    setInputOutput: React.Dispatch<React.SetStateAction<InputOutput>>,
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    map: Map<number, TreeNode<number>>,
    setMap: React.Dispatch<React.SetStateAction<Map<number, TreeNode<number>>>>,
}>({
    duration: 0,
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

    const duration = 1;
    const [state, setState] = React.useState(State.Typing);
    const [inputOutput, setInputOutput] = React.useState<InputOutput>(defaultInputOutput);
    const [index, setIndex] = React.useState(0);
    const [map, setMap] = React.useState<Map<number, TreeNode<number>>>(new Map());

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
            inputOutput,
            setInputOutput,
            scene,
            state,
            setState,
            duration,
            animate,
            cancelAnimate,
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
