import { styled } from '@mui/system';
import { Divider, IconButton, Paper, Stack, Toolbar, Typography } from "@mui/material";
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import { useAlgoContext } from "./AlgoContext";
import CodeBlock, { languages } from '../../../dp/_components/CodeBlock';
import Draggable from 'react-draggable';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

const formula = `function mergeTwoLists(list1?: ListNode, list2: ListNode): ListNode | undefined {
    const dummy = new ListNode();
    let current = dummy;

    while (list1 !== null && list2 !== null) {
        if (list1.val < list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }

    current.next = list1 === null ? list2 : list1;
    return dummy.next;
};`;

const MainPosition = styled("div")({
    position: 'fixed', bottom: 200, right: 60, minWidth: 1000
});

const Head = () => (
    <Toolbar variant='dense' sx={{ display: "flex" }}>
        <IconButton disabled>
            <VerticalAlignBottomIcon />
        </IconButton>
        <div style={{ flexGrow: 1 }}>
            <Typography>
                Iterative Solution
            </Typography>
        </div>
        <IconButton color='info'>
            <DragIndicatorIcon />
        </IconButton>
    </Toolbar>
);

const Body = () => {
    const { linesToHighlight } = useAlgoContext();
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

const Main = () => (
    <MainPosition>
        <Draggable>
            <Paper elevation={8} sx={{ cursor: 'pointer' }}>
                <Stack spacing={0}>
                    <Head />
                    <Divider variant='middle' />
                    <Body />
                </Stack>
            </Paper>
        </Draggable>
    </MainPosition>
);

export default Main;
