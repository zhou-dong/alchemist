import React from "react";
import * as THREE from 'three';
import { clearScene, registerOrbitControls } from '../../../commons/three';
import { State } from "./AlgoState";
import { Step } from "./algo";

const AlgoContext = React.createContext<{
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    duration: number,
    scene: THREE.Scene,
    animate: () => void,
    cancelAnimate: () => void,
    steps: Step[],
    setSteps: React.Dispatch<React.SetStateAction<Step[]>>,
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
}>({
    duration: 0,
    state: State.Typing,
    setState: () => { },
    scene: new THREE.Scene(),
    animate: () => { },
    cancelAnimate: () => { },
    steps: [],
    setSteps: () => { },
    index: 0,
    setIndex: () => { },
});

let animationFrameId = -1;

export const AlgoContextProvider: React.FC<{
    children: React.ReactNode,
    renderer: THREE.Renderer,
    camera: THREE.Camera,
    scene: THREE.Scene,
}> = ({ children, renderer, camera, scene }) => {

    camera.position.z = 20;
    const duration = 1;
    const [state, setState] = React.useState(State.Typing);
    const [steps, setSteps] = React.useState<Step[]>([]);
    const [index, setIndex] = React.useState(0);

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
            steps,
            setSteps,
            scene,
            state,
            setState,
            duration,
            animate,
            cancelAnimate,
            index,
            setIndex,
        }}>
            {children}
            <div ref={ref}></div>
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};