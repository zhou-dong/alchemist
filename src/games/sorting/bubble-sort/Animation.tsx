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


const createCamera = () => {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    return camera;
}

const createRenderer = () => {
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, });
    renderer.setSize(window.innerWidth, window.innerHeight);
    return renderer;
}

const renderer = createRenderer();
const camera = createCamera();

class Item extends THREE.Mesh implements Container {
    payload: number;

    constructor(payload: number, material: THREE.Material, radius: number, height: number) {
        const geometry = new THREE.CylinderGeometry(radius, radius, height, 32);
        super(geometry, material)
        this.payload = payload;
    }
}

interface Params {
    setScene: React.Dispatch<React.SetStateAction<THREE.Scene | undefined>>;
}

const size = 6;
const colors = generateColor("#9fffcb", "#7ae582", size);

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

const createItems = (): Item[] => {
    const items: Item[] = [];

    for (let i = 0; i < size; i++) {
        const material = new THREE.MeshBasicMaterial({ color: colors[i] });
        let height = 6 - i;
        const item = new Item(height, material, 1, height);
        item.position.setX(i - 8 + 2 * i);
        item.position.setY(height / 2 - 3);
        item.position.setZ(-6);
        items.push(item);
    }

    return items;
}

const duration = 1;
const ease = "power1";

function waitSeconds(seconds: number) {
    return new Promise(resolve => {
        setTimeout(() => resolve(1), seconds * 1000);
    });
}

const scene = new THREE.Scene();

const Animation = () => {

    const [items, setItems] = React.useState<Item[]>(
        createItems()
    );

    const [index, setIndex] = React.useState<number>(0);

    React.useEffect(() => {
        items.forEach(item => {
            scene.add(item);
        })
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
        const steps = sort(items);
        for (let i = 0; i < steps.length; i++) {
            setIndex(i + 1);
            await run(steps[i]);
        }
    }

    const refresh = () => {
        while (scene.children.length > 0) {
            scene.remove(scene.children[0]);
        }
        setItems(() => createItems());
    }


    // ----------- render -----------
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (ref && ref.current) {
            ref.current.appendChild(renderer.domElement);
        }
    }, [ref]);

    function animate() {
        requestAnimationFrame(animate);
        if (scene) {
            renderer.render(scene, camera);
        }
    };

    animate();

    // ----------- render -----------

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
