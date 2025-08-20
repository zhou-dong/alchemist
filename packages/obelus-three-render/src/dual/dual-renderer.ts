import * as THREE from "three";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";

export class DualRenderer {
    private _webglRenderer: THREE.WebGLRenderer;
    private _css3dRenderer: CSS3DRenderer;

    constructor(
        webglRenderer: THREE.WebGLRenderer,
        css3dRenderer: CSS3DRenderer,
    ) {
        this._webglRenderer = webglRenderer;
        this._css3dRenderer = css3dRenderer;
    }

    get webglRenderer() {
        return this._webglRenderer;
    }

    get css3dRenderer() {
        return this._css3dRenderer;
    }

    render(threeScene: THREE.Scene, css3dScene: THREE.Scene, camera: THREE.Camera) {
        this._webglRenderer.render(threeScene, camera);
        this._css3dRenderer.render(css3dScene, camera);
    }
}
