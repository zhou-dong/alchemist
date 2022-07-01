import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface CodeBlockParams {
    content: string;
}

const CodeBlock = ({ content }: CodeBlockParams) => (
    <div style={{ textAlign: "center", display: "inline-block" }}>
        <SyntaxHighlighter language="javascript" style={docco}>
            {content}
        </SyntaxHighlighter>
    </div>
);

export default CodeBlock;
