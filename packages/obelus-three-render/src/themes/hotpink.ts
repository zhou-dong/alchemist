import * as THREE from "three";
import { AxisProps } from "../dsl/animatable";

export const lineStyle: THREE.LineBasicMaterial = new THREE.LineBasicMaterial({ color: '#FFC107' });

export const axisStyle: AxisProps = {
    dotCount: 3,
    lineWidth: 2,
    lineMaterial: lineStyle,
    dotMaterial: new THREE.MeshBasicMaterial({ color: '#00BCD4' }),
    dotRadius: 4
}

export const textStyle: Partial<CSSStyleDeclaration> = {
    color: '#00BCD4',
    fontSize: '16px',
    fontWeight: 'normal',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
}

export const ringStyle: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: '#FFC107' });
