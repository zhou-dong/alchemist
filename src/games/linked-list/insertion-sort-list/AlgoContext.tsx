import React from "react";
import * as THREE from 'three';
import { State } from "./AlgoState";
import { clearScene } from "../../../commons/three";
import { Step } from "./stepsBuilder";
import { LinkedListNode } from "../../../data-structures/list/linked-list/node.three";

const AlgoContext = React.createContext<{
    scene: THREE.Scene,
    animate: () => void,
    cancelAnimate: () => void,
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    steps: Step[],
    setSteps: React.Dispatch<React.SetStateAction<Step[]>>,
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    displayCode: boolean,
    setDisplayCode: React.Dispatch<React.SetStateAction<boolean>>,
    head?: LinkedListNode<number | string>,
    setHead: React.Dispatch<React.SetStateAction<LinkedListNode<number | string> | undefined>>
    dummyHead?: LinkedListNode<number | string>,
    setDummyHead: React.Dispatch<React.SetStateAction<LinkedListNode<number | string> | undefined>>
}>({
    scene: new THREE.Scene(),
    animate: () => { },
    cancelAnimate: () => { },
    state: State.Typing,
    setState: () => { },
    steps: [],
    setSteps: () => { },
    index: 0,
    setIndex: () => { },
    displayCode: true,
    setDisplayCode: () => { },
    setHead: () => { },
    setDummyHead: () => { },
});

let animationFrameId = -1;

export const AlgoContextProvider: React.FC<{
    children: React.ReactNode,
    renderer: THREE.Renderer,
    camera: THREE.Camera,
    scene: THREE.Scene
}> = ({ children, renderer, camera, scene }) => {

    camera.position.z = 20;
    const [state, setState] = React.useState(State.Typing);
    const [steps, setSteps] = React.useState<Step[]>([]);
    const [index, setIndex] = React.useState(0);
    const [displayCode, setDisplayCode] = React.useState(true);
    const [head, setHead] = React.useState<LinkedListNode<number | string>>();
    const [dummyHead, setDummyHead] = React.useState<LinkedListNode<number | string>>();

    function animate() {
        animationFrameId = requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    function cancelAnimate() {
        cancelAnimationFrame(animationFrameId);
    }

    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(
        () => {
            function init() {
                clearScene(scene);
                renderer.render(scene, camera);
            }
            if (ref && ref.current) {
                init();
                ref.current.appendChild(renderer.domElement);
            }
        },
        [ref, renderer, scene, camera]
    );

    return (
        <AlgoContext.Provider value={{
            scene,
            animate,
            cancelAnimate,
            state,
            setState,
            steps,
            setSteps,
            index,
            setIndex,
            displayCode,
            setDisplayCode,
            head,
            setHead,
            dummyHead,
            setDummyHead
        }}>
            {children}
            <div ref={ref} />
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
