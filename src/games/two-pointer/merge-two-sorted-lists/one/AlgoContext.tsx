import React from "react";
import * as THREE from 'three';
import { State } from "./AlgoState";
import { clearScene, registerOrbitControls } from "../../../../commons/three";
import { LinkedListNode } from "../../../../data-structures/list/linked-list/node.three";
import { Action } from "./code";

const AlgoContext = React.createContext<{
    scene: THREE.Scene,
    animate: () => void,
    cancelAnimate: () => void,
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    list1?: LinkedListNode<number>,
    list2?: LinkedListNode<number>,
    setList1: React.Dispatch<React.SetStateAction<LinkedListNode<number> | undefined>>,
    setList2: React.Dispatch<React.SetStateAction<LinkedListNode<number> | undefined>>,
    actions: Action[],
    setActions: React.Dispatch<React.SetStateAction<Action[]>>,
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>
}>({
    scene: new THREE.Scene(),
    animate: () => { },
    cancelAnimate: () => { },
    state: State.Typing,
    setState: () => { },
    setList1: () => { },
    setList2: () => { },
    actions: [],
    setActions: () => { },
    index: 0,
    setIndex: () => { }
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
    const [actions, setActions] = React.useState<Action[]>([]);
    const [index, setIndex] = React.useState(0);
    const [list1, setList1] = React.useState<LinkedListNode<number>>();
    const [list2, setList2] = React.useState<LinkedListNode<number>>();

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
                registerOrbitControls(camera, renderer, scene);
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
            list1,
            list2,
            setList1,
            setList2,
            actions,
            setActions,
            index,
            setIndex
        }}>
            {children}
            <div ref={ref} />
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
