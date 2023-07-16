import React from 'react';
import green from '@mui/material/colors/green';
import blue from '@mui/material/colors/blue';
import grey from '@mui/material/colors/grey';
import Table from '../../dp/_components/Table';
import { Step } from './algo';
import { Point } from '../../commons/point';

const landStyle: React.CSSProperties = { backgroundColor: green[500], color: "#fff", border: "2px solid lightgrey" };
const waterStyle: React.CSSProperties = { backgroundColor: blue[400], color: "#000", border: "2px solid lightgrey" };
const visitedStyle: React.CSSProperties = { backgroundColor: grey[400], color: "#000", border: "2px solid lightgrey" };

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
                style.border = "2px solid gold";
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
            {step && <Grid grid={step.grid} current={step.point} />}
        </>
    );
}

export default Main;