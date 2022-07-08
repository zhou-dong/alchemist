import React from 'react';
import * as THREE from 'three';
import { Font } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometryParameters } from "three/examples/jsm/geometries/TextGeometry";
import AlgoInput from "./AlgoInput";
import Stack from '../../../data-structures/stack';
import { clearScene, loadFont } from '../../../commons/three';

interface Props {
    renderer: THREE.Renderer;
    camera: THREE.Camera;
    scene: THREE.Scene;
}

const duration = 0.5;

const nodeAdjust = new THREE.Vector3(0.22, 0.2, 0);

const buildStackNodeParams = (font: Font) => {
    const nodeTextGeometryParameters: TextGeometryParameters = { font, size: 0.6, height: 0.1 };
    return {
        width: 1,
        height: 1,
        depth: 1,
        material: new THREE.MeshBasicMaterial({ color: "green", opacity: 0.5, transparent: true }),
        textMaterial: new THREE.MeshBasicMaterial({ color: "black" }),
        textGeometryParameters: nodeTextGeometryParameters,
        initPosition: new THREE.Vector3(-10, 1, 0),
        textAdjust: nodeAdjust,
    }
};

const stackShellParams = {
    material: new THREE.MeshBasicMaterial({ color: "green", opacity: 0.3, transparent: true }),
    position: new THREE.Vector3(11, 1, 0),
    size: 14,
};

let animationFrameId = -1;
const Main = ({ renderer, camera, scene }: Props) => {

    const [stack, setStack] = React.useState<Stack<string>>();

    React.useEffect(() => {
        loadFont().then(font => {
            const stackNodeParams = buildStackNodeParams(font);
            const stack = new Stack<string>(
                stackNodeParams,
                stackShellParams,
                scene,
                duration
            );
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
