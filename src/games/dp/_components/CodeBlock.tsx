export enum languages {
    Javascript = 'javascript',
    Markdown = 'markdown',
}

interface Props {
    code: string;
    language: languages;
}

const Code = (props: Props) => (
    <code style={{ fontSize: "16px" }}>
        {props.code}
    </code>
);

export default Code;
