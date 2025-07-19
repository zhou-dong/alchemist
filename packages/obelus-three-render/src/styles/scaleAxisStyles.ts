import * as THREE from "three";
import { AxisOptions } from "../builders/axisBuilder";

export const defaultAxisOptions: AxisOptions = {
    position: {
        start: new THREE.Vector3(0, 0, 0),
        end: new THREE.Vector3(1, 1, 1)
    },
    dotCount: 10,
    lineWidth: 1,
    lineMaterial: new THREE.LineBasicMaterial({ color: 0x000000 }),
    dotMaterial: new THREE.MeshBasicMaterial({ color: 0x000000 }),
    dotRadius: 0.1
};

export const defaultScaleProps = {
    min: '0',
    max: '1',
    scaleStyle: {
        fontSize: '16px',
        color: '#ffffff',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        fontWeight: 'normal',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    },
    scaleOffset: new THREE.Vector3(0, 0, 0)
};
