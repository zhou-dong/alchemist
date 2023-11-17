import { styled } from '@mui/system';
import { Button, ButtonGroup, Paper, Stack, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import { State } from "./AlgoState";
import React from 'react';
import CodeBlock, { languages } from '../../../dp/_components/CodeBlock';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const formula = `function removeDuplicates(nums: number[]): number {

    let left = 0;

    for (let right = 1; right < nums.length; right++) {
        if (nums[left] !== nums[right]) {
            nums[left + 1] = nums[right];
            left++;
        }
    }

    return left + 1;
};`;

const CodeDisplay = () => {
    const { index, actions } = useAlgoContext();
    const action = actions[index];
    const linesToHighlight = (!action) ? [] : action.linesToHighlight;

    return (
        <Paper>
            <CodeBlock
                code={formula}
                language={languages.Typescript}
                showLineNumbers={true}
                linesToHighlight={linesToHighlight}
                wrapLines={true}
            />
        </Paper>
    );
}

const Dashboard = () => {
    const { actions, index } = useAlgoContext();
    const action = actions[index];

    const nums: number[] = action?.nums || [];
    const left: number = action?.left || 0;
    const right: number = action?.right || 0;

    const baseStyle: React.CSSProperties = { minWidth: 50 };
    const indexStyle: React.CSSProperties = { ...baseStyle, border: "none" };

    const getStyle = (i: number): React.CSSProperties => {
        if (left === i) {
            return { ...baseStyle, backgroundColor: "gold" };
        } else if (right === i) {
            return { ...baseStyle, backgroundColor: "green" };
        } else {
            return { ...baseStyle };
        }
    }

    const getLeftStyle = (i: number): React.CSSProperties => {
        if (i === left) {
            return { ...indexStyle, border: "none", backgroundColor: "gold" };
        } else {
            return indexStyle;
        }
    }

    const getRightStyle = (i: number): React.CSSProperties => {
        if (i === right) {
            return { ...indexStyle, backgroundColor: "green" };
        } else {
            return indexStyle;
        }
    }
    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell padding='none' sx={baseStyle}>nums</TableCell>
                    {
                        nums.map((num, i) => <TableCell key={i} padding='none' sx={getStyle(i)}>{num}</TableCell>)
                    }
                </TableRow>
                <TableRow>
                    <TableCell padding='none' sx={indexStyle}>left</TableCell>
                    {
                        nums.map((num, i) =>
                            <TableCell key={i} padding='none' sx={getLeftStyle(i)}>
                                {(i === left) ? num : ""}
                            </TableCell>
                        )
                    }
                </TableRow>
                <TableRow>
                    <TableCell padding='none' sx={indexStyle}>right</TableCell>
                    {
                        nums.map((num, i) =>
                            <TableCell key={i} padding='none' sx={getRightStyle(i)} >
                                {(i === right) ? num : ""}
                            </TableCell>
                        )
                    }
                </TableRow>
            </TableBody>
        </Table>
    );
};

const Result = () => {
    const { actions } = useAlgoContext();

    if (actions.length === 0) {
        return <></>;
    }

    const last = actions[actions.length - 1];
    const left = last.left;
    const nums = last.nums;

    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell padding='none'>result</TableCell>
                    {
                        nums.slice(0, left).map((num, i) => <TableCell key={i} padding='none'>{num}</TableCell>)
                    }
                </TableRow>
            </TableBody>
        </Table>
    );
}

const Action = () => {

    const { setIndex, index, actions } = useAlgoContext();
    const step = actions[index];
    const action = step?.action;
    const disabled = (index >= actions.length);

    type BntColor = "info" | "error";
    const [color, setColor] = React.useState<BntColor>("info");

    return (
        <ButtonGroup disabled={disabled} color={color}>
            <Button
                disabled={action !== "Start"} startIcon={<PlayCircleOutlineIcon />} onClick={() => {
                    setIndex(i => i + 1);
                }}>
                Start
            </Button>
            <Button disabled={action === "Start" || action === "Finish"} startIcon={<NextPlanIcon />} onClick={() => {
                if (action === "Next") {
                    setColor("info");
                    setIndex(i => i + 1);
                } else {
                    setColor("error");
                }
            }}>
                next
            </Button>
            <Button disabled={action === "Start" || action === "Finish"} startIcon={<ChangeCircleIcon />} onClick={() => {
                if (action === "Update") {
                    setColor("info");
                    setIndex(i => i + 1);
                } else {
                    setColor("error");
                }
            }}>
                update
            </Button>
            <Button disabled={action !== "Finish"} startIcon={<CheckCircleOutlineIcon />} onClick={() => {
                setIndex(i => i + 1);
            }}>
                finish
            </Button>
        </ButtonGroup>
    );
}

const Main = () => {
    const { actions, index } = useAlgoContext();
    const action = actions[index];

    return (
        <Stack
            sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            spacing={4}
            direction="column"
        >
            <CodeDisplay />
            {(action) ? <Dashboard /> : < Result />}
            <Action />
        </Stack>
    );
};

const Position = styled("div")({
    position: "fixed",
    top: 150,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "40%",
    zIndex: 0
});

const Play = () => {
    const { state } = useAlgoContext();

    return (
        <Position>
            {state !== State.Typing && <Main />}
        </Position>
    );
}

export default Play;
