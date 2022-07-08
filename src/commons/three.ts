import * as THREE from 'three';
import { Font, FontLoader } from "three/examples/jsm/loaders/FontLoader";

const createRenderer = () => {
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, });
    renderer.setSize(window.innerWidth, window.innerHeight);
    return renderer;
}

const createCamera = () => {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    return camera;
}

const createScene = () => {
    return new THREE.Scene();
}

const clearScene = (scene: THREE.Scene) => {
    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }
}

function onWindowResize(renderer: THREE.Renderer, camera: THREE.PerspectiveCamera) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

const loadFont = (): Promise<Font> => {
    const fontPath = '/fonts/Roboto_Regular.json';
    return new Promise(resolve => {
        new FontLoader().load(fontPath, font => resolve(font));
    });
};

export { createRenderer, createCamera, createScene, clearScene, onWindowResize, loadFont };
