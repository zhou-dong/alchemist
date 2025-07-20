import * as THREE from "three";
import { AxisProps } from "../dsl/animatable";

export const lineStyle: THREE.LineBasicMaterial = new THREE.LineBasicMaterial({ color: 'hotpink' });

export const axisStyle: AxisProps = {
    dotCount: 3,
    lineWidth: 2,
    lineMaterial: lineStyle,
    dotMaterial: new THREE.MeshBasicMaterial({ color: 'cyan' }),
    dotRadius: 4
}

export const textStyle: Partial<CSSStyleDeclaration> = {
    color: 'cyan',
    fontSize: '16px',
    fontWeight: 'normal',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
}

export const ringStyle: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 'cyan' });
