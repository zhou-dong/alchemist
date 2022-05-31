import React from 'react';
import * as THREE from 'three';
import { Button } from '@mui/material';
import gsap from 'gsap';

import { sort } from './algo';
import { generateColor } from "../../../commons/colorsGenerator";
import Step from "../commons/step";
import Container from '../commons/container';
import Steps from '../components/Steps';
import GameWrapper from '../../commons/GameWrapper';

const clearScene = (scene: THREE.Scene) => {
    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }
}

class Item extends THREE.Mesh implements Container {
    payload: number;

    constructor(payload: number, material: THREE.Material, radius: number, height: number) {
        const geometry = new THREE.CylinderGeometry(radius, radius, height, 32);
        super(geometry, material)
        this.payload = payload;
    }
}

const createItems = (values: number[]): Item[] => {
    const colors = generateColor("#9fffcb", "#7ae582", values.length);
    const items: Item[] = [];

    for (let i = 0; i < values.length; i++) {
        const material = new THREE.MeshBasicMaterial({ color: colors[i] });
        let height = values[i];
        const item = new Item(height, material, 1, height);
        item.position.setX(i - 8 + 2 * i);
        item.position.setY(height / 2 - 3);
        item.position.setZ(-6);
        items.push(item);
    }

    return items;
}

function waitSeconds(seconds: number) {
    return new Promise(resolve => {
        setTimeout(() => resolve(1), seconds * 1000);
    });
}

interface Props {
    renderer: THREE.Renderer;
    camera: THREE.Camera;
    scene: THREE.Scene;
    values: number[];
}

const Animation = ({ renderer, camera, scene, values }: Props) => {

    const duration = 1;
    const ease = "power1";
    let animationFrameId = -1;

    const [items, setItems] = React.useState<Item[]>(createItems(values));
    const [index, setIndex] = React.useState<number>(0);
    const steps = React.useMemo(() => sort(items), [items]);

    React.useEffect(() => {
        clearScene(scene);

        items.forEach(item => {
            scene.add(item);
        })

        renderer.render(scene, camera);

        // cancel animation
        return () => cancelAnimationFrame(animationFrameId);
    }, [items]);

    const run = async (step: Step): Promise<void> => {
        const { a, b, exchange } = step;
        const temp = a.position.clone();

        if (exchange) {
            gsap.to(a.position, { x: b.position.x, duration, ease, });
            gsap.to(b.position, { x: temp.x, duration, ease, });
        }

        await waitSeconds(duration);
        return;
    }

    const play = async () => {
        animate();
        for (let i = 0; i < steps.length; i++) {
            setIndex(i + 1);
            await run(steps[i]);
        }
        cancelAnimationFrame(animationFrameId);
    }

    const refresh = () => {
        cancelAnimationFrame(animationFrameId);
        setIndex(0);
        setItems(() => createItems(values));
    }

    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {

        if (ref && ref.current) {
            const parent = ref.current;
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
            parent.appendChild(renderer.domElement);
        }

        // cancel animation
        return () => cancelAnimationFrame(animationFrameId);
    }, [ref]);

    function animate() {
        animationFrameId = requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };

    return (
        <GameWrapper name="Bubble Sort Animation">
            <>
                <div ref={ref}></div>
                <Steps steps={index} />
                <Button sx={{ position: "fixed", bottom: "100px" }} onClick={() => {
                    play();
                }}>
                    play
                </Button>
                <Button sx={{ position: "fixed", bottom: "100px", left: "50px" }} onClick={() => {
                    refresh();
                }}>
                    refresh
                </Button>
            </>
        </GameWrapper>
    );
}

export default Animation;
