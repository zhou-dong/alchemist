import * as THREE from 'three';
import { TextGeometryParameters } from 'three/examples/jsm/geometries/TextGeometry';

export interface NodeParams {
  width: number;
  height: number;
  depth: number;

  material: THREE.Material;

  textMaterial: THREE.Material;
  textGeometryParameters: TextGeometryParameters;

  initPosition: THREE.Vector3;
  textAdjust: THREE.Vector3;
}

export interface ShellParams {
  material: THREE.Material;
  position: THREE.Vector3;
  size: number;
}
