import { styled } from '@mui/system';
import { Button, ButtonGroup, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useAlgoContext } from './AlgoContext';
import React from 'react';
import { blue, yellow } from '@mui/material/colors';
import { Step } from './algo';
import { State } from './AlgoState';

const Position = styled('div')({
    display: "flex",
    position: "fixed",
    top: "20%",
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    flexDirection: "column"
});

const DisplayStep: React.FC<{ step: Step, x: number }> = ({ step, x }) => (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell sx={{ textAlign: "center" }}>
                    Left
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                    Right
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                    Mid
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                    Square
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                    X
                </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
                <TableCell sx={{ textAlign: "center", borderBottom: "none" }}>
                    {step.left}
                </TableCell>
                <TableCell sx={{ textAlign: "center", borderBottom: "none" }}>
                    {step.right}
                </TableCell>
                <TableCell sx={{ textAlign: "center", borderBottom: "none" }}>
                    {step.mid}
                </TableCell>
                <TableCell sx={{ textAlign: "center", borderBottom: "none" }}>
                    {step.square}
                </TableCell>
                <TableCell sx={{ textAlign: "center", borderBottom: "none" }}>
                    {x}
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
);

const SquareRoot: React.FC<{ sqrt: number }> = ({ sqrt }) => (
    <div>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        Square Root
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell sx={{ textAlign: "center", borderBottom: "none" }}>
                        {sqrt}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
);

const Nums: React.FC<{ steps: Step[], index: number, x: number }> = ({ steps, index, x }) => {

    const getStyle = (i: number): React.CSSProperties => {
        const step = steps[index];
        if (!step) return {};

        if (i === step.mid) {
            return { backgroundColor: yellow[600], color: "#000" };
        }

        if (i === step.left || i === step.right) {
            return { backgroundColor: blue[500], color: "#fff" };
        }

        return {};
    }

    return (
        <ButtonGroup size='large' variant='contained' color='success'>
            {
                Array.from(Array(x + 1).keys()).map((num, i) =>
                    <Button key={i} sx={getStyle(i)}>
                        {num}
                    </Button>)
            }
        </ButtonGroup>
    );
}

const Main = () => {
    const { steps, index, x, state, sqrt } = useAlgoContext();
    const step = steps[index];

    return (
        <Position>
            {state === State.Finished && <SquareRoot sqrt={sqrt} />}
            <div>
                {step && <DisplayStep step={step} x={x} />}
            </div>
            {state !== State.Input && <Nums steps={steps} index={index} x={x} />}
        </Position>
    );
}

export default Main;
