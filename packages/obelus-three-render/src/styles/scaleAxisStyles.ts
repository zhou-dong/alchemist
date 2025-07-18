import * as THREE from "three";
import { scaleAxis, type ScaleAxisOptions } from "../dsl/animatableThreeDsl";

// Default style presets for scaleAxis
export const scaleAxisStyles = {
    // Clean, minimal style with white text
    clean: {
        lineWidth: 2,
        lineMaterial: new THREE.LineBasicMaterial({ color: "#ffffff" }),
        dotRadius: 3,
        dotMaterial: new THREE.MeshBasicMaterial({ color: "#ffffff" }),
        scale: {
            fontSize: 16,
            color: "#ffffff",
            scaleDown: 0.1,
            padding: 8
        }
    },

    // Bold, prominent style
    bold: {
        lineWidth: 4,
        lineMaterial: new THREE.LineBasicMaterial({ color: "#ff6b6b" }),
        dotRadius: 5,
        dotMaterial: new THREE.MeshBasicMaterial({ color: "#ff6b6b" }),
        scale: {
            fontSize: 20,
            color: "#ffffff",
            padding: 12
        }
    },

    // Subtle, elegant style
    subtle: {
        lineWidth: 1.5,
        lineMaterial: new THREE.LineBasicMaterial({ color: "#cccccc" }),
        dotRadius: 2,
        dotMaterial: new THREE.MeshBasicMaterial({ color: "#cccccc" }),
        scale: {
            fontSize: 14,
            color: "#ffffff",
            padding: 6
        }
    },

    // Colorful style
    colorful: {
        lineWidth: 3,
        lineMaterial: new THREE.LineBasicMaterial({ color: "#4ecdc4" }),
        dotRadius: 4,
        dotMaterial: new THREE.MeshBasicMaterial({ color: "#4ecdc4" }),
        scale: {
            fontSize: 18,
            color: "#ffffff",
            padding: 10
        }
    },

    // Hot pink style (matching your current theme)
    hotpink: {
        lineWidth: 3,
        lineMaterial: new THREE.LineBasicMaterial({ color: "#ff69b4" }),
        dotRadius: 4,
        dotMaterial: new THREE.MeshBasicMaterial({ color: "#ff69b4" }),
        scale: {
            fontSize: 18,
            color: "deeppink",
            padding: 10
        }
    }
};


export type ScaleAxisStyleProps = {
    startX?: number,
    startY?: number,
    startZ?: number,
    endX?: number,
    endY?: number,
    endZ?: number,
    minValue?: number,
    maxValue?: number,
    style?: keyof typeof scaleAxisStyles;
    dotCount?: number;
    scaleDown?: number;
    scaleOffsetY?: number;
}

// Helper function to create scaleAxis with default styles
export function scaleAxisWithStyle(id: string, props: ScaleAxisStyleProps) {
    const { startX, startY, startZ, endX, endY, endZ } = props;

    const start = { x: startX || 0, y: startY || 0, z: startZ || 0 };
    const end = { x: endX || 0, y: endY || 0, z: endZ || 0 };

    const style = props.style || 'hotpink';
    const minValue = props.minValue || 0;
    const maxValue = props.maxValue || 1;
    const dotCount = props.dotCount || 3;
    const scaleDown = props.scaleDown || 0.3;
    const selectedStyle = scaleAxisStyles[style];
    const scaleOffsetY = props.scaleOffsetY || -20;

    return scaleAxis(id, {
        position: { start, end },
        dotCount,
        lineWidth: selectedStyle.lineWidth,
        lineMaterial: selectedStyle.lineMaterial,
        dotRadius: selectedStyle.dotRadius,
        dotMaterial: selectedStyle.dotMaterial,
        scale: {
            min: {
                value: minValue,
                fontSize: selectedStyle.scale.fontSize,
                color: selectedStyle.scale.color,
                offset: { x: 0, y: scaleOffsetY, z: 0 },
                scaleDown,
                padding: selectedStyle.scale.padding
            },
            max: {
                value: maxValue,
                fontSize: selectedStyle.scale.fontSize,
                color: selectedStyle.scale.color,
                offset: { x: 0, y: scaleOffsetY, z: 0 },
                scaleDown,
                padding: selectedStyle.scale.padding
            }
        }
    });
}
