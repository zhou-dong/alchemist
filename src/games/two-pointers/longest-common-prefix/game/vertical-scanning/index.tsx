import CheckIcon from '@mui/icons-material/Check';
import { useAlgoContext } from '../../AlgoContext';
import MouseIcon from '@mui/icons-material/Mouse';
import { State } from '../../AlgoState';
import { StyledButton } from '../Component';
import Table from '../../../../dp/_components/Table';
import green from '@mui/material/colors/green';
import grey from '@mui/material/colors/grey';
import React from 'react';

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
}

const defaultStyle: React.CSSProperties = { borderColor: "#fff", backgroundColor: grey[400], color: "#000", };
const enabledStyle: React.CSSProperties = { borderColor: "#fff", backgroundColor: green[400], color: "#fff", };
const buildTableStyles = (table: (string | number)[][]): React.CSSProperties[][] => {
    const styles = table.map(row => row.map(_ => defaultStyle));
    for (let row = 0; row < table.length; row++) {
        styles[row][0] = defaultStyle;
    }
    for (let col = 0; col < table[0]?.length || 0; col++) {
        styles[0][col] = defaultStyle;
    }
    return styles;
}

const updateTableStyles = (original: React.CSSProperties[][], charIndex: number, stringIndex: number): React.CSSProperties[][] => {

    const styles: React.CSSProperties[][] = original.map(row => row.map(style => Object.assign({}, style)));

    for (let row = 0; row < styles.length; row++) {
        styles[row][0] = defaultStyle;
    }
    for (let col = 0; col < styles[0]?.length || 0; col++) {
        styles[0][col] = defaultStyle;
    }

    for (let col = 1; col < styles[0]?.length || 0; col++) {
        if (col <= charIndex + 1) {
            styles[0][col] = enabledStyle;
        }
    }

    for (let row = 1; row < styles.length; row++) {
        if (row === stringIndex + 1) {
            styles[row][0] = enabledStyle;
        }
    }

    styles[stringIndex + 1][charIndex + 1] = enabledStyle;

    styles[0][0] = enabledStyle;

    console.log("hello world...", styles[0][0]);

    return styles;
}

const Main = () => {

    const { state, setState, verticalScanningSteps, index, setIndex, input } = useAlgoContext();
    const table = buildTable(input);
    const [styles, setStyles] = React.useState<React.CSSProperties[][]>(() => buildTableStyles(table));

    const handleClick = () => {
        const step = verticalScanningSteps[index];
        if (!step) {
            setState(State.Finished);
            return;
        }

        const { charIndex, stringIndex } = step;

        if (charIndex !== undefined && stringIndex !== undefined) {
            setStyles(s => updateTableStyles(s, charIndex, stringIndex));
        }

        if (index === verticalScanningSteps.length - 1) {
            setState(State.Finished);
        }

        setIndex(i => i + 1);
    }

    return (
        <>
            <Table table={table} tableStyles={styles} />
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
