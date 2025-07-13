import * as THREE from 'three';

// Use the global MathJax via CDN
// place the MathJax setup in your index.html
declare global {
    interface Window {
        MathJax: {
            tex2svg: (latex: string, options?: { display?: boolean }) => HTMLElement;
            startup: {
                promise: Promise<void>;
            };
        };
    }
}

// Render LaTeX to KaTeX SVG (in-memory)
export async function latexToSvgString(
    latex: string,
    style?: Partial<CSSStyleDeclaration>,
): Promise<SVGSVGElement> {
    // Ensure MathJax is available
    if (typeof window.MathJax === 'undefined') {
        throw new Error('MathJax is not loaded. Did you include it in index.html via CDN?');
    }

    // Wait for MathJax to finish loading
    await window.MathJax.startup.promise;

    // Render LaTeX to SVG using MathJax
    const svgWrapper = window.MathJax.tex2svg(latex, { display: true });
    const svg = svgWrapper.querySelector('svg');

    if (!svg) {
        throw new Error('Failed to render SVG from LaTeX.');
    }

    Object.assign(svg.style, style ?? {});

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
    height?: number,
): THREE.Sprite {
    const texture = new THREE.Texture(image);
    texture.needsUpdate = true;

    const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(material);

    if (height) {
        const aspect = image.naturalWidth / image.naturalHeight;
        const width = height * aspect;
        sprite.scale.set(width, height, 1); // Maintain aspect ratio!
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
    height?: number
): Promise<THREE.Sprite> {
    const svg = await latexToSvgString(latex, style);
    const svgUrl = convertSvgToBlobUrl(svg);
    const imgage = await loadImage(svgUrl);
    const sprite = createSprite(imgage, position, height);
    cleanUp(svgUrl);
    return sprite;
}
