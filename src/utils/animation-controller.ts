import type { DualRenderer, DualScene } from 'obelus-three-render';
import * as THREE from 'three';

export class AnimationController {

    private readonly renderer: DualRenderer;
    private readonly scene: DualScene;
    private readonly camera: THREE.Camera;
    private animationFrameId: number | null = null;

    constructor(
        renderer: DualRenderer,
        scene: DualScene,
        camera: THREE.Camera,
    ) {
        this.renderer = renderer;
        this.scene = scene;
        this.camera = camera;
        this.animationFrameId = null;
    }

    private render = () => {
        this.renderer.render(this.scene.threeScene, this.scene.css3dScene, this.camera as any);
    }

    private animate = () => {
        this.render();
        this.animationFrameId = requestAnimationFrame(this.animate);
    }

    startAnimation = () => {
        if (this.animationFrameId === null) {
            this.animate();
        }
    }

    stopAnimation = () => {
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    renderAnimationOnce = () => {
        this.render();
    }

};
