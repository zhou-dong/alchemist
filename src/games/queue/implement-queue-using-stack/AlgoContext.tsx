import React from "react";
import * as THREE from 'three';
import Stack from "../../../data-structures/stack";
import { clearScene, registerOrbitControls } from '../../../commons/three';

const AlgoContext = React.createContext<{
    stackIn?: Stack<string>,
    stackOut?: Stack<string>,
    scene: THREE.Scene,
    duration: number,
    animate: () => void,
    cancelAnimate: () => void,
    success: boolean,
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
}>({
    duration: 0,
    scene: new THREE.Scene(),
    animate: () => { },
    cancelAnimate: () => { },
    success: false,
    setSuccess: () => { },
});

let animationFrameId = -1;
const stackAPosition = new THREE.Vector3(0, 0, 0);
const stackBPosition = new THREE.Vector3(0, 2, 0);

export const AlgoContextProvider: React.FC<{
    children: React.ReactNode,
    renderer: THREE.Renderer,
    camera: THREE.Camera,
    scene: THREE.Scene,
}> = ({ children, renderer, camera, scene }) => {

    const duration = 0.5;

    const [stackIn, setStackIn] = React.useState<Stack<string>>();
    const [stackOut, setStackOut] = React.useState<Stack<string>>();
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
            setStackIn(new Stack<string>(stackAPosition, duration));
            setStackOut(new Stack<string>(stackBPosition, duration));
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
