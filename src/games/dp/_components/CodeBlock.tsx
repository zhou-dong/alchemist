import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export enum languages {
    Typescript = 'typescript',
    Javascript = 'javascript',
    Markdown = 'markdown',
}

interface Props {
    code: string;
    language: languages;
    showLineNumbers?: boolean;
    wrapLines?: boolean;
    linesToHighlight?: number[];
}

// only works when showLineNumbers and wrapLines are both enabled
const highlightLine = (lineNumber: number, markLines?: number[], color: string = "#FFDB81"): React.HTMLProps<HTMLElement> => {
    const style: React.CSSProperties = { display: "block", width: "fit-content" };
    if (markLines && markLines.includes(lineNumber)) {
        style.backgroundColor = color;
    }
    return { style };
}

// Note that line highlighting only works if both, showLineNumbers and wrapLines, are enabled. 
// If either of these is disabled, highlighting one or multiple lines will not work.
const Code = ({ code, language, showLineNumbers, wrapLines, linesToHighlight }: Props) => (
    <SyntaxHighlighter
        language={language}
        style={docco}
        showLineNumbers={showLineNumbers}
        wrapLines={wrapLines}
        lineProps={(lineNumber: number): React.HTMLProps<HTMLElement> => highlightLine(lineNumber, linesToHighlight)}
        customStyle={{ backgroundColor: "white", padding: 0, margin: 0 }}
    >
        {code}
    </SyntaxHighlighter>
);

export default Code;
