import * as THREE from "three";
import { AxisProps } from "../dsl/animatable";

export const lineStyles: THREE.LineBasicMaterial = new THREE.LineBasicMaterial({ color: 'hotpink' });

export const axisStyles: AxisProps = {
    dotCount: 3,
    lineWidth: 2,
    lineMaterial: lineStyles,
    dotMaterial: new THREE.MeshBasicMaterial({ color: 'cyan' }),
    dotRadius: 4
}

export const textStyles: Partial<CSSStyleDeclaration> = {
    color: 'hotpink',
    fontSize: '16px',
    fontWeight: 'normal',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
}
