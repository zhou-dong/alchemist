import React from "react";
import * as THREE from 'three';
import { State } from "../AlgoState";
import { clearScene } from "../../../../commons/three";
import { LinkedListNode } from "../../../../data-structures/list/linked-list/node.three";
import { Stack } from "../../../../data-structures/stack/stack.three";
import { Item } from "./algo";
import Position from "../../../../data-structures/_commons/params/position.interface";

const AlgoContext = React.createContext<{
    scene: THREE.Scene,
    animate: () => void,
    cancelAnimate: () => void,
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    list: string,
    n: number,
    setList: React.Dispatch<React.SetStateAction<string>>,
    setN: React.Dispatch<React.SetStateAction<number>>,
    displayCode: boolean,
    setDisplayCode: React.Dispatch<React.SetStateAction<boolean>>,
    stack?: Stack,
    setStack: React.Dispatch<React.SetStateAction<Stack | undefined>>,
    items: Item[],
    setItems: React.Dispatch<React.SetStateAction<Item[]>>,
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    positionMap: Map<LinkedListNode<number>, Position>,
    setPositionMap: React.Dispatch<React.SetStateAction<Map<LinkedListNode<number>, Position>>>
}>({
    scene: new THREE.Scene(),
    animate: () => { },
    cancelAnimate: () => { },
    state: State.Typing,
    setState: () => { },
    list: "",
    n: 0,
    setList: () => { },
    setN: () => { },
    displayCode: true,
    setDisplayCode: () => { },
    setStack: () => { },
    items: [],
    setItems: () => { },
    index: 0,
    setIndex: () => { },
    positionMap: new Map(),
    setPositionMap: () => { }
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

    const [list, setList] = React.useState("");
    const [n, setN] = React.useState(0);
    const [displayCode, setDisplayCode] = React.useState(true);
    const [stack, setStack] = React.useState<Stack>();
    const [index, setIndex] = React.useState(0);
    const [items, setItems] = React.useState<Item[]>([]);
    const [positionMap, setPositionMap] = React.useState<Map<LinkedListNode<number>, Position>>(new Map());

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
            list,
            setList,
            n,
            setN,
            displayCode,
            setDisplayCode,
            stack,
            setStack,
            items,
            setItems,
            index,
            setIndex,
            positionMap,
            setPositionMap
        }}>
            {children}
            <div ref={ref} />
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
