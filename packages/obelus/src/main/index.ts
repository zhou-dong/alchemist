import * as THREE from 'three';
import gsap from 'gsap';
import { renderScene } from '../engine/renderScene';
import { playScene } from '../engine/playScene';
import { Scene } from '../dsl/scene';
import { circle, group, line } from '../dsl/objects';
import { at } from '../dsl/events';

// 1. Setup Three.js scene
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const aspect = window.innerWidth / window.innerHeight;
const zoom = 100;

const camera = new THREE.OrthographicCamera(
    -aspect * zoom, // left
    aspect * zoom,  // right
    zoom,           // top
    -zoom,          // bottom
    0.1,
    1000
);

camera.position.z = 100; // still needed to look down the z-axis

const threeScene = new THREE.Scene();

// 2. Define a simple DSL scene
const scene: Scene = {
    objects: [
        circle('circle1', {
            center: { x: 0, y: 0, z: 0 },
            radius: 20,
            visual: { color: '#00f' }
        }),
        line('line1', {
            start: { x: 0, y: 0, z: 0 },
            end: { x: 50, y: 50, z: 0 }
        }),
        group('group1', ['circle1', 'line1'])
    ],
    timeline: [
        at(0).animate('circle1', { position: { x: 10 } }, { duration: 2 }),
        at(1).animate('group1', { position: { y: 50 } }, { duration: 1 })
    ]
};

// 3. Render and play
const { objectMap, rootObjects } = renderScene(scene);
rootObjects.forEach(obj => threeScene.add(obj));

playScene(scene.timeline, objectMap);

// 4. Start render loop
let loopId: number;
function animateLoop() {
    loopId = requestAnimationFrame(animateLoop);
    renderer.render(threeScene, camera);
}

animateLoop();

gsap.globalTimeline.eventCallback('onComplete', () => {
    cancelAnimationFrame(loopId);
    console.log('Animation done!');
});
