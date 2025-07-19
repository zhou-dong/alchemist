import * as THREE from "three";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";

export class DualScene {
  private _threeScene: THREE.Scene;
  private _css3dScene: THREE.Scene;

  constructor() {
    this._threeScene = new THREE.Scene();
    this._css3dScene = new THREE.Scene();
  }

  addThreeObject(object: THREE.Object3D) {
    this._threeScene.add(object);
  }

  addCss3dObject(object: CSS3DObject) {
    this._css3dScene.add(object);
  }

  get threeScene() {
    return this._threeScene;
  }

  get css3dScene() {
    return this._css3dScene;
  }
}
