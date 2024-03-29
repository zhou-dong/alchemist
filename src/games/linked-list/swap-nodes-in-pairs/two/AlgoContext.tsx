import React from "react";
import * as THREE from 'three';
import { State } from "../AlgoState";
import { clearScene } from "../../../../commons/three";
import { Step } from "./algo";
import { LinkedListNodeText } from "../../../../data-structures/list/list-node-base";

const AlgoContext = React.createContext<{
    scene: THREE.Scene,
    animate: () => void,
    cancelAnimate: () => void,
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    displayCode: boolean,
    setDisplayCode: React.Dispatch<React.SetStateAction<boolean>>,
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    steps: Step[],
    setSteps: React.Dispatch<React.SetStateAction<Step[]>>,
    currentText?: LinkedListNodeText,
    aText?: LinkedListNodeText,
    bText?: LinkedListNodeText,
    setCurrentText: React.Dispatch<React.SetStateAction<LinkedListNodeText | undefined>>,
    setAText: React.Dispatch<React.SetStateAction<LinkedListNodeText | undefined>>,
    setBText: React.Dispatch<React.SetStateAction<LinkedListNodeText | undefined>>
}>({
    scene: new THREE.Scene(),
    animate: () => { },
    cancelAnimate: () => { },
    state: State.Typing,
    setState: () => { },
    displayCode: true,
    setDisplayCode: () => { },
    index: 0,
    setIndex: () => { },
    steps: [],
    setSteps: () => { },
    setCurrentText: () => { },
    setAText: () => { },
    setBText: () => { }
});

let animationFrameId = -1;

export const AlgoContextProvider: React.FC<{
    children: React.ReactNode,
    renderer: THREE.Renderer,
    camera: THREE.Camera,
    scene: THREE.Scene
}> = ({ children, renderer, camera, scene }) => {

    camera.position.z = 20;
    const [state, setState] = React.useState(State.Typing);
    const [displayCode, setDisplayCode] = React.useState(true);
    const [index, setIndex] = React.useState(0);
    const [steps, setSteps] = React.useState<Step[]>([]);
    const [currentText, setCurrentText] = React.useState<LinkedListNodeText>();
    const [aText, setAText] = React.useState<LinkedListNodeText>();
    const [bText, setBText] = React.useState<LinkedListNodeText>();

    function animate() {
        animationFrameId = requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    function cancelAnimate() {
        cancelAnimationFrame(animationFrameId);
    }

    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(
        () => {
            function init() {
                clearScene(scene);
                renderer.render(scene, camera);
            }

            if (ref && ref.current) {
                init();
                ref.current.appendChild(renderer.domElement);
            }
        },
        [ref, renderer, scene, camera]
    );

    return (
        <AlgoContext.Provider value={{
            scene,
            animate,
            cancelAnimate,
            state,
            setState,
            displayCode,
            setDisplayCode,
            index,
            setIndex,
            steps,
            setSteps,
            currentText,
            setCurrentText,
            aText,
            setAText,
            bText,
            setBText
        }}>
            {children}
            <div ref={ref} />
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
