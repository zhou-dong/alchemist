import React from "react";
import * as THREE from 'three';
import Stack from "../../../data-structures/stack";
import { clearScene, registerOrbitControls } from '../../../commons/three';
import StackShellBuilder from "./stackShellBuilder";
import { stackInPosition, stackOutPosition } from "./styles";
import StackName from "./stackName";

const AlgoContext = React.createContext<{
    stackIn?: Stack<string>,
    stackOut?: Stack<string>,
    scene: THREE.Scene,
    duration: number,
    animate: () => void,
    cancelAnimate: () => void,
    actionsDisabled: boolean,
    setActionsDisabled: React.Dispatch<React.SetStateAction<boolean>>,
    minShellSize: number,
}>({
    duration: 0,
    scene: new THREE.Scene(),
    animate: () => { },
    cancelAnimate: () => { },
    actionsDisabled: false,
    setActionsDisabled: () => { },
    minShellSize: 0
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

    const [stackIn, setStackIn] = React.useState<Stack<string>>();
    const [stackOut, setStackOut] = React.useState<Stack<string>>();
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

            const sIn = new Stack<string>(stackInPosition.stack, duration);
            const sOut = new Stack<string>(stackOutPosition.stack, duration);

            for (let i = 0; i < minShellSize; i++) {
                sIn.increaseShells(new StackShellBuilder(scene, true).build())
                sOut.increaseShells(new StackShellBuilder(scene, true).build())
            }

            new StackName("Stack In", stackInPosition.name, scene);
            new StackName("Stack Out", stackOutPosition.name, scene);

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
        <AlgoContext.Provider value={{
            stackIn,
            stackOut,
            scene,
            duration,
            animate,
            cancelAnimate,
            actionsDisabled,
            setActionsDisabled,
            minShellSize
        }}>
            {children}
            <div ref={ref}></div>
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
