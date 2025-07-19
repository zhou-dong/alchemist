import * as THREE from "three";

export interface TextSpriteOptions {
    text: string;
    fontSize: number;
    color: string;
    backgroundColor: string;
    scaleDown: number;
    padding: number;
    fontWeight?: string; // Add font weight support
}

export function createInterTextSprite(options: TextSpriteOptions): THREE.Sprite {
    const { text, fontSize, color, backgroundColor, scaleDown, padding, fontWeight = 'normal' } = options;

    // Create canvas for text rendering
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;

    // Enable font smoothing
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';

    // Set canvas size with Inter font priority and font weight
    context.font = `${fontWeight} ${fontSize}px 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif`;
    const textMetrics = context.measureText(text);
    const textWidth = textMetrics.width;
    const textHeight = fontSize;

    canvas.width = textWidth + padding * 2;
    canvas.height = textHeight + padding * 2;

    // Set up context with Inter font priority, font weight, and smoothing
    context.font = `${fontWeight} ${fontSize}px 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif`;
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';

    // Use transparent background
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Ensure color is applied correctly
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
    sprite.scale.set(textWidth / scaleDown, textHeight / scaleDown, 1);

    return sprite;
}
