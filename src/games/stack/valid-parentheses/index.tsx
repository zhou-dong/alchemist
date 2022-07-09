import React from 'react';
import * as THREE from 'three';
import AlgoInput from "./AlgoInput";
import Stack from '../../../data-structures/stack';
import Queue from '../../../data-structures/queue';
import { clearScene, font } from '../../../commons/three';
import { buildStackNodeParams, stackShellParams, buildQueueNodeParams, queueShellParams } from './styles';


interface Props {
    renderer: THREE.Renderer;
    camera: THREE.Camera;
    scene: THREE.Scene;
}

const duration = 0.5;
let animationFrameId = -1;

const Main = ({ renderer, camera, scene }: Props) => {

    function animate() {
        animationFrameId = requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };

    function cancelAnimate() {
        cancelAnimationFrame(animationFrameId);
    }

    clearScene(scene);

    const stack = new Stack<string>(buildStackNodeParams(font), stackShellParams, scene, duration);
    const queue = new Queue<string>(buildQueueNodeParams(font), queueShellParams, scene, duration);
    renderer.render(scene, camera);

    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (ref && ref.current) {
            ref.current.appendChild(renderer.domElement);
        }

        return () => cancelAnimationFrame(animationFrameId);
    }, [ref, renderer]);

    return (
        <>
            <div ref={ref}></div>
            <AlgoInput queue={queue} animate={animate} cancelAnimate={cancelAnimate} />
        </>
    );
}

export default Main;
