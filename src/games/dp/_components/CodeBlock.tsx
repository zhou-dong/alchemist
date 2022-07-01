import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export enum languages {
    Javascript = 'javascript',
    Markdown = 'markdown',
}

interface Props {
    code: string;
    language: languages;
}

const Code = (props: Props) => (
    <SyntaxHighlighter language="javascript" style={docco}>
        {props.code}
    </SyntaxHighlighter>
);

export default Code;
