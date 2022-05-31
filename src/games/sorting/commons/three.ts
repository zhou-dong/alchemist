import * as THREE from 'three';

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

export { createRenderer, createCamera, createScene };
