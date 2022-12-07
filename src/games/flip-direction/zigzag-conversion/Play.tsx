import React from 'react';
import { Button, Chip, Divider, Grid, Paper, Stack, styled, Table, TableBody, TableCell, TableRow, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useAlgoContext } from './AlgoContext';
import { State } from './AlgoState';
import Title from './Title';
import CodeBlock, { languages } from '../../dp/_components/CodeBlock';
import { formula } from "./contents";
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

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

        const newFlag = (row === 0 || row === rows.length - 1) ? flag * -1 : flag;
        const newRow = row + newFlag;

        const character: string = inputString.charAt(index);
        for (let col = 0; col < rows[row].length; col++) {
            const cell = rows[newRow][col];
            if (cell === -1) {
                rows[newRow][col] = character;
                break;
            }
        }

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
    textAlign: "center"
}))

const flagExpression = `if (row === 0 || row === numRows - 1) {
    flag = -1 * flag;
}`

const Play = () => {
    const { flag, row, numRows } = useAlgoContext();

    const [linesToHighlight, setLinesToHighlight] = React.useState<number[]>([16]);

    React.useEffect(() => {
        if (row === 0 || row === numRows - 1) {
            setLinesToHighlight([14, 16]);
        } else {
            setLinesToHighlight([16]);
        }
    }, [row, numRows])

    return (
        <Grid container sx={{ marginTop: "40px" }}>
            <Grid item xs={12} md={2} ></Grid>
            <Grid item xs={12} md={4}>
                <Stack sx={{ justifyContent: "center", alignItems: "center", paddingTop: "2px" }}>
                    <Chip avatar={<TipsAndUpdatesOutlinedIcon />} label="Flip Direction" variant='outlined' size='medium' />
                    <CodeBlock
                        code={formula}
                        language={languages.Typescript}
                        showLineNumbers={true}
                        linesToHighlight={linesToHighlight}
                        wrapLines={true}
                    />
                </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
                <Stack>
                    <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
                        <DisplayBox name="num rows" value={numRows} />
                        <DisplayConverted />
                    </Stack>

                    <div style={{ marginTop: 20 }} />
                    <InlineCenter>
                        <DisplayInput />
                    </InlineCenter>


                    <div style={{ marginTop: 20 }} />
                    <InlineCenter>
                        <Rows />
                    </InlineCenter>

                    <div style={{ marginTop: 20 }} />
                    <Stack direction="column" spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
                        <Paper variant='outlined'>
                            <Stack direction="row" sx={{ alignItems: "center" }}>
                                <div style={{ margin: "0 8px" }}>
                                    <DisplayBox name="flag" value={flag} />
                                </div>
                                <Divider sx={{ height: 46, m: 0.5 }} orientation="vertical" />
                                <CodeBlock
                                    code={flagExpression}
                                    language={languages.Typescript}
                                />
                            </Stack>
                        </Paper>

                        <Paper variant='outlined'>
                            <Stack direction="row" sx={{ alignItems: "center" }}>
                                <div style={{ margin: "0 8px" }}>
                                    <DisplayBox name="row" value={row} />
                                </div>
                                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                <CodeBlock
                                    code={"row += flag;"}
                                    language={languages.Typescript}
                                />
                            </Stack>
                        </Paper>
                    </Stack>

                    <div style={{ marginTop: 30 }} />
                    <InlineCenter>
                        <Next />
                    </InlineCenter>
                </Stack>

            </Grid>

            <Grid item xs={12} md={2} ></Grid>
        </Grid>
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
