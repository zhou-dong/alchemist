import { styled } from '@mui/system';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Divider, IconButton, Paper, Stack, Toolbar, Typography } from "@mui/material";
import Draggable from 'react-draggable';
import CodeBlock, { languages } from '../../../dp/_components/CodeBlock';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useAlgoContext } from '../AlgoContext';

const formula = `function strStr(haystack: string, needle: string): number {

    for (let i = 0; i <= haystack.length - needle.length; i++) {
        for (let j = 0; j < needle.length; j++) {
            if (haystack.charAt(i + j) !== needle.charAt(j)) {
                break;
            }
            if (j === needle.length - 1) {
                return i;
            }
        }
    }

    return -1;
};`;

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
    const step = steps[index];
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
    bottom: '10%',
    left: "50%",
    transform: "translate(-50%,0)",
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
