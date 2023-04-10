import React from "react";
import * as THREE from 'three';
import { clearScene, registerOrbitControls } from '../../../commons/three';
import MaxHeap from "../../../data-structures/tree/heap/max-heap";
import MinHeap from "../../../data-structures/tree/heap/min-heap";
import { State } from "./AlgoState";
import { buildHeapProps, } from "./styles";

const AlgoContext = React.createContext<{
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    scene: THREE.Scene,
    animate: () => void,
    cancelAnimate: () => void,
    smaller?: MaxHeap<number>,
    setSmaller: React.Dispatch<React.SetStateAction<MaxHeap<number> | undefined>>
    greater?: MinHeap<number>,
    setGreater: React.Dispatch<React.SetStateAction<MinHeap<number> | undefined>>
}>({
    state: State.Typing,
    setState: () => { },
    scene: new THREE.Scene(),
    animate: () => { },
    cancelAnimate: () => { },
    setSmaller: () => { },
    setGreater: () => { }
});

let animationFrameId = -1;

export const AlgoContextProvider: React.FC<{
    children: React.ReactNode,
    renderer: THREE.Renderer,
    camera: THREE.Camera,
    scene: THREE.Scene,
}> = ({ children, renderer, camera, scene }) => {

    camera.position.z = 20;
    const [state, setState] = React.useState(State.Ready);


    const smallerHeapProps = buildHeapProps(
        { arrayPosition: { x: -5, y: 5, z: 0 }, treePosition: { x: -5, y: 0, z: 0 } },
        { arrayPosition: { x: -5, y: 10, z: 0 }, treePosition: { x: -10, y: -5, z: 0 } },
        scene
    );

    const greaterHeapProps = buildHeapProps(
        { arrayPosition: { x: 5, y: 5, z: 0 }, treePosition: { x: 5, y: 0, z: 0 } },
        { arrayPosition: { x: 15, y: 10, z: 0 }, treePosition: { x: 10, y: -5, z: 0 } },
        scene
    );

    const [smaller, setSmaller] = React.useState<MaxHeap<number>>();
    const [greater, setGreater] = React.useState<MinHeap<number>>();

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

            setSmaller(new MaxHeap(smallerHeapProps));
            setGreater(new MinHeap(greaterHeapProps));

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
            scene,
            animate,
            cancelAnimate,
            smaller,
            setSmaller,
            greater,
            setGreater
        }}>
            {children}
            <div ref={ref}></div>
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
