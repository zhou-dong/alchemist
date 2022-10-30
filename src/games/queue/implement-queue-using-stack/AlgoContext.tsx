import React from "react";
import * as THREE from 'three';
import Stack from "../../../data-structures/stack";
import { clearScene, registerOrbitControls } from '../../../commons/three';
import StackShellBuilder from "./stackShellBuilder";

const AlgoContext = React.createContext<{
    stackIn?: Stack<string>,
    stackOut?: Stack<string>,
    scene: THREE.Scene,
    duration: number,
    animate: () => void,
    cancelAnimate: () => void,
    success: boolean,
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
    actionsDisabled: boolean,
    setActionsDisabled: React.Dispatch<React.SetStateAction<boolean>>,
    minShellSize: number,
}>({
    duration: 0,
    scene: new THREE.Scene(),
    animate: () => { },
    cancelAnimate: () => { },
    success: false,
    setSuccess: () => { },
    actionsDisabled: false,
    setActionsDisabled: () => { },
    minShellSize: 0
});

let animationFrameId = -1;
const stackAPosition = new THREE.Vector3(-3, 3, -4);
const stackBPosition = new THREE.Vector3(-3, 0, -4);

export const AlgoContextProvider: React.FC<{
    children: React.ReactNode,
    renderer: THREE.Renderer,
    camera: THREE.Camera,
    scene: THREE.Scene,
}> = ({ children, renderer, camera, scene }) => {

    const duration = 0.5;
    const minShellSize = 5;

    const [stackIn, setStackIn] = React.useState<Stack<string>>();
    const [stackOut, setStackOut] = React.useState<Stack<string>>();
    const [success, setSuccess] = React.useState(false);
    const [actionsDisabled, setActionsDisabled] = React.useState(false);

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

            const sIn = new Stack<string>(stackAPosition, duration);
            const sOut = new Stack<string>(stackBPosition, duration);

            for (let i = 0; i < minShellSize; i++) {
                sIn.increaseShells(new StackShellBuilder(scene, true).build())
                sOut.increaseShells(new StackShellBuilder(scene, true).build())
            }

            setStackIn(sIn);
            setStackOut(sOut);
            registerOrbitControls(camera, renderer, scene);
            renderer.render(scene, camera);
        }

        if (ref && ref.current) {
            init();
            ref.current.appendChild(renderer.domElement);
        }
    }, [ref, renderer, scene, camera]);

    return (
        <>
            <AlgoContext.Provider value={{
                stackIn,
                stackOut,
                scene,
                duration,
                animate,
                cancelAnimate,
                success,
                setSuccess,
                actionsDisabled,
                setActionsDisabled,
                minShellSize
            }}>
                {children}
                <div ref={ref}></div>
            </AlgoContext.Provider>
        </>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
