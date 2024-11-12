import { styled } from '@mui/system';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Divider, IconButton, Paper, Stack, Toolbar, Typography } from "@mui/material";
import Draggable from 'react-draggable';
import CodeBlock, { languages } from '../../../dp/_components/CodeBlock';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useAlgoContext } from '../AlgoContext';

const HorizontalScanning = `function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) {
        return "";
    }

    let prefix = strs[0];
    for (let i = 1; i < strs.length; i++) {
        prefix = lcp(prefix, strs[i]);
        if (prefix.length === 0) {
            return "";
        }
    }
    return prefix;
}

function lcp(str1: string, str2: string): string {
    let index = 0;
    while (
        index < str1.length &&
        index < str2.length &&
        str1.charAt(index) === str2.charAt(index)
    ) {
        index++;
    }
    return str1.substring(0, index);
}`;

const VerticalScanning = `function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) {
        return "";
    }

    let prefix = "";

    for (let i = 0; i < strs[0].length; i++) {
        for (let j = 0; j < strs.length; j++) {
            if (strs[0].charAt(i) !== strs[j].charAt(i)) {
                return prefix;
            }
        }
        prefix += strs[0].charAt(i);
    }

    return prefix;
};`

const formula = HorizontalScanning;

interface Props {
    setDisplayCode: React.Dispatch<React.SetStateAction<boolean>>
}

const Head = ({ setDisplayCode }: Props) => (
    <Toolbar variant='dense' sx={{ display: "flex" }}>
        <IconButton color='primary'>
            <DragIndicatorIcon fontSize='medium' />
        </IconButton>

        <Stack sx={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }} spacing={0} direction="row">
            <IconButton disabled>
                <EmojiObjectsOutlinedIcon />
            </IconButton>
            <Typography>Solution (Typescript)</Typography>
        </Stack>

        <IconButton onClick={() => setDisplayCode(false)}>
            <CloseIcon fontSize='medium' color='warning' />
        </IconButton>
    </Toolbar>
);

const Body = () => {
    const { index } = useAlgoContext();
    const steps: any[] = [];
    const step = steps[index]//steps[index - 1];
    const linesToHighlight = step?.linesToHighlight || [];

    return (
        <CodeBlock
            code={formula}
            language={languages.Typescript}
            showLineNumbers={true}
            linesToHighlight={linesToHighlight}
            wrapLines={true}
        />
    );
}

const Location = styled("div")({
    position: 'fixed',
    top: '50%',
    left: "50%",
    transform: "translate(-50%,-50%)",
    zIndex: 2,
});

const Main = ({ setDisplayCode }: Props) => (
    <Location>
        <Draggable>
            <Paper elevation={8} sx={{ cursor: 'pointer', }}>
                <Stack spacing={0}>
                    <Head setDisplayCode={setDisplayCode} />
                    <Divider variant='middle' />
                    <Body />
                </Stack>
            </Paper>
        </Draggable>
    </Location >
);

export default Main;
