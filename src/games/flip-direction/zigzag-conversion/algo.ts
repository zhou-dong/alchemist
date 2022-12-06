interface Result {
    maxCols: number;
    converted: string;
}

function convert(s: string, numRows: number): Result {
    if (numRows === 1) return { maxCols: s.length, converted: s };

    const rows: string[] = [];
    for (let i = 0; i < numRows; i++) {
        rows[i] = "";
    }

    let rowIndex = 0;
    let flag = -1;
    for (let i = 0; i < s.length; i++) {
        rows[rowIndex] = rows[rowIndex] + s.charAt(i);
        if (rowIndex === 0 || rowIndex === numRows - 1) {
            flag = -1 * flag;
        }
        rowIndex += flag;
    }

    const maxCols: number = rows.reduce((a, b) => (a.length > b.length) ? a : b).length;
    const converted: string = rows.reduce((a, b) => a + b);
    return { maxCols, converted }
};

export { convert };
