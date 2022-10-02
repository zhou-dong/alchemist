import React from "react";
import * as THREE from 'three';
import Stack from '../../../data-structures/stack';
import Queue from '../../../data-structures/queue';
import { clearScene, registerOrbitControls } from '../../../commons/three';
import { stackShellParams, queueShellParams } from './styles';

const ContainerContext = React.createContext<{
    stack?: Stack<string>,
    queue?: Queue<string>,
    scene: THREE.Scene;
    duration: number;
    animate: () => void;
    cancelAnimate: () => void;
    displayActions: boolean;
    setDisplayActions: React.Dispatch<React.SetStateAction<boolean>>
}>({
    duration: 0,
    scene: new THREE.Scene(),
    animate: () => { },
    cancelAnimate: () => { },
    displayActions: false,
    setDisplayActions: () => { }
});


let animationFrameId = -1;

export const ContainerProvider: React.FC<{
    children: React.ReactNode,
    renderer: THREE.Renderer,
    camera: THREE.Camera,
    scene: THREE.Scene,
}> = ({ children, renderer, camera, scene }) => {
    const duration = 0.5;
    const ref = React.useRef<HTMLDivElement>(null);

    const [queue, setQueue] = React.useState<Queue<string>>();
    const [stack, setStack] = React.useState<Stack<string>>();
    const [displayActions, setDisplayActions] = React.useState(false);

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
            setQueue(new Queue<string>(queueShellParams.position, duration));
            setStack(new Stack<string>(stackShellParams.position, duration));
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
        <ContainerContext.Provider value={{ stack, queue, scene, animate, cancelAnimate, duration, displayActions, setDisplayActions }}>
            {children}
            <div ref={ref}></div>
        </ContainerContext.Provider>
    )
}

export const useContainer = () => {
    return React.useContext(ContainerContext);
};
