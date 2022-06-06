import React from 'react';
import * as THREE from 'three';
import { Button } from '@mui/material';
import gsap from 'gsap';

import { sort } from './algo';
import { Action, Step } from "./step";
import Container from '../commons/container';
import Steps from '../components/Steps';
import GameWrapper from '../../commons/GameWrapper';
import { clearScene } from '../commons/three';
import { waitSeconds } from '../commons/helps';

import info from "./info";

class Item extends THREE.Mesh implements Container {
    payload: number;

    constructor(payload: number, material: THREE.Material, radius: number, height: number) {
        const geometry = new THREE.CylinderGeometry(radius, radius, height, 32);
        super(geometry, material)
        this.payload = payload;
    }
}

const initialColor = "gold";
const enabledColor = "lightgreen";
const pendingColor = "gold";

const calculateX = (i: number): number => {
    return i - 8 + 2 * i;
}

const calculateY = (height: number): number => {
    return height / 2 - 4;
}

const createItems = (values: number[]): Item[] => {
    const items: Item[] = [];

    for (let i = 0; i < values.length; i++) {
        const material = new THREE.MeshBasicMaterial({ color: initialColor });
        let height = values[i];
        const item = new Item(height, material, 1, height);
        item.position.setX(calculateX(i));
        item.position.setY(calculateY(height));
        item.position.setZ(-6);
        items.push(item);
    }

    return items;
}

interface Props {
    renderer: THREE.Renderer;
    camera: THREE.Camera;
    scene: THREE.Scene;
    values: number[];
}

const changeColor = (c: Container, color: THREE.ColorRepresentation): void => {
    ((c as any).material as THREE.MeshBasicMaterial).color.set(color);
}

const duration = 1;
const ease = "power1";
let animationFrameId = -1;

const Animation = ({ renderer, camera, scene, values }: Props) => {

    const [items, setItems] = React.useState<Item[]>(createItems(values));
    const [index, setIndex] = React.useState<number>(0);
    const [refreshDisabled, setRefreshDisabled] = React.useState(false);
    const [playDisabled, setPlayDisabled] = React.useState(false);

    const max = Math.max(...values);

    React.useEffect(() => {
        clearScene(scene);

        items.forEach(item => {
            scene.add(item);
        })

        renderer.render(scene, camera);

        return () => cancelAnimationFrame(animationFrameId);
    }, [items, renderer, scene, camera]);

    const run = async (step: Step): Promise<void> => {
        const { a, action, index } = step;

        switch (action) {
            case Action.Leave:
                gsap.to(a.position, {
                    y: a.position.y + max + 1,
                    duration,
                    ease,
                    onStart: () => changeColor(a, enabledColor),
                    onComplete: () => changeColor(a, pendingColor),
                });
                break;
            case Action.Override:
                if (index !== undefined) {
                    gsap.to(a.position, {
                        x: calculateX(index),
                        duration,
                        ease,
                        onStart: () => changeColor(a, enabledColor),
                        onComplete: () => changeColor(a, initialColor),
                    });
                }
                break;
            case Action.Insert:
                if (index !== undefined) {
                    gsap.timeline()
                        .to(a.position, {
                            x: calculateX(index),
                            duration: duration / 2,
                            ease,
                            onStart: () => changeColor(a, enabledColor),
                            onComplete: () => changeColor(a, initialColor),
                        })
                        .to(a.position, {
                            y: calculateY(a.payload),
                            duration: duration / 2,
                            ease,
                            onStart: () => changeColor(a, enabledColor),
                            onComplete: () => changeColor(a, initialColor),
                        });
                }
                break;
            default:
                break;
        }

        await waitSeconds(duration);
        return;
    }

    const play = async () => {
        setRefreshDisabled(true);
        setPlayDisabled(true);

        const steps = sort(items);

        animate();
        for (let i = 0; i < steps.length; i++) {
            setIndex(i + 1);
            await run(steps[i]);
        }

        await waitSeconds(duration);

        cancelAnimationFrame(animationFrameId);
        setRefreshDisabled(false);
    }

    const refresh = () => {
        cancelAnimationFrame(animationFrameId);
        setIndex(0);
        setItems(() => createItems(values));
        setPlayDisabled(false);
    }

    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (ref && ref.current) {
            const parent = ref.current;
            parent.appendChild(renderer.domElement);
        }

        return () => cancelAnimationFrame(animationFrameId);
    }, [ref, renderer]);

    function animate() {
        animationFrameId = requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };

    return (
        <GameWrapper path={info.path}>
            <>
                <div ref={ref}></div>
                <Steps steps={index} />

                <div style={{ position: "fixed", bottom: "100px", width: "100%", margin: "auto", textAlign: "center" }}>
                    <Button
                        size='large'
                        disabled={playDisabled}
                        onClick={() => {
                            play();
                        }}
                    >
                        play
                    </Button>
                    <Button
                        size='large'
                        disabled={refreshDisabled}
                        onClick={() => {
                            refresh();
                        }}
                    >
                        refresh
                    </Button>
                </div>

            </>
        </GameWrapper>
    );
}

export default Animation;
