import React from "react";
import * as THREE from 'three';
import Stack from '../../../data-structures/stack';
import Queue from '../../../data-structures/queue';
import { clearScene, registerOrbitControls } from '../../../commons/three';
import { stackPosition, queuePosition } from './styles';
import { State } from "./AlgoState";

const AlgoContext = React.createContext<{
    stack?: Stack<string>,
    queue?: Queue<string>,
    scene: THREE.Scene,
    duration: number,
    animate: () => void,
    cancelAnimate: () => void,
    displayActions: boolean,
    setDisplayActions: React.Dispatch<React.SetStateAction<boolean>>,
    success: boolean,
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
    activedKey: string | null,
    setActivedKey: React.Dispatch<React.SetStateAction<string | null>>,
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    parenthesisMap: Map<string, string>
}>({
    duration: 0,
    scene: new THREE.Scene(),
    animate: () => { },
    cancelAnimate: () => { },
    displayActions: false,
    setDisplayActions: () => { },
    success: false,
    setSuccess: () => { },
    activedKey: null,
    setActivedKey: () => { },
    state: State.Typing,
    setState: () => { },
    parenthesisMap: new Map<string, string>()
});

let animationFrameId = -1;

export const AlgoContextProvider: React.FC<{
    children: React.ReactNode,
    renderer: THREE.Renderer,
    camera: THREE.Camera,
    scene: THREE.Scene,
}> = ({ children, renderer, camera, scene }) => {
    const duration = 0.5;
    const ref = React.useRef<HTMLDivElement>(null);

    const [state, setState] = React.useState(State.Typing);
    const [queue, setQueue] = React.useState<Queue<string>>();
    const [stack, setStack] = React.useState<Stack<string>>();
    const [displayActions, setDisplayActions] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [activedKey, setActivedKey] = React.useState<string | null>(null);

    const parenthesisMap: Map<string, string> = new Map<string, string>();
    parenthesisMap.set(")", "(");
    parenthesisMap.set("]", "[");
    parenthesisMap.set("}", "{");

    function animate() {
        animationFrameId = requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    function cancelAnimate() {
        cancelAnimationFrame(animationFrameId);
    }

    React.useEffect(() => {

        const init = () => {
            clearScene(scene);
            setQueue(new Queue<string>(queuePosition, duration));
            setStack(new Stack<string>(stackPosition, duration));
            registerOrbitControls(camera, renderer, scene);
            renderer.render(scene, camera);
        }

        if (ref && ref.current) {
            init();
            ref.current.appendChild(renderer.domElement);
        }

        return () => cancelAnimationFrame(animationFrameId);
    }, [ref, renderer, scene, camera]);

    return (
        <AlgoContext.Provider value={{
            stack,
            queue,
            scene,
            animate,
            cancelAnimate,
            duration,
            displayActions,
            setDisplayActions,
            success,
            setSuccess,
            activedKey,
            setActivedKey,
            state,
            setState,
            parenthesisMap
        }}>
            {children}
            <div ref={ref}></div>
        </AlgoContext.Provider>
    )
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
