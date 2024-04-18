import React from "react";
import * as THREE from 'three';
import { clearScene } from '../../../commons/three';
import Stack from "../../../data-structures/stack";
import TreeNode from "../../../data-structures/tree/nodes/v1/node";
import { State } from "./AlgoState";
import StackName from "./stackName";

const AlgoContext = React.createContext<{
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    scene: THREE.Scene,
    animate: () => void,
    cancelAnimate: () => void,
    root?: TreeNode<string>,
    setRoot: React.Dispatch<React.SetStateAction<TreeNode<string> | undefined>>,
    stack?: Stack<string>,
    setStack: React.Dispatch<React.SetStateAction<Stack<string> | undefined>>
    stackName?: StackName,
    setStackName: React.Dispatch<React.SetStateAction<StackName | undefined>>,
    treeNodeStack: TreeNode<string>[],
    setTreeNodeStack: React.Dispatch<React.SetStateAction<TreeNode<string>[]>>
}>({
    state: State.Typing,
    setState: () => { },
    scene: new THREE.Scene(),
    animate: () => { },
    cancelAnimate: () => { },
    setRoot: () => { },
    setStack: () => { },
    setStackName: () => { },
    treeNodeStack: [],
    setTreeNodeStack: () => { }
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
    const [stack, setStack] = React.useState<Stack<string>>();
    const [stackName, setStackName] = React.useState<StackName>();
    const [treeNodeStack, setTreeNodeStack] = React.useState<TreeNode<string>[]>([]);

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
            root,
            setRoot,
            stack,
            setStack,
            stackName,
            setStackName,
            treeNodeStack,
            setTreeNodeStack
        }}>
            {children}
            <div ref={ref}></div>
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
