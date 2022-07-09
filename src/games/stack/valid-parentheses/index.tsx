import React from 'react';
import * as THREE from 'three';
import AlgoInput from "./AlgoInput";
import Stack from '../../../data-structures/stack';
import { clearScene, loadFont } from '../../../commons/three';
import { buildStackNodeParams, stackShellParams, buildQueueNodeParams, queueShellParams } from './styles';
import Queue from '../../../data-structures/queue';
import { Font } from 'three/examples/jsm/loaders/FontLoader';

interface Props {
    renderer: THREE.Renderer;
    camera: THREE.Camera;
    scene: THREE.Scene;
}

const buildStack = (font: Font, scene: THREE.Scene, duration: number): Stack<string> => {
    const stackNodeParams = buildStackNodeParams(font);
    return new Stack<string>(stackNodeParams, stackShellParams, scene, duration);
}

const buildQueue = (font: Font, scene: THREE.Scene, duration: number): Stack<string> => {
    const queueNodeParams = buildQueueNodeParams(font);
    return new Stack<string>(queueNodeParams, queueShellParams, scene, duration);
}

const duration = 0.5;

let animationFrameId = -1;
const Main = ({ renderer, camera, scene }: Props) => {

    const [stack, setStack] = React.useState<Stack<string>>();
    const [queue, setQueue] = React.useState<Queue<string>>();

    React.useEffect(() => {
        loadFont().then(font => {
            const stackNodeParams = buildStackNodeParams(font);
            const stack = new Stack<string>(stackNodeParams, stackShellParams, scene, duration);
            setStack(stack);
        })
    }, [scene])

    React.useEffect(() => {
        clearScene(scene);

        renderer.render(scene, camera);

        return () => cancelAnimationFrame(animationFrameId);
    }, [renderer, scene, camera]);

    function animate() {
        animationFrameId = requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };

    function cancelAnimate() {
        cancelAnimationFrame(animationFrameId);
    }

    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (ref && ref.current) {
            const parent = ref.current;
            parent.appendChild(renderer.domElement);
        }

        return () => cancelAnimationFrame(animationFrameId);
    }, [ref, renderer]);

    return (
        <>
            <div ref={ref}></div>
            <AlgoInput stack={stack} animate={animate} cancelAnimate={cancelAnimate} />
        </>
    );
}

export default Main;
