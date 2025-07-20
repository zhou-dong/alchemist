import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

export function Latex(
    latex: string,
    style: Partial<CSSStyleDeclaration>
): CSS3DObject {
    const element = document.createElement('div');

    // Apply base styles
    Object.assign(element.style, style);

    // Add KaTeX CSS if not already loaded
    if (!document.querySelector('link[href*="katex"]')) {
        const katexCSS = document.createElement('link');
        katexCSS.rel = 'stylesheet';
        katexCSS.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css';
        document.head.appendChild(katexCSS);
    }

    // Load KaTeX dynamically if not available
    if (typeof window.katex === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js';
        script.onload = () => {
            try {
                window.katex.render(latex, element, {
                    throwOnError: false,
                    displayMode: true
                });
            } catch (error) {
                console.error('KaTeX rendering error:', error);
                element.textContent = latex; // Fallback to plain text
            }
        };
        document.head.appendChild(script);
    } else {
        try {
            window.katex.render(latex, element, {
                throwOnError: false,
                displayMode: true
            });
        } catch (error) {
            console.error('KaTeX rendering error:', error);
            element.textContent = latex; // Fallback to plain text
        }
    }

    return new CSS3DObject(element);
}

// Add KaTeX to window type
declare global {
    interface Window {
        katex: {
            render: (latex: string, element: HTMLElement, options: any) => void;
        };
    }
};
