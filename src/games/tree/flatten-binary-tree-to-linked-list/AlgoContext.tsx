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
    root?: TreeNode<string>,
    setRoot: React.Dispatch<React.SetStateAction<TreeNode<string> | undefined>>,
    treeNodeMap: Map<number, TreeNode<string>>,
    setTreeNodeMap: React.Dispatch<React.SetStateAction<Map<number, TreeNode<string>>>>
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
    treeNodeMap: new Map(),
    setTreeNodeMap: () => { }
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
    const [root, setRoot] = React.useState<TreeNode<string>>();
    const [steps, setSteps] = React.useState<Step[]>([]);
    const [index, setIndex] = React.useState(0);
    const [treeNodeMap, setTreeNodeMap] = React.useState<Map<number, TreeNode<string>>>(new Map());

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
            treeNodeMap,
            setTreeNodeMap
        }}>
            {children}
            <div ref={ref}></div>
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
