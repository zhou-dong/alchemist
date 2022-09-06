import React from 'react';
import * as THREE from 'three';
import AlgoInput from "./Algo";
import Stack from '../../../data-structures/stack';
import Queue from '../../../data-structures/queue';
import { clearScene, registerOrbitControls } from '../../../commons/three';
import { buildStackShellParams, buildQueueShellParams, nodeSize } from './styles';

interface Props {
    renderer: THREE.Renderer;
    camera: THREE.Camera;
    scene: THREE.Scene;
}

const duration = 0.5;
let animationFrameId = -1;

const Main = ({ renderer, camera, scene }: Props) => {

    const [queue, setQueue] = React.useState<Queue<string>>();
    const [stack, setStack] = React.useState<Stack<string>>();

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
            setQueue(new Queue<string>(nodeSize, buildQueueShellParams(1), scene, duration))
            setStack(new Stack<string>(nodeSize, buildStackShellParams(1), scene, duration))
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
        <>
            <div ref={ref}></div>
            <AlgoInput queue={queue} stack={stack} scene={scene} animate={animate} cancelAnimate={cancelAnimate} />
        </>
    );
}

export default Main;
