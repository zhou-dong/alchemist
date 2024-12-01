import CheckIcon from '@mui/icons-material/Check';
import { useAlgoContext } from '../../AlgoContext';
import MouseIcon from '@mui/icons-material/Mouse';
import { State } from '../../AlgoState';
import { StyledButton } from '../Component';
import blue from '@mui/material/colors/blue';
import grey from '@mui/material/colors/grey';
import React from 'react';
import { TextField } from '@mui/material';
import Table from '../../../../dp/_components/Table';
import { Step } from './algo';

const indexStyle: React.CSSProperties = {
    borderColor: "#fff",
    backgroundColor: "#f1f1f1",
    color: grey[600],
    fontWeight: 600,
};

const defaultStyle: React.CSSProperties = {
    borderColor: "#fff",
    backgroundColor: blue[200],
    color: "#fff",
    fontWeight: 500,
};

const enabledStyle: React.CSSProperties = {
    borderColor: "#fff",
    backgroundColor: "#4CAF50",
    color: "#fff",
    fontWeight: 500,
};

const buildTable = (input: string[]): (string | number)[][] => {
    const maxLength: number = input.reduce((accumulator, current) => Math.max(accumulator, current.length), 0);

    const rows = input.length + 1;
    const cols = maxLength + 1;

    const table: (string | number)[][] = new Array(rows).fill("").map(_ => new Array(cols).fill(""));

    for (let row = 1; row < rows; row++) {
        table[row][0] = row - 1;
    }

    for (let col = 1; col < cols; col++) {
        table[0][col] = col - 1;
    }

    for (let row = 1; row < rows; row++) {
        for (let col = 1; col < cols; col++) {
            table[row][col] = input[row - 1][col - 1] || "";
        }
    }

    return table;
};

const buildTableStyles = (table: (string | number)[][]): React.CSSProperties[][] => {
    const styles = table.map(row => row.map(_ => defaultStyle));
    for (let row = 0; row < table.length; row++) {
        styles[row][0] = indexStyle;
    }
    for (let col = 0; col < table[0]?.length || 0; col++) {
        styles[0][col] = indexStyle;
    }
    return styles;
};

const updateTableStyles = (original: React.CSSProperties[][], input: string[], { action, }: Step,): React.CSSProperties[][] => {
    const styles: React.CSSProperties[][] = original.map(row => row.map(style => Object.assign({}, style)));

    for (let row = 0; row < styles.length; row++) {
        styles[row][0] = indexStyle;
    }

    for (let col = 0; col < styles[0]?.length || 0; col++) {
        styles[0][col] = indexStyle;
    }

    return styles;
};

const Main = () => {

    const { state, setState, horizontalScanningSteps, index, setIndex, input } = useAlgoContext();

    const table = buildTable(input);

    const [styles, setStyles] = React.useState<React.CSSProperties[][]>(() => buildTableStyles(table));
    const [prefix, setPrefix] = React.useState<string>();

    const handleClick = () => {
        const step = horizontalScanningSteps[index];
        if (!step) {
            setState(State.Finished);
            return;
        }

        setStyles(s => updateTableStyles(s, input, step));
        setPrefix(step.prefix);

        if (index === horizontalScanningSteps.length - 1) {
            setState(State.Finished);
        }

        setIndex(i => i + 1);
    }

    const DisplayPrefix = () => (
        <div style={{ marginBottom: "10px" }}>
            <TextField
                size='small'
                disabled
                label="prefix"
                value={prefix || " "}
            />
        </div>
    );

    return (
        <>
            <div style={{ width: "100%", }}>
                {prefix !== undefined && DisplayPrefix()}
                <Table table={table} tableStyles={styles} />
            </div>
            <StyledButton
                disabled={state !== State.Playing}
                onClick={handleClick}
                size='large'
                color='primary'
            >
                {state === State.Finished ? <CheckIcon sx={{ color: 'green' }} /> : <MouseIcon />}
            </StyledButton>
        </>
    );
}

export default Main;
