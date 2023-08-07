import { styled } from '@mui/system';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useAlgoContext } from './AlgoContext';
import React from 'react';
import { blue, green, yellow } from '@mui/material/colors';
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

const DisplayStep: React.FC<{ step: Step, target: number }> = ({ step, target }) => (
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
                    Target
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
                    {target}
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
);

const SquareRoot: React.FC<{ index: number, target: number }> = ({ index, target }) => (
    <div>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        Target
                    </TableCell>
                    <TableCell>
                        Index
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell sx={{ textAlign: "center", borderBottom: "none" }}>
                        {target}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", borderBottom: "none" }}>
                        {index}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
);

const Nums: React.FC<{ nums: number[], steps: Step[], index: number }> = ({ nums, steps, index }) => {

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
        const step = steps[index];
        if (!step) return baseNumStyle;

        if (i === step.mid) {
            return { ...baseNumStyle, backgroundColor: yellow[600], color: "#000" };
        }
        return baseNumStyle;
    }

    const getIndexStyle = (i: number): React.CSSProperties => {
        const step = steps[index];
        if (!step) return baseIndexStyle;

        if (i === step.mid) {
            return { ...baseIndexStyle, borderBottom: `2px solid ${yellow[900]}` };
        }
        if (i === step.left || i === step.right) {
            return { ...baseIndexStyle, borderBottom: `2px solid ${blue[500]}` };
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
                                <TableCell key={i} sx={getNumStyle(i)} padding='none'>
                                    <Typography variant='h5'>
                                        {num}
                                    </Typography>
                                </TableCell>
                            )
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        {
                            nums.map((_, i) =>
                                <TableCell key={i} sx={getIndexStyle(i)} padding='none'>
                                    <Typography>
                                        {i}
                                    </Typography>
                                </TableCell>
                            )
                        }
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}

const Main = () => {
    const { steps, index, nums, state, target } = useAlgoContext();
    const step = steps[index];

    const targetIndex = steps[steps.length - 1]?.left || 0;

    return (
        <Position>
            {state === State.Finished && <SquareRoot target={target} index={targetIndex} />}
            <div>
                {step && <DisplayStep step={step} target={target} />}
            </div>
            {state !== State.Input && <Nums steps={steps} index={index} nums={nums} />}
        </Position>
    );
}

export default Main;
