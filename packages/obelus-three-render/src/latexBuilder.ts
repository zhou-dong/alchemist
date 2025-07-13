import katex from "katex";
import * as THREE from 'three';

// Render LaTeX to KaTeX SVG (in-memory)
function renderLatexToSvg(
    latex: string,
    style?: Partial<CSSStyleDeclaration>
): SVGSVGElement {

    const container = document.createElement('span');
    Object.assign(container.style, style ?? {});

    katex.render(latex, container, {
        output: 'html', // includes inline SVG
        throwOnError: false,
        displayMode: true,
    });

    const svg = container.querySelector('svg');
    if (!svg) {
        throw new Error('Failed to render LaTeX to SVG.');
    }

    return svg;
}

// Convert SVG to Blob URL
function convertSvgToBlobUrl(svg: SVGSVGElement): string {
    const svgString = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
    const svgUrl = URL.createObjectURL(svgBlob);
    return svgUrl;
}

// Helper to wrap image loading as a Promise
function loadImage(svgUrl: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = svgUrl;
    });
}

function createSprite(
    image: HTMLImageElement,
    position: { x: number, y: number, z: number },
    scale?: [number, number],
): THREE.Sprite {
    const texture = new THREE.Texture(image);
    texture.needsUpdate = true;

    const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(material);

    if (scale) {
        sprite.scale.set(scale[0], scale[1], 1);
    }

    const { x, y, z } = position;
    sprite.position.set(x, y, z);

    return sprite;
}

// Clean up
function cleanUp(svgUrl: string): void {
    URL.revokeObjectURL(svgUrl);
}

export async function createLatexSprite(
    latex: string,
    position: { x: number, y: number, z: number },
    style?: Partial<CSSStyleDeclaration>,
    scale?: [number, number]
): Promise<THREE.Sprite> {
    const svg = renderLatexToSvg(latex, style);
    const svgUrl = convertSvgToBlobUrl(svg);
    const imgage = await loadImage(svgUrl);
    const sprite = createSprite(imgage, position, scale);
    cleanUp(svgUrl);
    return sprite;
}
