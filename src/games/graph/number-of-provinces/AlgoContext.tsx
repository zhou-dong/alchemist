import React from "react";
import * as THREE from 'three';
import { clearScene } from '../../../commons/three';
import { Step } from "./utils";
import { State } from "./AlgoState";
import { Graph } from "../../../data-structures/graph";
import { DisjointSet } from "./unionFind";

const AlgoContext = React.createContext<{
    state: State,
    setState: React.Dispatch<React.SetStateAction<State>>,
    scene: THREE.Scene,
    animate: () => void,
    cancelAnimate: () => void,
    steps: Step[],
    setSteps: React.Dispatch<React.SetStateAction<Step[]>>,
    index: number,
    setIndex: React.Dispatch<React.SetStateAction<number>>,
    graph?: Graph<number>,
    setGraph: React.Dispatch<React.SetStateAction<Graph<number> | undefined>>,
    board: number[][],
    setBoard: React.Dispatch<React.SetStateAction<number[][]>>,
    disjointSet: DisjointSet,
    setDisjointSet: React.Dispatch<React.SetStateAction<DisjointSet>>,
    roots: number[],
    setRoots: React.Dispatch<React.SetStateAction<number[]>>
}>({
    state: State.Typing,
    setState: () => { },
    scene: new THREE.Scene(),
    animate: () => { },
    cancelAnimate: () => { },
    steps: [],
    setSteps: () => { },
    index: 0,
    setIndex: () => { },
    setGraph: () => { },
    board: [],
    setBoard: () => { },
    disjointSet: new DisjointSet(),
    setDisjointSet: () => { },
    roots: [],
    setRoots: () => { }
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
    const [steps, setSteps] = React.useState<Step[]>([]);
    const [index, setIndex] = React.useState(0);
    const [board, setBoard] = React.useState<number[][]>([]);
    const [graph, setGraph] = React.useState<Graph<number>>();
    const [disjointSet, setDisjointSet] = React.useState<DisjointSet>(new DisjointSet());
    const [roots, setRoots] = React.useState<number[]>([]);

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
            // registerOrbitControls(camera, renderer, scene);
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
            steps,
            setSteps,
            index,
            setIndex,
            graph,
            setGraph,
            board,
            setBoard,
            disjointSet,
            setDisjointSet,
            roots,
            setRoots
        }}>
            {children}
            <div ref={ref}></div>
        </AlgoContext.Provider>
    );
}

export const useAlgoContext = () => {
    return React.useContext(AlgoContext);
};
