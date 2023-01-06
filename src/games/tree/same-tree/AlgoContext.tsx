import React from "react";
import * as THREE from 'three';
import { clearScene, registerOrbitControls } from '../../../commons/three';
import TreeNode from "../../../data-structures/tree/node";
import { Step } from "./algo";
import { State } from "./AlgoState";

const AlgoContext = React.createContext<{
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    scene: THREE.Scene,
    animate: () => void,
    cancelAnimate: () => void,
    p?: TreeNode<string>,
    setP: React.Dispatch<React.SetStateAction<TreeNode<string> | undefined>>,
    q?: TreeNode<string>,
    setQ: React.Dispatch<React.SetStateAction<TreeNode<string> | undefined>>,
    steps: Step[],
    setSteps: React.Dispatch<React.SetStateAction<Step[]>>,
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    falseNodes: TreeNode<string>[],
    setFalseNodes: React.Dispatch<React.SetStateAction<TreeNode<string>[]>>,
}>({
    state: State.Typing,
    setState: () => { },
    scene: new THREE.Scene(),
    animate: () => { },
    cancelAnimate: () => { },
    setP: () => { },
    setQ: () => { },
    steps: [],
    setSteps: () => { },
    index: 0,
    setIndex: () => { },
    falseNodes: [],
    setFalseNodes: () => { }
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
    const [index, setIndex] = React.useState(0);
    const [p, setP] = React.useState<TreeNode<string>>();
    const [q, setQ] = React.useState<TreeNode<string>>();
    const [steps, setSteps] = React.useState<Step[]>([]);
    const [falseNodes, setFalseNodes] = React.useState<TreeNode<string>[]>([]);

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
            steps,
            setSteps,
            index,
            setIndex,
            p,
            setP,
            q,
            setQ,
            falseNodes,
            setFalseNodes
        }}>
            {children}
            <div ref={ref}></div>
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
