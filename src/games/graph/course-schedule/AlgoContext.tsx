import React from "react";
import * as THREE from 'three';
import { clearScene, registerOrbitControls } from '../../../commons/three';
import TreeNode from "../../../data-structures/tree/nodes/v1/node";
import { Step } from "./algo";
import { State } from "./AlgoState";

const AlgoContext = React.createContext<{
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    scene: THREE.Scene,
    animate: () => void,
    cancelAnimate: () => void,
    steps: Step[],
    setSteps: React.Dispatch<React.SetStateAction<Step[]>>,
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    depthTree?: TreeNode<string | number | null>,
    setDepthTree: React.Dispatch<React.SetStateAction<TreeNode<string | number | null> | undefined>>,
    root?: TreeNode<string | number | null>,
    setRoot: React.Dispatch<React.SetStateAction<TreeNode<string | number | null> | undefined>>,
    depthTreeSteps: Step[],
    setDepthTreeSteps: React.Dispatch<React.SetStateAction<Step[]>>,
}>({
    state: State.Typing,
    setState: () => { },
    scene: new THREE.Scene(),
    animate: () => { },
    cancelAnimate: () => { },
    setRoot: () => { },
    steps: [],
    setSteps: () => { },
    index: 0,
    setIndex: () => { },
    setDepthTree: () => { },
    depthTreeSteps: [],
    setDepthTreeSteps: () => { }
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
    const [root, setRoot] = React.useState<TreeNode<string | number | null>>();
    const [steps, setSteps] = React.useState<Step[]>([]);
    const [index, setIndex] = React.useState(0);
    const [depthTree, setDepthTree] = React.useState<TreeNode<string | number | null>>();
    const [depthTreeSteps, setDepthTreeSteps] = React.useState<Step[]>([]);

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
            root,
            setRoot,
            steps,
            setSteps,
            index,
            setIndex,
            depthTree,
            setDepthTree,
            depthTreeSteps,
            setDepthTreeSteps
        }}>
            {children}
            <div ref={ref}></div>
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
