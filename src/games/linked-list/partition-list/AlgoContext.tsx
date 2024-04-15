import React from "react";
import * as THREE from 'three';
import { State } from "./AlgoState";
import { clearScene } from "../../../commons/three";
import { Step } from "./algo";
import { LinkedListNode } from "../../../data-structures/list/linked-list/node.three";

const AlgoContext = React.createContext<{
    scene: THREE.Scene,
    animate: () => void,
    cancelAnimate: () => void,
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    displayCode: boolean,
    setDisplayCode: React.Dispatch<React.SetStateAction<boolean>>,
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    steps: Step[],
    setSteps: React.Dispatch<React.SetStateAction<Step[]>>,
    x?: number,
    setX: React.Dispatch<React.SetStateAction<number | undefined>>,
    list?: LinkedListNode<number>,
    setList: React.Dispatch<React.SetStateAction<LinkedListNode<number> | undefined>>,
    smallDummy?: LinkedListNode<number>,
    setSmallDummy: React.Dispatch<React.SetStateAction<LinkedListNode<number> | undefined>>,
    largeDummy?: LinkedListNode<number>,
    setLargeDummy: React.Dispatch<React.SetStateAction<LinkedListNode<number> | undefined>>,
    small?: LinkedListNode<number>,
    setSmall: React.Dispatch<React.SetStateAction<LinkedListNode<number> | undefined>>,
    large?: LinkedListNode<number>,
    setLarge: React.Dispatch<React.SetStateAction<LinkedListNode<number> | undefined>>,
    current?: LinkedListNode<number>,
    setCurrent: React.Dispatch<React.SetStateAction<LinkedListNode<number> | undefined>>,
}>({
    scene: new THREE.Scene(),
    animate: () => { },
    cancelAnimate: () => { },
    state: State.Typing,
    setState: () => { },
    displayCode: true,
    setDisplayCode: () => { },
    steps: [],
    setSteps: () => { },
    index: 0,
    setIndex: () => { },
    setX: () => { },
    setList: () => { },
    setSmallDummy: () => { },
    setLargeDummy: () => { },
    setSmall: () => { },
    setLarge: () => { },
    setCurrent: () => { },
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
    const [index, setIndex] = React.useState(0);
    const [steps, setSteps] = React.useState<Step[]>([]);
    const [x, setX] = React.useState<number>();

    const [list, setList] = React.useState<LinkedListNode<number>>();
    const [smallDummy, setSmallDummy] = React.useState<LinkedListNode<number>>();
    const [largeDummy, setLargeDummy] = React.useState<LinkedListNode<number>>();
    const [small, setSmall] = React.useState<LinkedListNode<number>>();
    const [large, setLarge] = React.useState<LinkedListNode<number>>();
    const [current, setCurrent] = React.useState<LinkedListNode<number>>();

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
            steps,
            setSteps,
            index,
            setIndex,
            x,
            setX,
            list,
            setList,
            smallDummy,
            setSmallDummy,
            largeDummy,
            setLargeDummy,
            small,
            setSmall,
            large,
            setLarge,
            current,
            setCurrent
        }}>
            {children}
            <div ref={ref} />
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
