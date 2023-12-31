import React from "react";
import * as THREE from 'three';
import { State } from "../AlgoState";
import { clearScene } from "../../../../commons/three";
import { Item } from "./algo";

const AlgoContext = React.createContext<{
    scene: THREE.Scene,
    animate: () => void,
    cancelAnimate: () => void,
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    list: string,
    n: number,
    setList: React.Dispatch<React.SetStateAction<string>>,
    setN: React.Dispatch<React.SetStateAction<number>>,
    displayCode: boolean,
    setDisplayCode: React.Dispatch<React.SetStateAction<boolean>>,
    items: Item[],
    setItems: React.Dispatch<React.SetStateAction<Item[]>>,
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
}>({
    scene: new THREE.Scene(),
    animate: () => { },
    cancelAnimate: () => { },
    state: State.Typing,
    setState: () => { },
    list: "",
    n: 0,
    setList: () => { },
    setN: () => { },
    displayCode: true,
    setDisplayCode: () => { },
    items: [],
    setItems: () => { },
    index: 0,
    setIndex: () => { },
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
    const [index, setIndex] = React.useState(0);
    const [items, setItems] = React.useState<Item[]>([]);
    const [list, setList] = React.useState("");
    const [n, setN] = React.useState(0);
    const [displayCode, setDisplayCode] = React.useState(true);

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
            list,
            setList,
            n,
            setN,
            displayCode,
            setDisplayCode,
            items,
            setItems,
            index,
            setIndex
        }}>
            {children}
            <div ref={ref} />
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
