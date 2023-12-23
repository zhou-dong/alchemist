import React from "react";
import * as THREE from 'three';
import { State } from "./AlgoState";
import { Step } from "./algo";
import { clearScene, registerOrbitControls } from "../../../../commons/three";
import { LinkedList } from "../../../../data-structures/list/doubly-linked-list/list.three";

const AlgoContext = React.createContext<{
    scene: THREE.Scene,
    animate: () => void,
    cancelAnimate: () => void,
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    actions: Step[],
    setActions: React.Dispatch<React.SetStateAction<Step[]>>,
    list: LinkedList<number>,
    setList: React.Dispatch<React.SetStateAction<LinkedList<number>>>
}>({
    scene: new THREE.Scene(),
    animate: () => { },
    cancelAnimate: () => { },
    state: State.Typing,
    setState: () => { },
    index: 0,
    setIndex: () => { },
    actions: [],
    setActions: () => { },
    list: (null as any),
    setList: () => { }
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
    const [index, setIndex] = React.useState(0);
    const [actions, setActions] = React.useState<Step[]>([]);

    const [list, setList] = React.useState<LinkedList<number>>(null as any);

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
            index,
            setIndex,
            actions,
            setActions,
            list,
            setList
        }}>
            {children}
            <div ref={ref} />
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
