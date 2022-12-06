export const title = "Zigzag Conversion";

export const formula = `function convert(s: string, numRows: number): string {
    if (numRows === 1) return s;

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

    return rows.reduce((a, b) => a + b);
};`;

export const description = `
#### Description

The string "ALCHEMIST" is written in a ***zigzag*** pattern on a given number of rows like this:

A &nbsp;&nbsp;&nbsp; E &nbsp;&nbsp;&nbsp; T

L H M S

C &nbsp;&nbsp;&nbsp; I

And then read line by line: "AETLHMSCI".
`;

export const solution = ``;

export const usecases = '';

export const examples = `
#### Example 1:

- Input: s = "ALCHEMIST", numRows = 3
- Output: "AETLHMSCI"

#### Example 2:

- Input: s = "ALCHEMIST", numRows = 2
- Output: "ACEITLHMS"
`;
