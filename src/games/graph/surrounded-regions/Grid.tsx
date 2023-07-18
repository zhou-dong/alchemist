import React from 'react';
import orange from '@mui/material/colors/orange';
import blue from '@mui/material/colors/blue';
import grey from '@mui/material/colors/grey';
import Table from '../../dp/_components/Table';
import { Step } from './algo';
import { Point } from '../../commons/point';

export const oStyle: React.CSSProperties = { backgroundColor: orange[300], color: "#000", border: "2px solid lightgrey" };
export const xStyle: React.CSSProperties = { backgroundColor: blue[200], color: "#000", border: "2px solid lightgrey" };
export const visitedStyle: React.CSSProperties = { backgroundColor: grey[500], color: "#000", border: "2px solid lightgrey" };

const getStyle = (value: string): React.CSSProperties => {
    switch (value) {
        case "O": return oStyle;
        case "X": return xStyle;
        default: return visitedStyle;
    }
}

const buildStyles = (grid: string[][], point: Point): React.CSSProperties[][] => {
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

const Grid: React.FC<{ grid: string[][], current: Point }> = ({ grid, current }) => {
    const styles = buildStyles(grid, current);
    return (
        <Table table={grid} tableStyles={styles} />
    );
}

const Main = ({ index, steps }: Props) => {
    const step = steps[index];
    return (
        <>
            {step && <Grid grid={step.board} current={step.point} />}
        </>
    );
}

export default Main;
