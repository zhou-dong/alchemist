import * as THREE from "three";
import { AxisProps } from "../dsl/animatable";

export const LineStyles: THREE.LineBasicMaterial = new THREE.LineBasicMaterial({ color: 'hotpink' });

export const AxisStyles: AxisProps = {
    dotCount: 3,
    lineWidth: 2,
    lineMaterial: LineStyles,
    dotMaterial: new THREE.MeshBasicMaterial({ color: 'cyan' }),
    dotRadius: 4
}

export const TextStyles: Partial<CSSStyleDeclaration> = {
    color: 'hotpink',
    fontSize: '16px',
    fontWeight: 'normal',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
}
