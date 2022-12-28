import React from "react";
import * as THREE from 'three';
import { clearScene, registerOrbitControls } from '../../../commons/three';

const AlgoContext = React.createContext<{
    scene: THREE.Scene,
    duration: number,
    animate: () => void,
    cancelAnimate: () => void,
    actionsDisabled: boolean,
    setActionsDisabled: React.Dispatch<React.SetStateAction<boolean>>,
}>({
    duration: 0,
    scene: new THREE.Scene(),
    animate: () => { },
    cancelAnimate: () => { },
    actionsDisabled: false,
    setActionsDisabled: () => { },
});

let animationFrameId = -1;

export const AlgoContextProvider: React.FC<{
    children: React.ReactNode,
    renderer: THREE.Renderer,
    camera: THREE.Camera,
    scene: THREE.Scene,
}> = ({ children, renderer, camera, scene }) => {

    camera.position.z = 15;

    const duration = 0.5;
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
            scene,
            duration,
            animate,
            cancelAnimate,
            actionsDisabled,
            setActionsDisabled,
        }}>
            {children}
            <div ref={ref}></div>
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
