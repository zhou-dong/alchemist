import React from "react";
import * as THREE from 'three';
import Stack from "../../../data-structures/stack";
import { clearScene, registerOrbitControls } from '../../../commons/three';

const AlgoContext = React.createContext<{
    stackA?: Stack<string>,
    stackB?: Stack<string>,
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
const stackAPosition = new THREE.Vector3();
const stackBPosition = new THREE.Vector3();

export const AlgoContextProvider: React.FC<{
    children: React.ReactNode,
    renderer: THREE.Renderer,
    camera: THREE.Camera,
    scene: THREE.Scene,
}> = ({ children, renderer, camera, scene }) => {

    const duration = 0.5;

    const [stackA, setStackA] = React.useState<Stack<string>>();
    const [stackB, setStackB] = React.useState<Stack<string>>();
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
            setStackA(new Stack<string>(stackAPosition, duration));
            setStackB(new Stack<string>(stackBPosition, duration));
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
                stackA,
                stackB,
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
