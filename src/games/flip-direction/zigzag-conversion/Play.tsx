import React from 'react';
import { Button, Paper, Stack, styled, Table, TableBody, TableCell, TableRow, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useAlgoContext } from './AlgoContext';
import { State } from './AlgoState';
import Title from './Title';
import LightTooltip from '../../../commons/LightTooltip';
import CodeBlock, { languages } from '../../dp/_components/CodeBlock';

const DisplayInput = () => {
    const { inputString, index } = useAlgoContext();
    return (
        <ToggleButtonGroup size='large' color='primary'>
            {
                inputString.split("").map((value, i) =>
                    <ToggleButton key={i} value={value} selected={i === index} sx={{ height: "45px", width: "45px", fontWeight: "500" }}>
                        {value}
                    </ToggleButton>
                )
            }
        </ToggleButtonGroup>
    )
}

const Rows = () => {
    const { rows } = useAlgoContext();
    return (
        <Table>
            <TableBody>
                {
                    rows.map((row, i) =>
                        <TableRow key={i}>
                            {
                                row.map((cell, j) => <TableCell key={j} padding="none">
                                    {(cell === -1) ? "" : cell}
                                </TableCell>)
                            }
                        </TableRow>
                    )
                }
            </TableBody>
        </Table>
    )
}

const DisplayBox: React.FC<{ name: string, value: string | number }> = ({ name, value }) => (
    <Paper variant='outlined' sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "5px 12px", borderRadius: "30px" }}>
        <Typography display="flex">
            {name}:&nbsp;
        </Typography>
        <Typography color="primary" display="flex">
            {value}
        </Typography>
    </Paper>
);

const TipedDisplayBox: React.FC<{ name: string, value: string | number, tip: string }> = ({ name, value, tip }) => (
    <LightTooltip title={<CodeBlock code={tip} language={languages.Typescript} />} placement="bottom" >
        <Paper variant='outlined' sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "5px 12px", borderRadius: "30px" }}>
            <Typography display="flex">
                {name}:&nbsp;
            </Typography>
            <Typography color="primary" display="flex">
                {value}
            </Typography>
        </Paper>
    </LightTooltip>
);

const DisplayConverted = () => {
    const { converted, state } = useAlgoContext();
    return (
        <>
            {state === State.Finished && <DisplayBox name="converted" value={converted} />}
        </>
    );
}

const Next = () => {

    const { index, setIndex, rows, row, setRow, inputString, flag, setFlag, state, setState } = useAlgoContext();

    const handleOnClick = () => {
        if (state === State.Finished) {
            return;
        }

        const character: string = inputString.charAt(index);
        for (let col = 0; col < rows[row].length; col++) {
            const cell = rows[row][col];
            if (cell === -1) {
                rows[row][col] = character;
                break;
            }
        }

        const newFlag = (row === 0 || row === rows.length - 1) ? flag * -1 : flag;
        const newRow = row + newFlag;

        setFlag(newFlag);
        setRow(newRow);
        if (index === inputString.length - 1) {
            setState(State.Finished);
            return;
        }
        setIndex(index + 1);
    }

    return (
        <Button variant='contained' sx={{ color: "#FFF" }} onClick={handleOnClick} disabled={state !== State.Playing}>
            Next
        </Button>
    )
}

const InlineCenter = styled("div")(() => ({
    textAlign: "center", margin: "auto"
}))

const flagExpression = `if (currentRow === 0 || currentRow === numRows - 1) {
    flag = -1 * flag; // flip direction
}`

const Play = () => {
    const { index, flag, row, numRows } = useAlgoContext();

    return (
        <>
            <div style={{ marginTop: 20 }} />
            <InlineCenter>
                <DisplayInput />
            </InlineCenter>

            <div style={{ marginTop: 20 }} />
            <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
                <DisplayBox name="num rows" value={numRows} />
                <DisplayConverted />
            </Stack>

            <div style={{ marginTop: 20 }} />
            <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
                <DisplayBox name="index" value={index} />
                <TipedDisplayBox name="current row" value={row} tip="currentRow += flag;" />
                <TipedDisplayBox name="flag" value={flag} tip={flagExpression} />
            </Stack>

            <div style={{ marginTop: 20 }} />
            <InlineCenter>
                <Rows />
            </InlineCenter>

            <div style={{ marginTop: 30 }} />
            <InlineCenter>
                <Next />
            </InlineCenter>
        </>
    )
}

const Main = () => {
    const { state } = useAlgoContext();
    return (
        <>
            <div style={{ marginTop: 60 }} />
            <Title />
            {(state === State.Playing || state === State.Finished) && <Play />}
        </>
    )
}

export default Main;
