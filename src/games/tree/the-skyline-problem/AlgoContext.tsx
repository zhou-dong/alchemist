import React from "react";
import * as THREE from 'three';
import { clearScene, registerOrbitControls } from '../../../commons/three';
import { State } from "./AlgoState";
import MaxHeap from "../../../data-structures/tree/heap/max-heap";
import { SxProps } from '@mui/system';

export enum Action {
    PushToHeap, DeleteFromHeap, PushToSkyline
}

export interface Step {
    prevHeight: number;
    action: Action;
    height: number;
    x?: number;
}

export enum Edge {
    Start, End
}

export type Line = {
    x: number;
    height: number;
    edge: Edge;
}

export interface Building {
    left: number;
    right: number;
    height: number;
    color: string;
}

export interface Point {
    x: number;
    height: number;
}

const AlgoContext = React.createContext<{
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    scene: THREE.Scene,
    animate: () => void,
    cancelAnimate: () => void,
    maxHeap?: MaxHeap<number>,
    setMaxHeap: React.Dispatch<React.SetStateAction<MaxHeap<number> | undefined>>,
    buildings: Building[],
    setBuildings: React.Dispatch<React.SetStateAction<Building[]>>,
    skyline: Point[],
    setSkyline: React.Dispatch<React.SetStateAction<Point[]>>,
    lines: Line[],
    setLines: React.Dispatch<React.SetStateAction<Line[]>>,
    steps: Step[],
    setSteps: React.Dispatch<React.SetStateAction<Step[]>>,
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    buildingsStyles: SxProps[][],
    setBuildingsStyles: React.Dispatch<React.SetStateAction<SxProps[][]>>
}>({
    state: State.Typing,
    setState: () => { },
    scene: new THREE.Scene(),
    animate: () => { },
    cancelAnimate: () => { },
    setMaxHeap: () => { },
    buildings: [],
    setBuildings: () => { },
    skyline: [],
    setSkyline: () => { },
    lines: [],
    setLines: () => { },
    steps: [],
    setSteps: () => { },
    index: 0,
    setIndex: () => { },
    buildingsStyles: [],
    setBuildingsStyles: () => { }
});

let animationFrameId = -1;

export const AlgoContextProvider: React.FC<{
    children: React.ReactNode,
    renderer: THREE.Renderer,
    camera: THREE.Camera,
    scene: THREE.Scene,
}> = ({ children, renderer, camera, scene }) => {

    camera.position.z = 20;
    const [state, setState] = React.useState(State.Typing);
    const [buildings, setBuildings] = React.useState<Building[]>([]);
    const [buildingsStyles, setBuildingsStyles] = React.useState<SxProps[][]>([]);
    const [skyline, setSkyline] = React.useState<Point[]>([]);
    const [maxHeap, setMaxHeap] = React.useState<MaxHeap<number>>();
    const [lines, setLines] = React.useState<Line[]>([]);
    const [steps, setSteps] = React.useState<Step[]>([]);
    const [index, setIndex] = React.useState(0);

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
            state,
            setState,
            scene,
            animate,
            cancelAnimate,
            maxHeap,
            setMaxHeap,
            buildings,
            setBuildings,
            skyline,
            setSkyline,
            lines,
            setLines,
            steps,
            setSteps,
            index,
            setIndex,
            buildingsStyles,
            setBuildingsStyles
        }}>
            {children}
            <div ref={ref}></div>
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
