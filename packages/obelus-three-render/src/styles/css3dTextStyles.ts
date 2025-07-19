import { css3dText } from '../dsl/animatableThreeDsl';

export interface CSS3DTextStyle extends Partial<CSSStyleDeclaration> {
    fontSize?: string;
    color?: string;
    backgroundColor?: string;
    fontWeight?: string;
    fontFamily?: string;
    padding?: string;
    borderRadius?: string;
    whiteSpace?: string;
    userSelect?: string;
    pointerEvents?: string;
};

const defaultTextStyle: CSS3DTextStyle = {
    fontSize: '16px',
    color: '#ffffff',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    fontWeight: 'normal',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    padding: '4px 8px',
    borderRadius: '4px',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    pointerEvents: 'none'
};

export function css3dTextStyle(id: string, text: string, style: CSS3DTextStyle = defaultTextStyle) {
    return css3dText(id, text, style);
};
