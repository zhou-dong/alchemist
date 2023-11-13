import { styled } from '@mui/system';
import { IconButton, Paper, Stack, Table, TableBody, TableCell, TableRow } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAlgoContext } from "./AlgoContext";
import { State } from "./AlgoState";
import DoneIcon from '@mui/icons-material/Done';
import React from 'react';
import CodeBlock, { languages } from '../../../dp/_components/CodeBlock';

const formula = `function removeElement(nums: number[], val: number): number {

    let left = 0;

    for (let right = 0; right < nums.length; right++) {
        if (nums[right] !== val) {
            nums[left] = nums[right];
            left++;
        }
    }

    return left;
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
    const isUpdate: boolean = action?.isUpdate || false;
    const val: string = (action) ? action.val + "" : ""

    const baseStyle: React.CSSProperties = { paddingLeft: "15px", paddingRight: "15px" };

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
            return { ...baseStyle, backgroundColor: "gold" };
        } else {
            return baseStyle;
        }
    }

    const getRightStyle = (i: number): React.CSSProperties => {
        if (i === right) {
            return { ...baseStyle, backgroundColor: "green" };
        } else {
            return baseStyle;
        }
    }
    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell padding='none' sx={baseStyle}>val</TableCell>
                    <TableCell padding='none' colSpan={nums.length} >{val}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell padding='none' sx={baseStyle}>nums</TableCell>
                    {
                        nums.map((num, i) => <TableCell key={i} padding='none' sx={getStyle(i)}>{num}</TableCell>)
                    }
                </TableRow>
                <TableRow>
                    <TableCell padding='none' sx={baseStyle}>left</TableCell>
                    {
                        nums.map((num, i) =>
                            <TableCell key={i} padding='none' sx={getLeftStyle(i)}>
                                {(i === left) ? num : ""}
                            </TableCell>
                        )
                    }
                </TableRow>
                <TableRow>
                    <TableCell padding='none' sx={baseStyle}>right</TableCell>
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

    const disabled = (index >= actions.length);

    const handleOnClick = () => {
        setIndex(i => i + 1);
    }

    return (
        <IconButton size="medium" sx={{ border: "1px solid gray" }} color="success" disabled={disabled} onClick={handleOnClick}>
            {disabled ? <DoneIcon color='success' /> : <ArrowForwardIcon />}
        </IconButton>
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
    top: 200,
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
