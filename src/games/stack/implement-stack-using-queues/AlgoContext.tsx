import React from "react";
import * as THREE from 'three';
import Queue from "../../../data-structures/queue";
import { clearScene, registerOrbitControls } from '../../../commons/three';
import QueueShellBuilder from "./queueShellBuilder";
import { queueOnePosition, queueTwoPosition } from "./queueStyles";
import QueueName from "./queueName";

const AlgoContext = React.createContext<{
    queueIn?: Queue<string>,
    setQueueIn: React.Dispatch<React.SetStateAction<Queue<string> | undefined>>,
    queueOut?: Queue<string>,
    setQueueOut: React.Dispatch<React.SetStateAction<Queue<string> | undefined>>,
    inQueueName?: QueueName,
    outQueueName?: QueueName,
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
    setQueueIn: () => { },
    setQueueOut: () => { },
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

export const AlgoContextProvider: React.FC<{
    children: React.ReactNode,
    renderer: THREE.Renderer,
    camera: THREE.Camera,
    scene: THREE.Scene,
}> = ({ children, renderer, camera, scene }) => {

    const duration = 0.5;
    const minShellSize = 6;

    const [queueIn, setQueueIn] = React.useState<Queue<string>>();
    const [queueOut, setQueueOut] = React.useState<Queue<string>>();
    const [success, setSuccess] = React.useState(false);
    const [actionsDisabled, setActionsDisabled] = React.useState(false);
    const [inQueueName, setInQueueName] = React.useState<QueueName>();
    const [outQueueName, setOutQueueName] = React.useState<QueueName>();

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

            const one = new Queue<string>(queueOnePosition.queue, duration);
            const two = new Queue<string>(queueTwoPosition.queue, duration);

            for (let i = 0; i < minShellSize; i++) {
                one.increaseShells(new QueueShellBuilder(scene, true).build());
                two.increaseShells(new QueueShellBuilder(scene, true).build());
            }

            setInQueueName(new QueueName("Queue In", queueOnePosition.name, scene));
            setOutQueueName(new QueueName("Queue Out", queueTwoPosition.name, scene));

            setQueueIn(one);
            setQueueOut(two);

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
            inQueueName,
            outQueueName,
            queueIn,
            setQueueIn,
            queueOut,
            setQueueOut,
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
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
