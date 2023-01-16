import React from "react";
import * as THREE from 'three';
import { clearScene, registerOrbitControls } from '../../../../commons/three';
import Queue from "../../../../data-structures/queue";
import TreeNode from "../../../../data-structures/tree/node";
import { Step } from "./algo";
import { State } from "../AlgoState";
import QueueName from "./queueName";

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
    queue?: Queue<string>,
    setQueue: React.Dispatch<React.SetStateAction<Queue<string> | undefined>>,
    queueName?: QueueName,
    setQueueName: React.Dispatch<React.SetStateAction<QueueName | undefined>>
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
    setQueue: () => { },
    setQueueName: () => { },
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
    const [queue, setQueue] = React.useState<Queue<string>>();
    const [queueName, setQueueName] = React.useState<QueueName>();

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
            queue,
            setQueue,
            queueName,
            setQueueName
        }}>
            {children}
            <div ref={ref}></div>
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
