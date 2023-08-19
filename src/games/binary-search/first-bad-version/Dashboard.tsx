import { styled } from '@mui/system';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useAlgoContext } from './AlgoContext';
import React from 'react';
import { blue, green, yellow, red } from '@mui/material/colors';
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

const DisplayStep: React.FC<{ step: Step }> = ({ step }) => (
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
            </TableRow>
        </TableBody>
    </Table>
);

const Bad: React.FC<{ bad: number }> = ({ bad }) => (
    <div>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        Bad
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell sx={{ textAlign: "center", borderBottom: "none" }}>
                        {bad}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
);

const Nums: React.FC<{ steps: Step[], index: number, n: number, bad: number }> = ({ steps, index, n, bad }) => {

    const nums = Array.from(Array(n).keys()).map(num => num + 1);

    const baseNumStyle: React.CSSProperties = {
        textAlign: "center",
        width: "55px",
        height: "45px",
        border: "1px solid #fff",
        color: "#fff",
        backgroundColor: green[500]
    };

    const baseIndexStyle: React.CSSProperties = {
        border: "1px solid #fff",
        textAlign: "center",
        borderBottom: "none",
    };

    const getNumStyle = (i: number): React.CSSProperties => {
        if (i < bad) {
            return baseNumStyle;
        } else {
            return { ...baseNumStyle, backgroundColor: red[500] };
        }
    }

    const getIndexStyle = (i: number): React.CSSProperties => {
        const step = steps[index];
        if (!step) return baseIndexStyle;

        if (i === step.mid) {
            return { ...baseIndexStyle, borderBottom: `5px solid ${yellow[600]}` };
        }
        if (i === step.left || i === step.right) {
            return { ...baseIndexStyle, borderBottom: `5px solid ${blue[500]}` };
        }
        return baseIndexStyle;
    }

    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            nums.map((num, i) =>
                                <TableCell key={i} sx={getNumStyle(i + 1)} padding='none'>
                                    <Typography variant='h5'>
                                        {num}
                                    </Typography>
                                </TableCell>
                            )
                        }
                    </TableRow>
                    <TableRow>
                        {
                            nums.map((_, i) => <TableCell key={i} sx={getIndexStyle(i + 1)} padding='none' />)
                        }
                    </TableRow>
                </TableHead>
            </Table>
        </div>
    );
}

const Main = () => {
    const { steps, index, state, n, bad } = useAlgoContext();
    const step = steps[index];

    return (
        <Position>
            {state === State.Finished && <Bad bad={bad || 0} />}
            <div>
                {step && <DisplayStep step={step} />}
            </div>
            {state !== State.Input && <Nums steps={steps} index={index} n={n || 0} bad={bad || 0} />}
        </Position>
    );
}

export default Main;
