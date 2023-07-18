import React from 'react';
import green from '@mui/material/colors/green';
import blue from '@mui/material/colors/blue';
import grey from '@mui/material/colors/grey';
import Table from '../../dp/_components/Table';
import { Step } from './algo';
import { Point } from '../../commons/point';
import { Stack, Typography } from '@mui/material';

export const landStyle: React.CSSProperties = { backgroundColor: green[600], color: "#fff", border: "2px solid lightgrey" };
export const waterStyle: React.CSSProperties = { backgroundColor: blue[200], color: "#fff", border: "2px solid lightgrey" };
export const visitedStyle: React.CSSProperties = { backgroundColor: grey[500], color: "#fff", border: "2px solid lightgrey" };

const IslandsNumber: React.FC<{ step: Step }> = ({ step }) => {
    return (
        <div style={{ position: "fixed", top: "20%", right: "10%" }}>
            <Stack direction="column" spacing={1} sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                    variant='h5'
                    sx={{
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        border: "1px solid lightgray",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        color: "gray"
                    }}>
                    {step.numIslands}
                </Typography>
                <Typography>
                    Islands Number
                </Typography>
            </Stack>
        </div >
    );
}

const getStyle = (value: number): React.CSSProperties => {
    switch (value) {
        case 0: return waterStyle;
        case 1: return landStyle;
        default: return visitedStyle;
    }
}

const buildStyles = (grid: number[][], point: Point): React.CSSProperties[][] => {
    const x = point.row;
    const y = point.col;

    const styles: React.CSSProperties[][] = [];
    for (let row = 0; row < grid.length; row++) {
        styles.push([]);
        for (let col = 0; col < grid[row].length; col++) {
            let style: React.CSSProperties = getStyle(grid[row][col]);
            if (row === x && col === y) {
                style = { ...style };
                style.opacity = 0.4
            }
            styles[row].push(style);
        }
    }
    return styles;
}

interface Props {
    steps: Step[];
    index: number;
}

const Grid: React.FC<{ grid: number[][], current: Point }> = ({ grid, current }) => {
    const styles = buildStyles(grid, current);
    return (
        <Table table={grid} tableStyles={styles} />
    );
}

const Main = ({ index, steps }: Props) => {
    const step = steps[index];
    return (
        <>
            {step && <IslandsNumber step={step} />}
            {step && <Grid grid={step.grid} current={step.point} />}
        </>
    );
}

export default Main;
