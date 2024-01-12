import React from "react";
import * as THREE from 'three';
import { State } from "../AlgoState";
import { clearScene } from "../../../../commons/three";
import { LinkedListNode } from "../../../../data-structures/list/linked-list/node.three";

const AlgoContext = React.createContext<{
    scene: THREE.Scene,
    animate: () => void,
    cancelAnimate: () => void,
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    node1?: LinkedListNode<number>,
    node2?: LinkedListNode<number>,
    setNode1: React.Dispatch<React.SetStateAction<LinkedListNode<number> | undefined>>,
    setNode2: React.Dispatch<React.SetStateAction<LinkedListNode<number> | undefined>>,
    linesToHighlight: number[],
    setLinesToHighlight: React.Dispatch<React.SetStateAction<number[]>>,
    current: LinkedListNode<number>,
    setCurrent: React.Dispatch<React.SetStateAction<LinkedListNode<number>>>,
    displayCode: boolean,
    setDisplayCode: React.Dispatch<React.SetStateAction<boolean>>,
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
}>({
    scene: new THREE.Scene(),
    animate: () => { },
    cancelAnimate: () => { },
    state: State.Typing,
    setState: () => { },
    setNode1: () => { },
    setNode2: () => { },
    linesToHighlight: [2],
    setLinesToHighlight: () => { },
    current: (null as any),
    setCurrent: () => { },
    displayCode: true,
    setDisplayCode: () => { },
    index: 0,
    setIndex: () => { },
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
    const [node1, setNode1] = React.useState<LinkedListNode<number>>();
    const [node2, setNode2] = React.useState<LinkedListNode<number>>();
    const [current, setCurrent] = React.useState<LinkedListNode<number>>((null as any));
    const [linesToHighlight, setLinesToHighlight] = React.useState<number[]>([2]);
    const [displayCode, setDisplayCode] = React.useState(true);
    const [index, setIndex] = React.useState(0);

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
            node1,
            node2,
            setNode1,
            setNode2,
            linesToHighlight,
            setLinesToHighlight,
            current,
            setCurrent,
            displayCode,
            setDisplayCode,
            index,
            setIndex,
        }}>
            {children}
            <div ref={ref} />
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
