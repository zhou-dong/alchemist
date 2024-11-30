import CheckIcon from '@mui/icons-material/Check';
import { useAlgoContext } from '../../AlgoContext';
import MouseIcon from '@mui/icons-material/Mouse';
import { State } from '../../AlgoState';
import { StyledButton } from '../Component';
import Table from '../../../../dp/_components/Table';
import green from '@mui/material/colors/green';
import grey from '@mui/material/colors/grey';

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

const buildTableStyles = (table: (string | number)[][]): React.CSSProperties[][] => {
    const base: React.CSSProperties = { backgroundColor: grey[200], color: "#000",  };
    const styles = table.map(row => row.map(col => base));

    for (let row = 0; row < table.length; row++) {
        styles[row][0] = { backgroundColor: green[600], color: "#fff" };
    }

    for (let col = 0; col < table[0]?.length || 0; col++) {
        styles[0][col] = { backgroundColor: green[600], color: "#fff" };
    }

    return styles;
}

const Main = () => {

    const { state, setState, verticalScanningSteps, index, setIndex } = useAlgoContext();

    const step = verticalScanningSteps[index];
    const table = buildTable(step?.input || []);
    const styles = buildTableStyles(table);

    const handleClick = () => {
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
