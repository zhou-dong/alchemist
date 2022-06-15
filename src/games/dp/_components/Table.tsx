import { Table, TableBody, TableCell, TableRow } from '@mui/material';

export interface Props {
    readonly table: Array<Array<any>>;
    readonly tableStyles: Array<Array<React.CSSProperties>>;
}

const createCell = (key: number, data: number | string, style: React.CSSProperties) => (
    <TableCell padding="none" key={key} style={style}>
        {data}
    </TableCell>
);

const createRow = (key: number, array: Array<string | number>, rowStyles: Array<React.CSSProperties>) => {
    if (array.length !== rowStyles.length) {
        throw new Error('Alchemy Display table errors: array-styles size dont match');
    }
    return (
        <TableRow key={key}>
            {array.map((data, index) => createCell(index, data, rowStyles[index]))}
        </TableRow>
    );
};

const DisplayTable = (props: Props) => {
    const { table, tableStyles } = props;
    if (table.length !== tableStyles.length) {
        throw new Error('Alchemy Display table errors: matrix-styles size dont match');
    }
    return (
        <Table>
            <TableBody>
                {table.map((row, index) => createRow(index, row, tableStyles[index]))}
            </TableBody>
        </Table>
    );
};

export default DisplayTable;
