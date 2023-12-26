import * as React from 'react';
import { styled } from '@mui/system';
import { Button, ButtonGroup, Divider, IconButton, Paper, Stack, Toolbar } from "@mui/material";
import MergeIcon from '@mui/icons-material/Merge';
import CheckIcon from '@mui/icons-material/Check';
import { useAlgoContext } from "./AlgoContext";
import { State } from "../AlgoState";
import { wait } from '../../../../data-structures/_commons/utils';
import { SimpleLink } from '../../../../data-structures/list/link.three';
import { linkColor, skinPostOrderColor } from '../styles';
import CodeBlock, { languages } from '../../../dp/_components/CodeBlock';
import Draggable from 'react-draggable';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CodeIcon from '@mui/icons-material/Code';

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

const CodeDisplay = () => {
    const { linesToHighlight } = useAlgoContext();

    return (
        <div style={{ position: 'fixed', top: 330, left: 40, zIndex: 2 }}>
            <Draggable>
                <Paper elevation={8} sx={{ cursor: 'pointer' }}>
                    <Stack spacing={0}>
                        <Toolbar variant='dense' sx={{ minHeight: 0 }}>
                            <IconButton color='info' sx={{ minHeight: 0 }}>
                                <DragIndicatorIcon />
                            </IconButton>
                        </Toolbar>
                        <Divider variant='middle' />
                        <CodeBlock
                            code={formula}
                            language={languages.Typescript}
                            showLineNumbers={true}
                            linesToHighlight={linesToHighlight}
                            wrapLines={true}
                        />
                    </Stack>
                </Paper>
            </Draggable>
        </div>
    );
}

const Position = styled("div")({
    position: "fixed",
    bottom: 200,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1
});

const Play = () => {
    const { scene, state, setState, node1, setNode1, setNode2, node2, current, setCurrent, setLinesToHighlight, animate, cancelAnimate } = useAlgoContext();

    const disabled: boolean = state !== State.Playing;

    const handleMerge = async () => {

        if (!node1 && !node2) {
            setState(State.Finished);
            return;
        }

        if (node1 && node2) {
            if (node1.data < node2.data) {
                current.next = node1;
                setNode1(node1.next);

                setLinesToHighlight([7]);
            } else {
                current.next = node2;
                setNode2(node2.next);

                setLinesToHighlight([10]);
            }
            if (current && current.next) {
                setCurrent(current.next);
            }
        } else {
            current.next = !node1 ? node2 : node1;

            setLinesToHighlight([16]);
            setState(State.Finished);
        }

        if (current && current.next) {
            if (!current.linkToNext) {
                current.linkToNext = new SimpleLink(current, current.next, scene, linkColor);
                current.linkToNext.show();
            } else {
                current.linkToNext.target = current.next;
                current.linkToNext.refresh();
            }

            current.next.nodeSkin.color = skinPostOrderColor;
        }

        if (!current.next) {
            setState(State.Finished);
        }

        try {
            animate();
            await wait(0.1);
        } catch (error) {
            console.log(error);
        } finally {
            cancelAnimate();
        }
    }

    const [displayCode, setDisplayCode] = React.useState(false);

    const handleCodeDisplayToggle = () => {
        setDisplayCode(isOpen => !isOpen);
    }

    return (
        <>
            <Position>
                <ButtonGroup size='large'>
                    <Button onClick={handleMerge} startIcon={state === State.Finished ? <CheckIcon /> : <MergeIcon />} disabled={disabled}>
                        merge
                    </Button>
                    <Button
                        onClick={handleCodeDisplayToggle}
                        endIcon={<CodeIcon />}
                        color={displayCode ? "info" : "inherit"}
                    >
                        code
                    </Button>
                </ButtonGroup>
            </Position>
            {displayCode && <CodeDisplay />}
        </>
    );
}

export default Play;
