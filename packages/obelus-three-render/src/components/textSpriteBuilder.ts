import * as THREE from "three";

// Import Inter font from Fontsource
import '@fontsource/inter/400.css'; // Regular weight
import '@fontsource/inter/500.css'; // Medium weight
import '@fontsource/inter/600.css'; // Semi-bold weight
import '@fontsource/inter/700.css'; // Bold weight

// Create a simple text sprite approach using HTML canvas with Inter font
export interface TextSpriteOptions {
    text: string;
    fontSize: number;
    color: string;
    backgroundColor: string;
    scaleDown: number;
    padding: number;
}

export function createInterTextSprite(options: TextSpriteOptions): THREE.Sprite {
    const { text, fontSize, color, backgroundColor, scaleDown, padding } = options;

    // Create canvas for text rendering
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;

    // Set canvas size
    context.font = `${fontSize}px Inter, sans-serif`;
    const textMetrics = context.measureText(text);
    const textWidth = textMetrics.width;
    const textHeight = fontSize;

    canvas.width = textWidth + padding * 2;
    canvas.height = textHeight + padding * 2;

    // Set up context
    context.font = `${fontSize}px Inter, sans-serif`;
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = color;
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    // Create texture and sprite
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        alphaTest: 0.1
    });

    const sprite = new THREE.Sprite(material);
    sprite.scale.set(textWidth / scaleDown, textHeight / scaleDown, 1); // Use scaleDown parameter

    return sprite;
};
