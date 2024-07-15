import { styled } from '@mui/system';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Divider, IconButton, Paper, Stack, Toolbar, Typography } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import Draggable from 'react-draggable';
import CodeBlock, { languages } from '../../dp/_components/CodeBlock';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import { Step } from './stepsBuilder';

const getFormula = (step: Step | undefined) => {

    const resultComment = (step?.result?.data !== undefined) ? "// " + step?.result?.data : "// 0";
    const nodeComment = (step?.current?.data !== undefined) ? "// " + step?.current.data : "";
    const indexComment = (step?.index !== undefined) ? "// " + step.index : "";
    const randomComment = (step?.random !== undefined) ? "// " + step.random : "";

    return `class Solution {

    private readonly head: ListNode | null;

    constructor(head: ListNode | null) {
        this.head = head;
    }

    getRandom(): number {
        let result = 0; ${resultComment}
        let node = this.head; ${nodeComment}
        let index = 1; ${indexComment}

        while (node) {
            const random = Math.floor(Math.random() * index); 
            if (random === 0) { ${randomComment}
                result = node.val;
            }
            node = node.next;
            index++;
        }

        return result;
    }
}`;
}
const Code = () => {
    const { index, steps } = useAlgoContext();
    const step = steps[index - 1];
    const linesToHighlight: number[] = step ? step.linesToHighlight : [];

    return (
        <CodeBlock
            code={getFormula(step)}
            language={languages.Typescript}
            showLineNumbers={true}
            linesToHighlight={linesToHighlight}
            wrapLines={true}
        />
    );
}

const Head = () => {
    return (
        <Toolbar variant='dense' sx={{ display: "flex" }}>
            <IconButton disabled>
                <EmojiObjectsOutlinedIcon />
            </IconButton>
            <Stack sx={{ flexGrow: 1, alignItems: "center" }} spacing={2} direction="row">
                <Typography>Reservoir Sampling Solution</Typography>
            </Stack>
            <IconButton color='info'>
                <DragIndicatorIcon fontSize='medium' />
            </IconButton>
        </Toolbar>
    );
}

const MainPosition = styled("div")({
    position: 'fixed', bottom: 200, right: 60
});

const Main = () => (
    <MainPosition>
        <Draggable>
            <Paper elevation={8} sx={{ cursor: 'pointer' }}>
                <Stack spacing={0}>
                    <Head />
                    <Divider variant='middle' />
                    <Code />
                </Stack>
            </Paper>
        </Draggable>
    </MainPosition >
);

export default Main;
