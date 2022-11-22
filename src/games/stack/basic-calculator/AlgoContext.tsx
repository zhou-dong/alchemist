import React from "react";
import * as THREE from 'three';
import Stack from "../../../data-structures/stack";
import { clearScene, registerOrbitControls } from '../../../commons/three';
import StackShellBuilder from "./stackShellBuilder";
import { stackPosition } from "./stackStyles";
import StackName from "./stackName";
import { State } from "./AlgoState";

const AlgoContext = React.createContext<{
    stack?: Stack<string>,
    stackName?: StackName,
    scene: THREE.Scene,
    duration: number,
    animate: () => void,
    cancelAnimate: () => void,
    actionsDisabled: boolean,
    setActionsDisabled: React.Dispatch<React.SetStateAction<boolean>>,
    minShellSize: number,
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    success: boolean,
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
}>({
    duration: 0,
    scene: new THREE.Scene(),
    animate: () => { },
    cancelAnimate: () => { },
    actionsDisabled: false,
    setActionsDisabled: () => { },
    minShellSize: 0,
    state: State.Typing,
    setState: () => { },
    success: false,
    setSuccess: () => { },
});

let animationFrameId = -1;

export const AlgoContextProvider: React.FC<{
    children: React.ReactNode,
    renderer: THREE.Renderer,
    camera: THREE.Camera,
    scene: THREE.Scene,
}> = ({ children, renderer, camera, scene }) => {

    const duration = 0.5;
    const minShellSize = 6;

    const [state, setState] = React.useState(State.Typing);
    const [stack, setStack] = React.useState<Stack<string>>();
    const [actionsDisabled, setActionsDisabled] = React.useState(false);
    const [stackName, setStackName] = React.useState<StackName>();
    const [success, setSuccess] = React.useState(false);

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
            const stack = new Stack<string>(stackPosition.stack, duration);
            for (let i = 0; i < minShellSize; i++) {
                stack.increaseShells(new StackShellBuilder(scene, true).build());
            }
            setStackName(new StackName("Stack", stackPosition.name, scene));
            setStack(stack);
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
            state,
            setState,
            stackName,
            stack,
            scene,
            duration,
            animate,
            cancelAnimate,
            actionsDisabled,
            setActionsDisabled,
            minShellSize,
            success,
            setSuccess
        }}>
            {children}
            <div ref={ref}></div>
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
