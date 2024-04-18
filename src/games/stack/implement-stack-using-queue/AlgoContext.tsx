import React from "react";
import * as THREE from 'three';
import Queue from "../../../data-structures/queue";
import { clearScene } from '../../../commons/three';
import QueueShellBuilder from "./queueShellBuilder";
import { queuePosition } from "./queueStyles";
import QueueName from "./queueName";

const AlgoContext = React.createContext<{
    queue?: Queue<string>,
    queueName?: QueueName,
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

    const [queue, setQueue] = React.useState<Queue<string>>();
    const [actionsDisabled, setActionsDisabled] = React.useState(false);
    const [queueName, setQueueName] = React.useState<QueueName>();

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
            const queue = new Queue<string>(queuePosition.queue, duration);
            for (let i = 0; i < minShellSize; i++) {
                queue.increaseShells(new QueueShellBuilder(scene, true).build());
            }
            setQueueName(new QueueName("Queue", queuePosition.name, scene));
            setQueue(queue);
            renderer.render(scene, camera);
        }

        if (ref && ref.current) {
            init();
            ref.current.appendChild(renderer.domElement);
        }
    }, [ref, renderer, scene, camera]);

    return (
        <AlgoContext.Provider value={{
            queueName,
            queue,
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
