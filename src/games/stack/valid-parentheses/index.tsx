import React from 'react';
import * as THREE from 'three';
import Algo from "./Algo";
import Stack from '../../../data-structures/stack';
import Queue from '../../../data-structures/queue';
import { clearScene, registerOrbitControls } from '../../../commons/three';
import { stackShellParams, queueShellParams, nodeSize } from './styles';

import AlgoDescription from "./AlgoMenu";
import Title from './Title';
import GameWrapper from '../../commons/GameWrapper';
import info from "./info";

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
            setQueue(new Queue<string>(nodeSize, queueShellParams, scene, duration))
            setStack(new Stack<string>(nodeSize, stackShellParams, scene, duration))
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

        <GameWrapper path={info.path}>
            <>
                <Title />
                <AlgoDescription />
                <div ref={ref}></div>
                {/* <Algo queue={queue} stack={stack} scene={scene} animate={animate} cancelAnimate={cancelAnimate} /> */}
                <Algo />
            </>
        </GameWrapper>
    );
}

export default Main;
