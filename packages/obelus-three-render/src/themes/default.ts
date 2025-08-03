import * as THREE from "three";
import { AxisProps } from "../dsl/animatable";

const lineStyle: THREE.LineBasicMaterial = new THREE.LineBasicMaterial({ color: '#9C27B0' });

const axisStyle: AxisProps = {
    dotCount: 3,
    lineWidth: 1.5,
    lineMaterial: new THREE.LineBasicMaterial({ color: '#9C27B0' }),
    dotMaterial: new THREE.MeshBasicMaterial({ color: '#4285F4' }),
    dotRadius: 4
}

const textStyle: Partial<CSSStyleDeclaration> = {
    color: '#4285F4',
    fontSize: '16px',
    fontWeight: 'normal',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
}

const ringStyle: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: '#4285F4' });

const circleStyle: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: '#4285F4' });

export const theme = {
    lineStyle,
    axisStyle,
    textStyle,
    ringStyle,
    circleStyle
}
