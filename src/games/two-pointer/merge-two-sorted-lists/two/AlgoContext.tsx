import React from "react";
import * as THREE from 'three';
import { State } from "./AlgoState";
import { Step } from "./algo";
import { clearScene } from "../../../../commons/three";

const AlgoContext = React.createContext<{
    scene: THREE.Scene,
    animate: () => void,
    cancelAnimate: () => void,
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    actions: Step[],
    setActions: React.Dispatch<React.SetStateAction<Step[]>>
}>({
    scene: new THREE.Scene(),
    animate: () => { },
    cancelAnimate: () => { },
    state: State.Typing,
    setState: () => { },
    index: 0,
    setIndex: () => { },
    actions: [],
    setActions: () => { }
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

    function animate() {
        animationFrameId = requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    function cancelAnimate() {
        cancelAnimationFrame(animationFrameId);
    }

    function init() {
        clearScene(scene);
        renderer.render(scene, camera);
    }

    init();

    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(
        () => { ref?.current?.appendChild(renderer.domElement) },
        [ref, renderer]
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
            setActions
        }}>
            {children}
            <div ref={ref} />
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
