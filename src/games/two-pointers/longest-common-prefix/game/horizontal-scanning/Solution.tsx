import { styled } from '@mui/system';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Divider, IconButton, Paper, Stack, Toolbar, Typography } from "@mui/material";
import Draggable from 'react-draggable';
import CodeBlock, { languages } from '../../../../dp/_components/CodeBlock';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useAlgoContext } from '../../AlgoContext';
import React from 'react';

const Head: React.FC<{ setDisplayCode: React.Dispatch<React.SetStateAction<boolean>> }> = ({ setDisplayCode }) => (
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

const Body: React.FC<{ solution: string }> = ({ solution }) => {
    const { index, steps } = useAlgoContext();
    const step = steps[index];
    const linesToHighlight: number[] = [];//step?.linesToHighlight || [];

    return (
        <CodeBlock
            code={solution}
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

interface Props {
    solution: string;
    setDisplayCode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Main = ({ solution, setDisplayCode }: Props) => (
    <Location>
        <Draggable>
            <Paper elevation={8} sx={{ cursor: 'pointer', }}>
                <Stack spacing={0}>
                    <Head setDisplayCode={setDisplayCode} />
                    <Divider variant='middle' />
                    <Body solution={solution} />
                </Stack>
            </Paper>
        </Draggable>
    </Location >
);

export default Main;
