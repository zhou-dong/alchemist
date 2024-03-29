import React from "react";
import * as THREE from 'three';
import { State } from "./AlgoState";
import { clearScene } from "../../../commons/three";
import { LinkedListNode } from "../../../data-structures/list/linked-list/node.three";

const AlgoContext = React.createContext<{
    scene: THREE.Scene,
    animate: () => void,
    cancelAnimate: () => void,
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    displayCode: boolean,
    setDisplayCode: React.Dispatch<React.SetStateAction<boolean>>,
    head?: LinkedListNode<number>,
    current?: LinkedListNode<number>,
    setHead: React.Dispatch<React.SetStateAction<LinkedListNode<number> | undefined>>,
    setCurrent: React.Dispatch<React.SetStateAction<LinkedListNode<number> | undefined>>,
    linesToHighlight: number[],
    setLinesToHighlight: React.Dispatch<React.SetStateAction<number[]>>
}>({
    scene: new THREE.Scene(),
    animate: () => { },
    cancelAnimate: () => { },
    state: State.Typing,
    setState: () => { },
    displayCode: true,
    setDisplayCode: () => { },
    setHead: () => { },
    setCurrent: () => { },
    linesToHighlight: [],
    setLinesToHighlight: () => { }
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
    const [displayCode, setDisplayCode] = React.useState(true);
    const [head, setHead] = React.useState<LinkedListNode<number>>();
    const [current, setCurrent] = React.useState<LinkedListNode<number>>();
    const [linesToHighlight, setLinesToHighlight] = React.useState<number[]>([2]);

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
            displayCode,
            setDisplayCode,
            head,
            setHead,
            current,
            setCurrent,
            linesToHighlight,
            setLinesToHighlight
        }}>
            {children}
            <div ref={ref} />
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
